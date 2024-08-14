"""LLMGatewayクラスは、言語モデルとの対話を管理するためのクラスです。

モデルの種類やモードに応じて、チャットや埋め込みなどの機能を提供します。
"""

from gateway.const.rag_template import rag_template_raw
from infra.llm_factory import EmbeddingFactory, LLMFactory
from infra.vectorstore import VectorStoreFactory
from langchain_core.output_parsers import PydanticOutputParser, StrOutputParser
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain_core.runnables import RunnablePassthrough
from pydantic import BaseModel


class LLMGateway:
    def __init__(
        self,
        mode: str = "ollama",
        model: str = "llama3:8b",
        table_name: str | None = None,
    ) -> None:
        """Initializes the LLMGateway."""
        self.mode = mode
        self.model = model
        self.chat = LLMFactory.get_chat(mode, model)
        self.llm = LLMFactory.get_llm(mode, model)
        self.embedding = EmbeddingFactory.get_embedding(mode, model)
        if table_name is None:
            return
        self.vectorstore = VectorStoreFactory.get_vectorstore(
            self.embedding,
            table_name,
        )

    def generate_text(self, prompt: str, system_message: str) -> str:
        """Generates a response to the prompt."""
        message_prompt = ChatPromptTemplate(
            messages=[
                SystemMessagePromptTemplate.from_template(system_message),
                HumanMessagePromptTemplate.from_template(
                    "ユーザからの質問に回答して下さい。回答は日本語で。\n{format_instructions}\n{query}\n",
                ),
            ],
            partial_variables={"format_instructions": StrOutputParser()},
        )

        chain = message_prompt | self.chat | StrOutputParser()
        return chain.invoke(prompt)

    def generate_model(
        self,
        prompt: str,
        system_message: str,
        pydantic_model: BaseModel,
    ) -> BaseModel:
        """Generates a response to the prompt."""
        parser = PydanticOutputParser(
            pydantic_object=pydantic_model,
        )
        message_prompt = ChatPromptTemplate(
            messages=[
                SystemMessagePromptTemplate.from_template(system_message),
                HumanMessagePromptTemplate.from_template(
                    "{query}\n\nユーザからの質問に回答して下さい。回答は日本語で。\n{format_instructions}\n",
                ),
            ],
            partial_variables={
                "format_instructions": parser.get_format_instructions(),
            },
        )
        chain = {"query": RunnablePassthrough()} | message_prompt | self.chat | parser
        return chain.invoke(prompt)

    def embed_documents(self, documents: list[str]) -> list[list[float]]:
        """Embeds a list of documents."""
        if self.embedding is None:
            error_message = f"{self.mode} does not support document embedding."
            raise ValueError(error_message)
        return self.embedding.embed_documents(documents)

    def embed_query(self, query: str) -> list[float]:
        """Embeds a query."""
        if self.embedding is None:
            error_message = f"{self.mode} does not support document embedding."
            raise ValueError(error_message)
        return self.embedding.embed_query(query)

    def similarity_search(self, query: str, k: int = 4) -> list[str]:
        """Performs a similarity search using the vectorstore."""
        results = self.vectorstore.similarity_search(query, k=k)
        return [doc.page_content for doc in results]

    def add_texts(
        self,
        texts: list[str],
        ids: list[str] | None = None,
        auth_ids: list[str] | None = None,
    ) -> list[str]:
        """Adds texts to the vectorstore."""
        metadatas = (
            None if auth_ids is None else [{"auth_id": auth_id} for auth_id in auth_ids]
        )
        return self.vectorstore.add_texts(texts=texts, ids=ids, metadatas=metadatas)

    def add_text(
        self,
        text: str,
        id: str | None = None,
        auth_id: str | None = None,
    ) -> list[str]:
        """Adds texts to the vectorstore."""
        return self.vectorstore.add_texts(
            texts=[text],
            ids=[id],
            metadatas=[{"auth_id": auth_id}],
        )

    def _format_docs(self, docs: list) -> str:
        """Formats the documents."""
        return "\n\n".join(doc.page_content for doc in docs)

    def generate_text_from_rag(self, prompt: str) -> str:
        """Generates a response from the LLM model."""
        retriever = self.vectorstore.as_retriever()
        rag_prompt = ChatPromptTemplate(
            messages=[
                HumanMessagePromptTemplate.from_template(rag_template_raw),
            ],
        )
        rag_chain = (
            {
                "context": retriever | self._format_docs,
                "question": RunnablePassthrough(),
            }
            | rag_prompt
            | self.chat
            | StrOutputParser()
        )
        return rag_chain.invoke(prompt)

    def generate_model_from_rag(
        self,
        prompt: str,
        pydantic_model: BaseModel,
    ) -> BaseModel:
        """Generates a response from the LLM model."""
        retriever = self.vectorstore.as_retriever()
        parser = PydanticOutputParser(
            pydantic_object=pydantic_model,
        )
        rag_prompt = ChatPromptTemplate(
            messages=[
                HumanMessagePromptTemplate.from_template(
                    rag_template_raw + "\n{format_instructions}\n",
                ),
            ],
            partial_variables={
                "format_instructions": parser.get_format_instructions(),
            },
        )
        rag_chain = (
            {
                "context": retriever | self._format_docs,
                "question": RunnablePassthrough(),
            }
            | rag_prompt
            | self.chat
            | parser
        )
        return rag_chain.invoke(prompt)


if __name__ == "__main__":
    mode = "ollama"
    model = "llama3:8b"
    table_name = "embeddings"

    gateway = LLMGateway(mode=mode, model=model, table_name=table_name)

    # テストコード
    texts = ["サンプルテキスト6666", "サンプルテキスト7777", "サンプルテキスト8888"]
    ids = [
        "ca3162eb-0f24-4e7a-b683-f917e6e3ad34",
        "59196260-c101-4bb4-81c3-7aeef285ebd5",
        "c1fa566f-49f2-45a6-8c19-b12964e1de09",
    ]
    added_ids = gateway.add_texts(texts, ids=ids)
    print(f"Vectorデータを追加しました: {added_ids}")

    results = gateway.similarity_search("サンプルテキスト")
    print(f"類似度検索の結果: {results}")

    prompt = "こんにちはお元気ですか？"
    response = gateway.generate_text(prompt, "AIの返答")
    print(response)

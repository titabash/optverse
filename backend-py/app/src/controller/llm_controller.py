import strawberry
from domain.entity.chat_response import ChatResponse
from usecase.llm_chat_usecase import LLMChatUsecase


@strawberry.type
class LLMMutation:
    @strawberry.mutation
    def generate_reply(self, prompt: str) -> ChatResponse:
        llm_usecase = LLMChatUsecase()
        return llm_usecase.execute(prompt)


@strawberry.type
class LLMQuery:
    @strawberry.field
    def hello(self) -> str:
        return "Hello World"

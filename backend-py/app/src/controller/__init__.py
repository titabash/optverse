import strawberry
from controller.llm_controller import LLMMutation, LLMQuery
from strawberry.fastapi import GraphQLRouter

llm_scheme = strawberry.Schema(query=LLMQuery, mutation=LLMMutation)
llm_graphql = GraphQLRouter(llm_scheme)

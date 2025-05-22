"""
aqui construyo el agente LangChain con: Tool vector_db_search y Tool fx_rate
"""
from langchain.agents import AgentExecutor, Tool, AgentType, initialize_agent
from langchain.schema import SystemMessage
from langchain_community.chat_models import ChatOpenAI
from langchain_community.tools import StructuredTool

from ..services.retriever import get_vectorstore
from ..services.currency import eur_to_usd
from ..core.config import get_settings

settings = get_settings()


def build_agent() -> AgentExecutor:
    vstore = get_vectorstore()

    vector_search_tool = Tool(
        name="vector_db_search",
        description="Busca información financiera interna en los documentos del banco.",
        func=lambda q: vstore.similarity_search(q, k=4),
    )

    fx_tool = StructuredTool.from_function(
        name="fx_rate_eur_usd",
        description="Devuelve la tasa de cambio EUR→USD actual.",
        func=lambda _: eur_to_usd(),
    )

    llm = ChatOpenAI(
        temperature=0,
        model_name="gpt-3.5-turbo",
        openai_api_key=settings.openai_api_key,
    )

    system_msg = SystemMessage(
        content=(
            "Eres un asistente financiero bancario. "
            "Responde en español y cita la fuente documental si la respuesta proviene del PDF."
        )
    )

    return initialize_agent(
        tools=[vector_search_tool, fx_tool],
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        verbose=False,
        agent_kwargs={"system_message": system_msg},
    )

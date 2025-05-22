"""
aqui construyo el agente LangChain con: Tool vector_db_search y Tool fx_rate
"""
from langchain.agents import AgentExecutor, Tool, AgentType, initialize_agent
from langchain.schema import SystemMessage
from langchain_openai import ChatOpenAI
from langchain.tools import StructuredTool

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
    eur_to_usd,
    name="eur_to_usd",
    description="Obtiene la cotización actual EUR a USD."
    )   

    llm = ChatOpenAI(
        temperature=0.1,
        model="gpt-4o",
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

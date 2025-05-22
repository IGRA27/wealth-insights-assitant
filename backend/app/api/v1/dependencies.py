from functools import lru_cache
from app.agents.factory import build_agent

@lru_cache(maxsize=1)
def get_agent():
    """Dependency injection para reutilizar una sola instancia, devuelve unica isntancia del agente para toda la app."""
    return build_agent()

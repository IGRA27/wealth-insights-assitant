from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_query_mock(monkeypatch):
    #parcheo build_agent para evitar FAISS / OpenAI
    from app.api.v1 import dependencies

    class DummyAgent:
        async def arun(self, *_):
            return "respuesta simulada"

    #parcheo build_agent
    monkeypatch.setattr(dependencies, "build_agent", lambda: DummyAgent())

    #vacio la caché para que get_agent vuelva a ejecutarse
    dependencies.get_agent.cache_clear()

    resp = client.post("/api/v1/query", json={"question": "ping"})
    assert resp.status_code == 200
    assert resp.json()["answer"] == "respuesta simulada"

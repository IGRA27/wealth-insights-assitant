from app.services.currency import eur_to_usd


def test_fx_service(monkeypatch):
    def fake_get(*_args, **_kwargs):
        class R:  
            def raise_for_status(self): ...

            def json(self):
                return {"rates": {"USD": 1.2345}}

        return R()

    monkeypatch.setattr("app.services.currency.httpx.Client.get", fake_get)
    assert eur_to_usd().startswith("1 EUR = 1.2345")

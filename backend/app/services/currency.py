"""
Servicio de tipos de cambio EUR a USD
"""
import httpx

from ..core.config import get_settings
from ..core.logger import logger

settings = get_settings()


def eur_to_usd() -> str:
    #params = {"base": "EUR", "symbols": "USD"}
    with httpx.Client(base_url=settings.fx_api_base, timeout=10) as client:
        r = client.get(params={"base": "EUR", "symbols": "USD"})
        r.raise_for_status()
        rate = r.json()["rates"]["USD"]
    return f"1 EUR = {rate:.4f} USD"

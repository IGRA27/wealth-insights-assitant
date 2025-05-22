"""
Servicio de tipos de cambio EUR a USD
"""
import httpx

from ..core.config import get_settings
from ..core.logger import logger

settings = get_settings()


def eur_to_usd() -> str:
    params = {"base": "EUR", "symbols": "USD"}
    with httpx.Client(timeout=10) as client:
        r = client.get(settings.fx_api_base, params=params)
        r.raise_for_status()
        rate = r.json()["rates"]["USD"]
    logger.info(f"FX rate={rate}")
    return f"1 EUR = {rate:.4f} USD"

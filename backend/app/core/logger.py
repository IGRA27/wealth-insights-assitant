from loguru import logger
import sys

#Configuración simple pero suficiente
logger.remove()
logger.add(
    sys.stdout,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
           "<level>{level: <8}</level> | "
           "{message}",
    level="INFO",
)

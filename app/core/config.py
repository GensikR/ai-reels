#from pydantic import BaseSettings, Field
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    OPENAI_API_KEY: str = Field(..., description="API key for OpenAI")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    GOOGLE_SERVICE_ACCOUNT_PATH: str = Field(..., description="Path to the Google service account JSON")
    OPENAI_API_KEY: str = Field(..., description="API key for OpenAI")
    ELEVENLABS_API_KEY: str = Field(..., description="ElevenLabs API key")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

#from pydantic import BaseSettings, Field
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    OPENAI_API_KEY: str = Field(..., description="API key for OpenAI")
    ELEVENLABS_API_KEY: str = Field(..., description="ElevenLabs api key")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

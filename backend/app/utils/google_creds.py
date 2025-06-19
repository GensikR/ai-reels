from google.cloud import texttospeech
from google.oauth2 import service_account
from app.core.config import settings  # Load from your existing Pydantic Settings
import os

def get_google_tts_client() -> texttospeech.TextToSpeechClient:
    service_account_path = settings.GOOGLE_SERVICE_ACCOUNT_PATH

    if not os.path.exists(service_account_path):
        raise FileNotFoundError(f"Service account file not found at: {service_account_path}")

    credentials = service_account.Credentials.from_service_account_file(service_account_path)
    return texttospeech.TextToSpeechClient(credentials=credentials)

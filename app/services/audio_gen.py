# app/services/audio_gen.py

import os
import uuid
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs import save

# Load .env variables
load_dotenv()

# Initialize client
elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY")
)

def generate_audio(text: str, voice_id: str = "JBFqnCBsd6RMkjVDRZzb") -> str:
    audio = elevenlabs.text_to_speech.convert(
        text=text,
        voice_id=voice_id,
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128"
    )

    filename = f"output_{uuid.uuid4().hex}.mp3"
    filepath = f"temp_audio/{filename}"
    os.makedirs("temp_audio", exist_ok=True)
    save(audio, filepath)
    return filepath

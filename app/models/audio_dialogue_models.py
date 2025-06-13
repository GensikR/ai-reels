# app/models/audio_models.py

from pydantic import BaseModel

class AudioRequest(BaseModel):
    text: str
    voice: str = "Rachel"

class AudioResponse(BaseModel):
    audio_file: str

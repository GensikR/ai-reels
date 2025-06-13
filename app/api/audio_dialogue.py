# app/api/audio.py

from fastapi import APIRouter
from app.models.audio_dialogue_models import AudioRequest, AudioResponse
from app.services.audio_gen import generate_audio

router = APIRouter()

@router.post("/audio_dialogue", response_model=AudioResponse)
async def audio_handler(request: AudioRequest):
    audio_path = generate_audio(request.text, voice=request.voice)
    return AudioResponse(audio_file=audio_path)

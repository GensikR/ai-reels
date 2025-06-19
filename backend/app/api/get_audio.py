from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.models.audio_dialogue_models import AudioRequest
from app.services.audio_gen import generate_audio_file
import os

router = APIRouter()

@router.post("/get_audio")
async def generate_audio_route(request: AudioRequest):
    try:
        audio_path = generate_audio_file(request.text, request.voice_id)
        return FileResponse(
            audio_path,
            media_type="audio/mpeg",
            filename=os.path.basename(audio_path)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

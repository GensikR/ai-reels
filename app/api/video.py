from fastapi import APIRouter, HTTPException
from app.models.video_models import VideoGenerationRequest, VideoGenerationResponse
from app.services.video_gen import generate_video

router = APIRouter()

@router.post("/video", response_model=VideoGenerationResponse)
async def create_video(request: VideoGenerationRequest):
    try:
        output = await generate_video(request.image_paths, request.audio_path, request.output_path)
        return VideoGenerationResponse(video_path=output)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

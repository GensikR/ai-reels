from fastapi import APIRouter, HTTPException, Form, File, UploadFile
from typing import List
from app.models.video_models import VideoGenerationResponse
from app.services.video_gen import generate_video
import os

router = APIRouter()

@router.post("/get_video", response_model=VideoGenerationResponse)
async def create_video(
    audio_path: str = Form(...),
    seconds_per_image: int = Form(5),
    images: List[UploadFile] = File(...),
):
    try:
        output_path = "temp_output/final_video.mp4"

        # Save uploaded images and get their paths
        image_dir = "temp_images"
        os.makedirs(image_dir, exist_ok=True)
        image_paths = []

        for img in images:
            path = os.path.join(image_dir, img.filename)
            with open(path, "wb") as f:
                f.write(await img.read())
            image_paths.append(path)

        # Generate video
        output = await generate_video(image_paths, audio_path, output_path, seconds_per_image)
        return VideoGenerationResponse(video_path=output)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, Form, UploadFile, File
from fastapi.responses import JSONResponse
from app.services.video_gen import generate_video
from app.models.video_models import VideoGenerationResponse
import os

router = APIRouter()

@router.post("/get_video", response_model=VideoGenerationResponse)
async def get_video(
    audio_path: str = Form(...),
    images: list[UploadFile] = File(...),
    seconds_per_image: int = Form(5)
):
    # 📁 Ensure output directories exist
    output_dir = os.path.abspath("temp_output")
    image_dir = os.path.join(output_dir, "images")
    os.makedirs(image_dir, exist_ok=True)

    # 🖼️ Save uploaded images
    image_paths = []
    for idx, img in enumerate(images):
        filename = f"img_{idx}.png"
        path = os.path.join(image_dir, filename)
        with open(path, "wb") as f:
            f.write(await img.read())
        image_paths.append(path)

    # 🎬 Generate video
    output_path = os.path.join(output_dir, "final_video.mp4")
    await generate_video(
        image_paths=image_paths,
        audio_path=os.path.abspath(audio_path),  # 🔒 ensure absolute path
        output_path=output_path,
        seconds_per_image=seconds_per_image
    )

    # ✅ Return relative path for NGINX
    return {"video_path": "/temp_output/final_video.mp4"}

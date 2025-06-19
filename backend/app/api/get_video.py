from fastapi import APIRouter, Form, UploadFile, File
from fastapi.responses import JSONResponse
import os
from app.services.video_gen import generate_video

router = APIRouter()

@router.post("/get_video")
async def get_video(
    audio_path: str = Form(...),
    images: list[UploadFile] = File(...),
    seconds_per_image: int = Form(5)
):
    # 📂 Save uploaded images
    image_paths = []
    image_dir = os.path.abspath("temp_output/images")
    os.makedirs(image_dir, exist_ok=True)

    for idx, img in enumerate(images):
        path = os.path.join(image_dir, f"img_{idx}.png")
        with open(path, "wb") as out_file:
            content = await img.read()
            out_file.write(content)
        image_paths.append(path)

    # 🎞️ Output video path
    output_path = os.path.abspath("temp_output/final_video.mp4")
    
    await generate_video(
        image_paths=image_paths,
        audio_path=audio_path,
        output_path=output_path,
        seconds_per_image=seconds_per_image
    )

    # ✅ Return web-accessible relative path (for NGINX)
    return JSONResponse(content={"video_path": "/temp_output/final_video.mp4"})

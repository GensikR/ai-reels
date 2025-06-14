from pydantic import BaseModel, HttpUrl
from typing import List

class VideoGenerationRequest(BaseModel):
    image_paths: List[str]  # Local or cloud paths to images
    audio_path: str         # Path to the generated audio file
    output_path: str        # Path where to save the final video

class VideoGenerationResponse(BaseModel):
    video_path: str

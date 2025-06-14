from pydantic import BaseModel

class VideoGenerationRequest(BaseModel):
    image_paths: list[str]
    audio_path: str
    output_path: str = "final_output.mp4"
    seconds_per_image: int = 5

class VideoGenerationResponse(BaseModel):
    video_path: str

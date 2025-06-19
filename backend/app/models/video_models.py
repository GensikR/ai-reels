from pydantic import BaseModel

class VideoGenerationResponse(BaseModel):
    video_path: str

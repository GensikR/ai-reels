from pydantic import BaseModel

class ImageGenerationRequest(BaseModel):
    script: str
    num_images: int
    seconds_per_image: int = 5

class ImageGenerationResponse(BaseModel):
    image_paths: list[str]

from fastapi import APIRouter
from app.models.images_model import ImageGenerationRequest, ImageGenerationResponse
from app.services.images_gen import generate_images_from_script

router = APIRouter()

@router.post("/images", response_model=ImageGenerationResponse)
def generate_images(request: ImageGenerationRequest):
    images = generate_images_from_script(
        script=request.script,
        num_images=request.num_images
    )
    return ImageGenerationResponse(image_paths=images)

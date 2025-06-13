from fastapi import APIRouter, HTTPException
from app.models.dialogue_models import DialogueRequest, DialogueResponse
from app.services import dialogue_gen

router = APIRouter()

@router.post("/dialogue", response_model=DialogueResponse)
async def generate_dialogue(request: DialogueRequest):
    try:
        script = await dialogue_gen.generate_dialogue(request)
        return DialogueResponse(script=script)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

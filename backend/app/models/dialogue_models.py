from pydantic import BaseModel
from typing import List

class DialogueRequest(BaseModel):
    type: str  # 'portfolio', 'commercial', 'satirical', etc.
    description: str
    images: List[str]  # base64-encoded strings like data:image/jpeg;base64,...
    duration: int = 30  # in seconds

class DialogueResponse(BaseModel):
    script: str  # the generated dialogue/script content

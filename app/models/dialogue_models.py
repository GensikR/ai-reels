from pydantic import BaseModel
from typing import List

class DialogueRequest(BaseModel):
    characters: List[str]
    tone: str
    topic: str
    length: str = "short"
    purpose: List[str]

class DialogueResponse(BaseModel):
    script: str

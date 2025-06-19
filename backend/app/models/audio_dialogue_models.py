from pydantic import BaseModel

class AudioRequest(BaseModel):
    text: str
    #voice_id: str = "JBFqnCBsd6RMkjVDRZzb"  # Elevenlabs
    voice_id: str = "en-US-Wavenet-D"       # Google tts

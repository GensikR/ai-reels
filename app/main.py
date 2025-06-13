from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Viral Shorts AI backend is up!"}

# Register the routes
from app.api import dialogue
app.include_router(dialogue.router, tags=["Dialogue"])

from app.api import audio_dialogue
app.include_router(audio_dialogue.router)



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import texttospeech
from app.utils.google_creds import get_google_tts_client  # ✅ updated import

app = FastAPI()

# CORS config (adjust for production later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root route
@app.get("/")
def read_root():
    return {"message": "Viral Shorts AI backend is up!"}

# Routes
from app.api import get_dialogue
app.include_router(get_dialogue.router, tags=["Dialogue"])

from app.api import get_audio
app.include_router(get_audio.router)

from app.api import images
app.include_router(images.router)

from app.api import get_video
app.include_router(get_video.router)

# Static files for audio and output video
from fastapi.staticfiles import StaticFiles
app.mount("/temp_audio", StaticFiles(directory="temp_audio"), name="temp_audio")
app.mount("/temp_output", StaticFiles(directory="temp_output"), name="temp_output")

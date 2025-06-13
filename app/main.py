from fastapi import FastAPI
from app.api import dialogue

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Viral Shorts AI backend is up!"}

# Register the route
app.include_router(dialogue.router, tags=["Dialogue"])


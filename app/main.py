from fastapi import FastAPI
from app.api import generate

app = FastAPI()

# Register routes
app.include_router(generate.router)

@app.get("/")
def read_root():
    return {"message": "Viral Shorts AI backend is up!"}

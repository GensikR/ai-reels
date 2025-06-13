from fastapi import APIRouter

router = APIRouter()

@router.get("/generate")
def generate_test():
    return {"status": "success", "message": "Pipeline will run from here"}

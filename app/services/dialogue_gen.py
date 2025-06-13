import openai
from core.config import settings
from app.models.dialogue_models import DialogueRequest #TODO: Implement this

openai.api_key = settings.OPENAI_API_KEY

SYSTEM_PROMPT = (
    "SYSTEM CONTEXT PROMPT GOES HERE"
)

async def generate_dialogue(request: DialogueRequest) -> str:
    user_prompt = (
        "USER PROMPT GOES HERE"
    )

    try:
        response = await openai.ChatCompletion.acreate(
            model = "gpt-3.5-turbo",
            messages =[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature = 0.9,
            max_tokens = 700,
        )
        return response.choices[0].message["content"].strip()
    
    except Exception as e:
        raise RuntimeError(f"Dialogue Generation failed: {str(e)}")
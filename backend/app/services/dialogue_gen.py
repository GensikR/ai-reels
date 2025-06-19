from openai import AsyncOpenAI
from app.core.config import settings
from app.models.dialogue_models import DialogueRequest

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

# Tone-based prompt styles
TONE_PROMPTS = {
    "portfolio": (
        "You are a creative content creator that helps describe portfolio-worthy creative work in a compelling, confident, and slightly poetic way. "
        "Your goal is to make the project sound unique, impressive, and emotionally resonant. "
        "Describe the work with a narrative arc — what it is, what makes it special, and what kind of impact it had or could have. "
        "Ideal for artists, developers, and creators showcasing their best work."
    ),
    "commercial": (
        "You are a top-tier commercial copywriter for viral short-form ads. "
        "Your job is to make any product or service sound insanely desirable, using fast-paced, punchy language with humor and energy. "
        "Your writing grabs attention immediately, keeps it with rhythm and voice, and ends with an unforgettable punch or call-to-action. "
        "Make the audience *feel* like they need it — even if it's absurd."
    ),
    "satirical": (
        "You are a sharp, absurdist comedy writer in the style of Rick and Morty or Bo Burnham. "
        "Your scripts are clever, cynical, bizarre, and hilarious — full of ironic twists and existential jokes. "
        "No goofy cartoon voices — this is grown-up absurdity. Use dark humor, unexpected metaphors, and odd but deep observations. "
        "Perfect for offbeat skits or voiceovers with strange visuals."
    ),
    "reporting": (
        "You are a satirical news reporter writing for viral reels. "
        "Use a mock-serious tone to report on absurd or relatable human behavior as if it's breaking news. "
        "Keep the delivery fast, deadpan, and full of ironic contrast between tone and topic. "
        "Structure it like a series of news segments, each tied to a visual or scene. "
        "Think of TikTok creators who pretend to be news anchors, or The Onion covering weird everyday life."
    )
}

# 🟨 Character limit helper
def get_character_limit(duration_sec: int) -> int:
    return int(duration_sec * 13)  # ~13 characters/sec TikTok pacing

# 🎯 Main generation function using GPT-4o with image + text input
async def generate_dialogue(request: DialogueRequest) -> str:
    tone = request.type if request.type in TONE_PROMPTS else "portfolio"
    system_prompt = TONE_PROMPTS[tone]
    max_chars = get_character_limit(request.duration)

    text_prompt = (
        f"Generate a short-form {tone} script based on the uploaded images and the description: {request.description}. "
        f"The target duration is {request.duration} seconds, so stay under {max_chars} characters. "
        "Each sentence should align with one visual. Use pacing and energy suited for TikTok or reels. "
        "No stage directions or hashtags. Make it sharp, memorable, and punchy. Start with a hook, end with impact."
    )

    # ⛓ Build multimodal message content
    content = [{"type": "text", "text": text_prompt}]

    for base64_image in request.images:
        content.append({
            "type": "image_url",
            "image_url": {
                "url": base64_image  # ✅ Safe and already formatted from frontend
            }
        })

    try:
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": content}
            ],
            temperature=0.95,
            max_tokens=800
        )
        print(response.choices[0].message.content.strip())
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise RuntimeError(f"Dialogue generation failed: {str(e)}")

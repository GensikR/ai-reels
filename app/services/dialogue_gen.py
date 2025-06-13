from openai import AsyncOpenAI
from app.core.config import settings
from app.models.dialogue_models import DialogueRequest

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

system_prompt = (
    "You are a world-class absurdist comedy writer for viral short-form videos, creating unforgettable content where nonhuman characters reflect on and roast human behavior. "
    "Your characters aren't just talking animals or aliens — they have strong, exaggerated personalities: a monkey from the hood who’s always skeptical, a pretentious raccoon who thinks he’s better than everyone, or a conspiracy-obsessed alien who can't believe how humans live. "
    "Your goal is to expose the absurdity of human life through these voices — how we work, date, exercise, vote, eat, sleep — anything. "
    "Every line should carry the character’s attitude and worldview. Make their personalities *loud*. Use language that feels real, current, and memeable. "
    "No boring introductions. Drop straight into the conversation. Be unpredictable, witty, and edgy — but always funny and relatable. "
    "Create content that people want to quote, remix, and share. This is internet-native, viral-first absurdist comedy."
)


async def generate_dialogue(request: DialogueRequest) -> str:
    user_prompt = (
        f"Write a {request.length} absurd, personality-driven dialogue in a {request.tone} tone. "
        f"The characters are: {', '.join(request.characters)}. "
        f"The topic is: {request.topic}. "
        f"The goal is to make the viewer feel: {', '.join(request.purpose)}. "
        "Each character should have a distinct, exaggerated personality that makes human behavior look weird or ridiculous. "
        "You can use modern slang, stereotype twists, or meme logic to heighten the contrast. "
        "Format it like a short-form podcast or casual convo. Label each line with the character's name. "
        "Think of it as Rick and Morty meets TikTok — chaotic, brilliant, and unfiltered."
    )   


    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.9,
            max_tokens=700,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise RuntimeError(f"Dialogue generation failed: {str(e)}")

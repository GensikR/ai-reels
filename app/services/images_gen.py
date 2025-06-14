import os
import base64
from typing import List
from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def chunk_script(script: str, num_chunks: int) -> List[str]:
    words = script.split()
    chunk_size = max(1, len(words) // num_chunks)
    return [' '.join(words[i*chunk_size : (i+1)*chunk_size]) for i in range(num_chunks)]

def generate_images_from_script(script: str, num_images: int, output_dir: str = "generated_images") -> List[str]:
    os.makedirs(output_dir, exist_ok=True)
    chunks = chunk_script(script, num_images)
    image_paths = []

    for i, prompt in enumerate(chunks):
        print(f"[Image {i+1}/{num_images}] Generating image with prompt: {prompt}")
        response = client.images.generate(
            prompt=prompt,
            model="dall-e-2",
            size="512x512",
            response_format="b64_json",  # 🔥 base64 to avoid download
            n=1
        )

        image_b64 = response.data[0].b64_json
        image_bytes = base64.b64decode(image_b64)

        path = os.path.join(output_dir, f"frame_{i:03}.jpg")
        with open(path, "wb") as f:
            f.write(image_bytes)

        image_paths.append(path)

    return image_paths

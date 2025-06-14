import subprocess
import os
from typing import List

async def generate_video(image_paths: List[str], audio_path: str, output_path: str) -> str:
    list_file = 'inputs.txt'

    with open(list_file, 'w') as f:
        for img in image_paths:
            f.write(f"file '{img}'\n")
            f.write("duration 1\n")
        f.write(f"file '{image_paths[-1]}'\n")  # Repeat last image

    # ✅ Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    cmd = [
        'ffmpeg',
        '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', list_file,
        '-i', audio_path,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-strict', 'experimental',
        '-shortest',
        output_path
    ]

    subprocess.run(cmd, check=True)

    os.remove(list_file)
    return output_path

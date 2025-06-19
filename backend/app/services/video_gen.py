import subprocess
import os
from typing import List

async def generate_video(
    image_paths: List[str],
    audio_path: str,
    output_path: str,
    seconds_per_image: int = 5  # Default to 5 seconds per image
) -> str:
    list_file = 'inputs.txt'

    # 📝 Write FFmpeg concat list
    with open(list_file, 'w') as f:
        for img in image_paths:
            f.write(f"file '{img}'\n")
            f.write(f"duration {seconds_per_image}\n")
        f.write(f"file '{image_paths[-1]}'\n")  # Repeat last image for freeze-frame at end

    # 📂 Make sure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 🎬 Run FFmpeg (❌ no -r here)
    cmd = [
        'ffmpeg',
        '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', list_file,
        '-i', audio_path,
        '-vsync', 'vfr',  # important to respect per-image durations
        '-pix_fmt', 'yuv420p',
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-shortest',
        output_path
    ]

    subprocess.run(cmd, check=True)
    os.remove(list_file)
    return output_path

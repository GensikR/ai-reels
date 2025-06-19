import subprocess
import os
from typing import List

async def generate_video(
    image_paths: List[str],
    audio_path: str,
    output_path: str,
    seconds_per_image: int = 5
) -> str:
    list_file = 'inputs.txt'

    # ✅ Write FFmpeg-compatible input list
    with open(list_file, 'w') as f:
        for img in image_paths:
            abs_img = os.path.abspath(img)
            f.write(f"file '{abs_img}'\n")
            f.write(f"duration {seconds_per_image}\n")
        # Repeat last image to avoid FFmpeg cut-off
        f.write(f"file '{os.path.abspath(image_paths[-1])}'\n")

    # 📂 Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 🎬 Build FFmpeg command
    cmd = [
        'ffmpeg',
        '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', list_file,
        '-i', os.path.abspath(audio_path),
        '-vsync', 'vfr',
        '-pix_fmt', 'yuv420p',
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-shortest',
        os.path.abspath(output_path)
    ]

    # 🛠️ Run the command and catch errors
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"FFmpeg failed:\n{e}")
    finally:
        if os.path.exists(list_file):
            os.remove(list_file)

    return output_path

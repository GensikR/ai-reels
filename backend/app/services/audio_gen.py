#ELEVENLABS IMPLEMENTATION
# import os
# import uuid
# from elevenlabs import ElevenLabs, save
# from dotenv import load_dotenv

# load_dotenv()

# client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

# def generate_audio_file(text: str, voice_id: str = "JBFqnCBsd6RMkjVDRZzb") -> str:
#     audio = client.text_to_speech.convert(
#         text=text,
#         voice_id=voice_id,
#         model_id="eleven_multilingual_v2",
#         output_format="mp3_44100_128"
#     )

#     filename = "output_latest.mp3"
#     output_dir = "temp_audio"
#     os.makedirs(output_dir, exist_ok=True)

#     filepath = os.path.join(output_dir, filename)  # → temp_audio/output_latest.mp3
#     save(audio, filepath)

#     return filepath  # ✅ REAL filesystem path

# GOOGLE TTS IMPLEMENTATION
import os
from google.cloud import texttospeech
from app.utils.google_creds import get_google_tts_client  # ✅ assumes you're using this

# 🔊 Generate audio using Google Cloud TTS
def generate_audio_file(text: str, voice_id: str = "en-US-Wavenet-D") -> str:
    # 🧠 Get a configured TTS client with credentials
    client = get_google_tts_client()

    # 🗣️ Set the input text
    synthesis_input = texttospeech.SynthesisInput(text=text)

    # 🎙️ Voice configuration
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name=voice_id
    )

    # 💽 Audio output config
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # 🚀 Send request to Google TTS API
    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    # 💾 Save the audio file
    filename = "output_google.mp3"
    output_dir = "temp_audio"
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "wb") as out:
        out.write(response.audio_content)

    return filepath  # ✅ Real local file path to MP3

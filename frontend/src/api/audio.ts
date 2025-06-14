export const generateAudio = async (
  script: string,
  voiceId: string = "JBFqnCBsd6RMkjVDRZzb"
): Promise<string> => {
  const response = await fetch("http://localhost:8000/audio_dialogue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: script, voice_id: voiceId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Audio generation failed: ${errorText}`);
  }

  const data = await response.json();
  return data.audio_path; // e.g., /temp_audio/output_xyz.mp3
};

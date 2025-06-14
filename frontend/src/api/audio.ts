export const generateAudio = async (script: string): Promise<string> => {
  const response = await fetch("http://localhost:8000/audio_dialogue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: script, voice: "Rachel" })
  });

  if (!response.ok) {
    throw new Error("Audio generation failed");
  }

  const data = await response.json();
  return data.audio_path; // backend must return { audio_path: "local/path.wav" }
};

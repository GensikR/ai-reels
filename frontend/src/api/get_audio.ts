export const generateAudio = async (
  script: string,
  voiceId: string = "JBFqnCBsd6RMkjVDRZzb"
): Promise<string> => {
  const response = await fetch("http://localhost:8000/get_audio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: script,
      voice_id: voiceId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Audio generation failed: ${errorText}`);
  }

  const data = await response.json();

  // Validate audio_path
  if (!data.audio_path || typeof data.audio_path !== "string") {
    throw new Error("Invalid audio response from server.");
  }

  // ✅ Construct full URL
  return new URL(data.audio_path, "http://localhost:8000").toString();
};

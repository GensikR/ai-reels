// Eleven Labs
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
  return `http://127.0.0.1:8000${data.audio_path}`; // full URL to access from frontend
};


// // 🎙️ Generate audio from Bark
// export async function generateAudio(text: string): Promise<Blob> {
//   const response = await fetch("https://bfe5-34-16-142-131.ngrok-free.app/generate_audio", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ text })
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Audio generation failed: ${errorText}`);
//   }

//   return await response.blob();
// }
  
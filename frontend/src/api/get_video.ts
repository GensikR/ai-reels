export const generateVideo = async (
  audioPath: string,           // ⬅️ Now sending the saved path like '/temp_audio/output_latest.mp3'
  images: File[],
  secondsPerImage: number = 5
): Promise<string> => {
  const formData = new FormData();

  // ✅ Pass audio path (not blob)
  formData.append("audio_path", audioPath);

  // 🖼️ Add images
  images.forEach((img) => {
    formData.append("images", img);
  });

  // ⏱️ Add transition time
  formData.append("seconds_per_image", secondsPerImage.toString());

  // 🚀 Send to backend
  const response = await fetch("/api/get_video", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Video generation failed: ${errorText}`);
  }

  const data = await response.json();
  return `http://localhost:8000/${data.video_path}`;
};

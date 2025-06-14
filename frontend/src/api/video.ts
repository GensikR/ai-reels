export const generateVideo = async (
  audioPath: string,
  images: File[]
): Promise<string> => {
  const formData = new FormData();
  formData.append("audio_path", audioPath);
  images.forEach((img) => formData.append("images", img));

  const response = await fetch("http://localhost:8000/video", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Video generation failed");
  }

  const data = await response.json();
  return data.video_url; // { video_url: "..." }
};

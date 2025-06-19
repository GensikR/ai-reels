export const generateVideo = async (
  audioPath: string,
  images: File[],
  secondsPerImage: number = 5
): Promise<string> => {
  const formData = new FormData();
  formData.append("audio_path", audioPath);
  images.forEach((img) => formData.append("images", img));
  formData.append("seconds_per_image", secondsPerImage.toString());

  const response = await fetch("http://localhost:8000/get_video", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Video generation failed: ${errorText}`);
  }

  // ✅ Parse backend JSON response
  const data = await response.json();

  // ✅ Construct full URL (assumes video is hosted by NGINX or FastAPI static)
  return data.video_path.startsWith("http")
    ? data.video_path
    : `http://localhost:8000${data.video_path}`;
};

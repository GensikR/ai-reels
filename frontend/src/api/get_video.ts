export const generateVideo = async (
  audioPath: string,
  images: File[],
  secondsPerImage: number = 5
): Promise<string> => {
  const formData = new FormData();
  formData.append("audio_path", audioPath);
  images.forEach((img) => formData.append("images", img));
  formData.append("seconds_per_image", secondsPerImage.toString());

  const response = await fetch("/api/get_video", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Video generation failed: ${errorText}`);
  }

  const data = await response.json();

  // ✅ Since backend returns a relative path like /temp_output/video.mp4
  // and it's served via NGINX, this is valid:
  return data.video_path;
};

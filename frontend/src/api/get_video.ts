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

  // ✅ Get the video file as a blob, not JSON
  const blob = await response.blob();

  // 🎥 Create an object URL for use in <video> src
  const videoUrl = URL.createObjectURL(blob);

  return videoUrl;
};

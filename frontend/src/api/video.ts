export const generateVideo = async (
  audioPath: string,
  images: File[],
  secondsPerImage: number = 5
): Promise<string> => {
  const formData = new FormData();
  formData.append("audio_path", audioPath);
  formData.append("seconds_per_image", secondsPerImage.toString());
  images.forEach((file) => formData.append("images", file));

  const response = await fetch("http://localhost:8000/video", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Video generation failed: ${error}`);
  }

  const data = await response.json();
  return `http://localhost:8000${data.video_path}`;
};

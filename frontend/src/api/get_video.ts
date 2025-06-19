export const generateVideo = async (
  audioPath: string,
  images: File[],
  secondsPerImage: number = 5
): Promise<string> => {
  const formData = new FormData();

  // ✅ Add audio path as a form field
  formData.append("audio_path", audioPath);

  // ✅ Append each image with the same key
  images.forEach((img) => {
    formData.append("images", img); // Do not use "images[]" or numbered keys
  });

  // ✅ Add seconds per image
  formData.append("seconds_per_image", secondsPerImage.toString());

  const response = await fetch("/api/get_video", {
    method: "POST",
    body: formData,
  });

  const rawText = await response.text(); // Read raw text first

  if (!response.ok) {
    console.error("❌ Backend error:", rawText);
    throw new Error(`Video generation failed: ${rawText}`);
  }

  let data: { video_path: string };

  try {
    data = JSON.parse(rawText);
  } catch (err) {
    console.error("❌ Failed to parse backend JSON:", rawText);
    throw new Error("Invalid JSON response from server.");
  }

  if (!data.video_path) {
    throw new Error("Missing video_path in backend response.");
  }

  // ✅ Return full URL to video
  return data.video_path.startsWith("http")
    ? data.video_path
    : `http://localhost:8000${data.video_path}`;
};

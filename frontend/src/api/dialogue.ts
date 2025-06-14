export const generateDialogue = async (
  type: string,
  description: string,
  images: File[]
): Promise<string> => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("description", description);
  images.forEach((img) => formData.append("images", img)); // send multiple image files

  const response = await fetch("http://localhost:8000/dialogue", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Dialogue generation failed");
  }

  const data = await response.json();
  return data.script;
};

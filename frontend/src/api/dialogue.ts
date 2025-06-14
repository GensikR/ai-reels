export const generateDialogue = async (
  type: string,
  description: string,
  images: File[],
  duration: number = 30
): Promise<string> => {
  const formData = new FormData();

  // Add scalar fields
  formData.append("type", type);
  formData.append("description", description);
  formData.append("duration", duration.toString());

  // Add image files
  images.forEach((file) => {
    formData.append("images", file); // same key for multiple files
  });

  try {
    const response = await fetch("http://localhost:8000/dialogue", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Dialogue generation failed: ${errorText}`);
    }

    const data = await response.json();
    return data.script;
  } catch (err) {
    console.error("generateDialogue error:", err);
    throw err;
  }
};

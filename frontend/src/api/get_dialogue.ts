export const generateDialogue = async (
  type: string,
  description: string,
  images: File[],
  duration: number = 15
): Promise<string> => {
  const base64Images: string[] = await Promise.all(
    images.map(async (file) => {
      const base64 = await toBase64(file);
      return base64 as string;
    })
  );

  const response = await fetch("http://localhost:8000/get_dialogue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      description,
      images: base64Images,
      duration,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Dialogue generation failed: ${text}`);
  }

  const data = await response.json();
  return data.script; // ✅ FIXED HERE
};


// Utility: convert File -> base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

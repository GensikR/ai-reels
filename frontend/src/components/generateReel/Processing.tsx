import { useEffect, useState } from "react";
import StepWrapper from "./StepWrapper";
import { generateDialogue } from "@/api/get_dialogue";
import { generateAudio } from "@/api/get_audio"; 
import { generateVideo } from "@/api/get_video";

interface Props {
  type: string;
  description: string;
  images: File[];
  onComplete: (videoUrl: string) => void;
}

const statusMessages = [
  "Generating script...",
  "Synthesizing voice...",
  "Rendering video...",
  "Finalizing output..."
];

const Processing = ({ type, description, images, onComplete }: Props) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const secondsPerImage = 5;

  useEffect(() => {
    const processPipeline = async () => {
      if (images.length === 0) {
        setError("No images uploaded. Please go back and upload at least one image.");
        return;
      }

      try {
        // 1️⃣ Generate Dialogue
        setStatusIndex(0);
        const dialogue = await generateDialogue(type, description, images);

        // 2️⃣ Generate + Upload Audio
        setStatusIndex(1);
        const audioPath = await generateAudio(dialogue);
        // 3️⃣ Generate Video using audio and images
        setStatusIndex(2);
        const videoUrl = await generateVideo(audioPath, images, secondsPerImage);

        // ✅ 4️⃣ Done
        setStatusIndex(3);
        setTimeout(() => onComplete(videoUrl), 1000); 
      } catch (err) {
        console.error("Pipeline failed:", err);
        setError("Something went wrong during video generation. Please try again.");
      }
    };

    processPipeline();
  }, [type, description, images, onComplete]);

  return (
    <StepWrapper title="Step 4: Processing Your Video 🎬">
      <div className="text-center text-white animate-pulse text-lg mt-4">
        {error ? "❌ Error" : statusMessages[statusIndex]}
      </div>

      {error && (
        <div className="text-red-400 text-center mt-4 text-sm font-semibold">
          {error}
        </div>
      )}

      {!error && (
        <div className="mt-6 flex justify-center">
          <div className="w-20 h-20 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
    </StepWrapper>
  );
};

export default Processing;

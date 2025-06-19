import { useEffect, useState } from "react";
import StepWrapper from "./StepWrapper";
import { generateVideo } from "@/api/get_video";
import { generateAudio } from "@/api/get_audio";

interface Props {
  dialogue: string;
  images: File[];
  onComplete: (videoUrl: string) => void;
}

const statusMessages = [
  "Synthesizing voice...",
  "Rendering video...",
  "Finalizing output..."
];

const Processing = ({ dialogue, images, onComplete }: Props) => {
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
        // 1️⃣ Generate Audio
        setStatusIndex(0);
        const audioPath = await generateAudio(dialogue);
        // 2️⃣ Generate Video
        setStatusIndex(1);
        const videoUrl = await generateVideo(audioPath, images, secondsPerImage);

        // ✅ 3️⃣ Done
        setStatusIndex(2);
        setTimeout(() => onComplete(videoUrl), 1000);
      } catch (err) {
        console.error("Video generation failed:", err);
        setError("Something went wrong during video generation. Please try again.");
      }
    };

    processPipeline();
  }, [dialogue, images, onComplete]);

  return (
    <StepWrapper title="Step 4: Generating Your Final Video 🎥">
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

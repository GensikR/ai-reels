import { useEffect } from "react";
import StepWrapper from "./StepWrapper";
import type { TypeOptions } from "@/types";

interface Props {
  type: TypeOptions;
  description: string;
  images: File[];
  videoUrl: string;
  onVideoGenerated: (url: string) => void;
  onBack: () => void;
}

const ResultsDisplay = ({ type, description, images, videoUrl, onVideoGenerated, onBack }: Props) => {
  useEffect(() => {
    if (!videoUrl) {
      // TODO: Replace this with real API call to FastAPI
      setTimeout(() => {
        onVideoGenerated("https://www.w3schools.com/html/mov_bbb.mp4");
      }, 3000);
    }
  }, [videoUrl, onVideoGenerated]);

  return (
    <StepWrapper title="Step 4: Your Video is Ready 🎉" onBack={onBack}>
      {!videoUrl ? (
        <p className="text-white text-center animate-pulse">Generating video...</p>
      ) : (
        <video controls className="w-full rounded-xl shadow-lg mt-4">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </StepWrapper>
  );
};

export default ResultsDisplay;

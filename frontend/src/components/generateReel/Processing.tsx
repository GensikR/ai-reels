// Processing.tsx
import React, { useEffect, useState } from "react";
import StepWrapper from "./StepWrapper";

interface Props {
  onComplete: (videoUrl: string) => void;
}

const statusMessages = [
  "Analyzing images...",
  "Generating script...",
  "Synthesizing voice...",
  "Rendering video...",
  "Finalizing output..."
];

const Processing = ({ onComplete }: Props) => {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < statusMessages.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => {
          onComplete("https://www.w3schools.com/html/mov_bbb.mp4");
        }, 1000);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <StepWrapper title="Step 4: Processing Your Video 🎬">
      <div className="text-center text-white animate-pulse text-lg mt-4">
        {statusMessages[statusIndex]}
      </div>
      <div className="mt-6 flex justify-center">
        <div className="w-20 h-20 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
      </div>
    </StepWrapper>
  );
};

export default Processing;
import StepWrapper from "./StepWrapper";
import { generateDialogue } from "@/api/get_dialogue";
import type { TypeOptions } from "./TypeSelection";
import { useState, useEffect } from "react";

interface Props {
  type: TypeOptions;
  description: string;
  images: File[];
  duration: number;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const Dialogue = ({ type, description, images, duration, onChange, onNext, onBack }: Props) => 
{
  const [generated, setGenerated] = useState<string>("Generating...");

  useEffect(() => {
    const fetchDialogue = async () => {
      try {
        const dialogue = await generateDialogue(type, description, images, duration);
        setGenerated(dialogue);
        onChange?.(dialogue);
      } catch (error) {
        console.error('Failed to generate dialogue:', error);
        setGenerated("❌ Failed to generate dialogue. Please try again.");
      }
    };

    fetchDialogue();
  }, [type, description, images, duration, onChange]);

  return (
    <StepWrapper title="🧠 AI Generated Dialogue" onBack={onBack} onNext={onNext}>
      <p className="text-zinc-300 text-lg font-medium">
        Based on your input, here's what the AI came up with:
      </p>
      <div className="relative p-6 mt-2 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-2xl border border-white/10 shadow-lg animate-fade-in">
        <blockquote className="text-white text-xl leading-relaxed font-semibold italic whitespace-pre-line transition-all duration-500 ease-in-out">
          {generated}
        </blockquote>
        <div className="absolute top-0 right-0 m-3 px-3 py-1 text-xs rounded-full bg-purple-600/30 text-purple-200 font-bold">
          AI Output
        </div>
      </div>
    </StepWrapper>
  );
};

export default Dialogue;

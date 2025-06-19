import React from "react";
import { Newspaper, Ghost, Flame, Laugh } from "lucide-react";
import StepWrapper from "./StepWrapper";
import type { TypeOptions } from "@/types";

type Props = {
  value: TypeOptions;
  onChange: (val: TypeOptions) => void;
  onNext: () => void;
};

const options: {
  label: string;
  icon: React.ReactNode;
  value: Exclude<TypeOptions, "none">;
}[] = [
  { label: "Satirical", icon: <Laugh className="w-5 h-5" />, value: "satirical" },
  { label: "Reporting", icon: <Newspaper className="w-5 h-5" />, value: "reporting" },
  { label: "Commercial", icon: <Ghost className="w-5 h-5" />, value: "commercial" },
  { label: "Portfolio", icon: <Flame className="w-5 h-5" />, value: "portfolio" },
];

const TypeSelection = ({ value, onChange, onNext }: Props) => {
  const isOptionSelected = value !== "none";

  return (
    <StepWrapper title="Step 1: Choose the Vibe 🎭" onNext={isOptionSelected ? onNext : undefined}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`
                flex flex-col items-center justify-center px-6 py-5 rounded-2xl transition
                border-2 text-white shadow-md relative backdrop-blur-md
                ${isSelected
                  ? "bg-gradient-to-br from-pink-500 to-purple-600 border-pink-400 scale-105 shadow-xl"
                  : "bg-zinc-800/60 border-white/10 hover:bg-zinc-700/40"}
              `}
            >
              <div className={`mb-2 ${isSelected ? "text-white" : "text-gray-400"}`}>
                {opt.icon}
              </div>
              <span className="text-sm font-semibold tracking-wide">{opt.label}</span>

              {isSelected && (
                <div className="absolute -inset-1 rounded-2xl border border-pink-500/50 animate-pulse pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </StepWrapper>
  );
};

export default TypeSelection;

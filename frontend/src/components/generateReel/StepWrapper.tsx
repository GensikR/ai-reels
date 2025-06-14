import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  title: string;
  onNext?: () => void;
  onBack?: () => void;
  children: React.ReactNode;
};

const StepWrapper = ({ title, onNext, onBack, children }: Props) => {
  return (
    <div className="relative bg-zinc-900/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/10 overflow-hidden">
      {/* Glowing Border Accent */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-20 blur-xl pointer-events-none" />

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-white drop-shadow-sm animate-fade-in-up">
        {title}
      </h2>

      {/* Content */}
      <div className="mt-6 space-y-4 animate-fade-in delay-100">{children}</div>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between items-center">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-zinc-700 hover:bg-zinc-600 rounded-lg shadow transition"
          >
            <ArrowLeft size={18} /> Back
          </button>
        ) : (
          <div />
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 rounded-lg shadow-lg transition"
          >
            Next <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepWrapper;

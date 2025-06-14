import React, { useRef } from "react";
import StepWrapper from "./StepWrapper";

interface Props {
  files: File[];
  onChange: (val: File[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const ImageUpload = ({ files, onChange, onNext, onBack }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      onChange(Array.from(e.dataTransfer.files));
    }
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <StepWrapper title="Step 3: Upload Your Images 📸" onNext={files.length > 0 ? onNext : undefined} onBack={onBack}>
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
        className="cursor-pointer w-full border-2 border-dashed border-white/20 hover:border-pink-500 rounded-xl py-12 flex flex-col items-center justify-center text-white/70 hover:text-white transition"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m5 4v8m0 0l4-4m-4 4l-4-4" />
        </svg>
        <p className="text-center text-sm font-medium">
          Click or drag & drop to upload images
        </p>
        <p className="text-xs text-white/40 mt-1">PNG, JPG, JPEG — up to 10 files</p>
      </label>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="aspect-square overflow-hidden rounded-xl border border-white/10 relative group"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-semibold">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </StepWrapper>
  );
};

export default ImageUpload;

import StepWrapper from "./StepWrapper";

interface Props {
  videoUrl: string;
  onBack: () => void;
}

const ResultsDisplay = ({ videoUrl, onBack }: Props) => {
  return (
    <StepWrapper title="Step 4: Your Video is Ready 🎉" onBack={onBack}>
      {!videoUrl ? (
        <p className="text-white text-center animate-pulse mt-6">Generating video...</p>
      ) : (
        <div className="flex flex-col items-center w-full">
          <video
            controls
            className="w-full rounded-xl shadow-lg mt-4 max-w-3xl"
            preload="auto"
            src={videoUrl} // ✅ Use directly as it may be a blob URL
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </StepWrapper>
  );
};

export default ResultsDisplay;

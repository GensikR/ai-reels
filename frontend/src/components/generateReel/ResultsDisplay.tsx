import StepWrapper from "./StepWrapper";

interface Props {
  videoUrl: string;
  onBack: () => void;
}

const ResultsDisplay = ({
  videoUrl,
  onBack
}: Props) => {
  // Use full URL if videoUrl is a relative path
  const fullVideoUrl = videoUrl.startsWith("http")
  ? videoUrl
  : `http://localhost:8000/${videoUrl.replace(/^\/+/, "")}`;


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
          >
            <source src={fullVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Optional: Show metadata */}
          {/* <p className="text-sm text-white/70 mt-4 text-center">
            Type: {type} | Description: {description}
          </p> */}
        </div>
      )}
    </StepWrapper>
  );
};

export default ResultsDisplay;

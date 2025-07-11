import { useState } from "react";
import TypeSelection from "./TypeSelection";
import Description from "./Description";
import Dialogue from "./Dialogue.tsx";
import ImageUpload from "./ImageUpload";
import ResultsDisplay from "./ResultsDisplay";
import Processing from "./Processing"
import type { ReelGenerationSteps, TypeOptions } from "@/types";

const GenerateReel = () => {
  const [currentStep, setCurrentStep] = useState<ReelGenerationSteps>("type");
  const [selectedType, setSelectedType] = useState<TypeOptions>("none");
  const [userDescription, setUserDescription] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);
  const [dialogue, setDialogue] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [generatedVideoURL, setGeneratedVideoURL] = useState<string>("");

  const handleNextStep = () => {
    switch (currentStep) {
      case "type":
        setDuration(30) //TODO: JUst to use and avoid warning remove later
        setCurrentStep("description");
        break;
      case "description":
        setCurrentStep("images");
        break;
      case "images":
        setCurrentStep("dialogue");
        break;
      case "dialogue":
        setCurrentStep("processing");
        break;
      case "processing":
        setCurrentStep("results");
        break;
      default:
        break;
    }
  };

  const handleBackStep = () => {
    switch (currentStep) {
      case "results":
        setCurrentStep("processing");
        break;
      case "processing":
        setCurrentStep("dialogue");
        break;
      case "dialogue":
        setCurrentStep("images");
        break;
      case "images":
        setCurrentStep("description");
        break;
      case "description":
      setCurrentStep("type");
      break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl">
        {currentStep === "type" && (
          <TypeSelection
            value={selectedType}
            onChange={setSelectedType}
            onNext={handleNextStep}
          />
        )}

        {currentStep === "description" && (
          <Description
            value={userDescription}
            onChange={setUserDescription}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {currentStep === "images" && (
          <ImageUpload
            files={uploadedImages}
            onChange={setUploadedImages}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {currentStep === "dialogue" && (
          <Dialogue 
            type={selectedType}
            description={userDescription}
            images={uploadedImages}
            duration={duration}
            onChange={setDialogue}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

       {currentStep === "processing" && (
        <Processing
          dialogue={dialogue}
          images={uploadedImages}
          onComplete={(url) => {
            setGeneratedVideoURL(url);
            setCurrentStep("results");
          }}
        />
      )}
        {currentStep === "results" && (
          <ResultsDisplay
            videoUrl={generatedVideoURL}
            onBack={handleBackStep}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateReel;

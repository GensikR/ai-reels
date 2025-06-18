import { useState } from "react";
import TypeSelection from "./TypeSelection";
import Description from "./Description";
import ImageUpload from "./ImageUpload";
import ResultsDisplay from "./ResultsDisplay";
import Processing from "./Processing"
import type { ReelGenerationSteps, TypeOptions } from "@/types";

const GenerateReel = () => {
  const [currentStep, setCurrentStep] = useState<ReelGenerationSteps>("type");
  const [selectedType, setSelectedType] = useState<TypeOptions>("none");
  const [userDescription, setUserDescription] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [generatedVideoURL, setGeneratedVideoURL] = useState<string>("");

  const handleNextStep = () => {
    switch (currentStep) {
      case "type":
        setCurrentStep("description");
        break;
      case "description":
        setCurrentStep("images");
        break;
      case "images":
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
      case "description":
        setCurrentStep("type");
        break;
      case "images":
        setCurrentStep("description");
        break;
      case "results":
        setCurrentStep("images");
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

       {currentStep === "processing" && (
        <Processing
          type={selectedType}
          description={userDescription}
          images={uploadedImages}
          onComplete={(url) => {
            setGeneratedVideoURL(url);
            setCurrentStep("results");
          }}
        />
      )}



        {currentStep === "results" && (
          <ResultsDisplay
            type={selectedType}
            description={userDescription}
            images={uploadedImages}
            videoUrl={generatedVideoURL}
            onBack={handleBackStep}
            onVideoGenerated={setGeneratedVideoURL}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateReel;

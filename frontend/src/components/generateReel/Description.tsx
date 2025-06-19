import StepWrapper from "./StepWrapper";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const Description = ({ value, onChange, onNext, onBack }: Props) => {
  return (
    <StepWrapper title="Step 2: Describe Your Video 🎤" onNext={value ? onNext : undefined} onBack={onBack}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="Describe what you want your video to be about..."
        className="w-full p-4 rounded-xl bg-zinc-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </StepWrapper>
  );
};

export default Description;
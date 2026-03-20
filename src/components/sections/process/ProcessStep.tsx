import type { processType } from "../../../types";
interface ProcessStepProps {
  data: processType;
}

export const ProcessStep = ({ data }: ProcessStepProps) => {
  return (
    <div className="process-step-item relative flex flex-col md:flex-row gap-10 py-20 border-t border-zinc-800/50">
      {/* Left Side: Index & Title */}
      <div className="md:w-1/3">
        <span className="text-zinc-600 font-mono text-sm uppercase tracking-widest">
          {data.id} — Phase
        </span>
        <h3 className="text-5xl font-bold text-white mt-4 uppercase italic">
          {data.title}
        </h3>
        <p className="text-zinc-500 mt-2 font-serif italic text-lg">
          "{data.tagline}"
        </p>
      </div>

      {/* Right Side: Narrative & List */}
      <div className="md:w-2/3 flex flex-col gap-6">
        <p className="text-zinc-300 text-xl leading-relaxed max-w-2xl">
          {data.description}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.keypoints.map((point, index) => (
            <li key={index} className="flex items-center text-zinc-500 text-sm uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full mr-3" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
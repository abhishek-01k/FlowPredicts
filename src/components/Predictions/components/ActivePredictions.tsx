import { PredictionCard } from "@/components/PredictionCard";
import { Prediction } from "@/types/prediction";
import { useAccount } from "wagmi";

const ActivePredictions = ({ predictions }: { predictions: Prediction[] }) => {
  const { address } = useAccount();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {predictions
        .filter((prediction) => prediction.creator !== address)
        .map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
    </div>
  );
};

export default ActivePredictions;

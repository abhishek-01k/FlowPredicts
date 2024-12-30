import { PredictionCard } from "@/components/PredictionCard";
import { Prediction } from "@/types/prediction";

const AllPredictions = ({ predictions }: { predictions: Prediction[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {predictions.map((prediction) => (
        <PredictionCard key={prediction.id} prediction={prediction} />
      ))}
    </div>
  );
};

export default AllPredictions;

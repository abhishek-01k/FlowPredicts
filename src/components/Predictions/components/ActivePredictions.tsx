import { PredictionCard } from "@/components/PredictionCard";
import { Prediction } from "@/types/prediction";

const ActivePredictions = ({ predictions }: { predictions: Prediction[] }) => {
  console.log("Acitve Predictions >>>", predictions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {predictions.map((prediction) => (
        <PredictionCard key={prediction.id} prediction={prediction} />
      ))}
    </div>
  );
};

export default ActivePredictions;

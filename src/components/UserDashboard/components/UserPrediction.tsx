import { PredictionCard } from "@/components/PredictionCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { Prediction } from "@/types/prediction";

const UserPrediction = () => {
  const { activePredictions, loadingPredictions } = useGlobalContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {!loadingPredictions &&
        (activePredictions as Prediction[])?.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
    </div>
  );
};

export default UserPrediction;

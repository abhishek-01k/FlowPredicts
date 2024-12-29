import { PredictionCard } from "@/components/PredictionCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { Prediction } from "@/types/prediction";

const UserPrediction = () => {
  const { activePredictions, loadingActivePredictions } = useGlobalContext();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {!loadingActivePredictions &&
        (activePredictions as Prediction[])?.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
    </div>
  );
};

export default UserPrediction;

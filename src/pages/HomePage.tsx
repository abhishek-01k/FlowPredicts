import { PredictionCard } from "@/components/PredictionCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { Prediction } from "@/types/prediction";

export function HomePage() {
  const { activePredictions, loadingActivePredictions } = useGlobalContext();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {!loadingActivePredictions &&
        (activePredictions as Prediction[])?.map((prediction: Prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
    </div>
  );
}

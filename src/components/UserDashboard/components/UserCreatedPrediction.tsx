import { Prediction } from "@/types/prediction";
import { CreatedPredictionCard } from "./CreatedPredictionCard";
import { useAccount, useReadContract } from "wagmi";
import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";

const UserCreatedPrediction = () => {
  const { address, isConnected } = useAccount();

  const {
    data: userCreatedPrediction,
    isLoading: loadingUserCreatedPrediction,
    refetch: refetchUserCreatedPrediction,
  } = useReadContract({
    abi: PREDICTION_MARKET_CONTRACT_ABI,
    address: PREDICTION_MARKET_CONTRACT_ADDRESS,
    functionName: "getUserCreatedPredictions",
    args: [address],
  });

  if (!isConnected || loadingUserCreatedPrediction) {
    return;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight text-start">
        Your Created Predictions:
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {loadingUserCreatedPrediction ? (
          <div>Loading....</div>
        ) : (
          <>
            {(userCreatedPrediction as Prediction[]).map((prediction) => (
              <CreatedPredictionCard
                key={prediction.id}
                prediction={prediction}
                refetchUserCreatedPrediction={refetchUserCreatedPrediction}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserCreatedPrediction;

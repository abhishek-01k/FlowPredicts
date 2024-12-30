import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import { Prediction } from "@/types/prediction";
import { useAccount, useReadContract } from "wagmi";
import { UserBetsCard } from "./UserBetsCard";

const UserPrediction = () => {
  const { address } = useAccount();

  const { data: userBets, isLoading: loadingUserBets } = useReadContract({
    abi: PREDICTION_MARKET_CONTRACT_ABI,
    address: PREDICTION_MARKET_CONTRACT_ADDRESS,
    functionName: "getUserBets",
    args: [address],
  });

  if (loadingUserBets) {
    return <div>Loading User Bets...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight text-start">
        Your Bets:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(userBets) &&
          (userBets[0] as Prediction[]).map((prediction: Prediction) => (
            <UserBetsCard key={prediction.id} prediction={prediction} />
          ))}
      </div>
    </div>
  );
};

export default UserPrediction;

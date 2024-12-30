import { useAccount, useReadContract } from "wagmi";
import UserDeposit from "./components/UserDeposit";
import UserPrediction from "./components/UserPrediction";
import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import UserCreatedPrediction from "./components/UserCreatedPrediction";
import UserBets from "./components/UserBets";

const UserDashboard = () => {
  const { address, isConnected } = useAccount();

  const { data: userBets, isLoading: loadingUserBets } = useReadContract({
    abi: PREDICTION_MARKET_CONTRACT_ABI,
    address: PREDICTION_MARKET_CONTRACT_ADDRESS,
    functionName: "getUserBets",
    args: [address],
  });

  console.log("User Bets", userBets, loadingUserBets);

  if (!isConnected || loadingUserBets) {
    return <div>Loading....</div>;
  }

  return (
    <div className="container mx-auto py-10 flex flex-col gap-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <UserDeposit />
      <UserPrediction />
      <UserCreatedPrediction />
      <UserBets />
    </div>
  );
};

export default UserDashboard;

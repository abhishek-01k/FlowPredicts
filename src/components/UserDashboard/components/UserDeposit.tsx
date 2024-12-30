import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingUp } from "lucide-react";
import { DepositDialog } from "./DepositDialog";
import { useAccount, useReadContract } from "wagmi";
import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import { USDC_NAME } from "@/config/USDCConfig";
import { formatAmount } from "@/helpers/format";
import { useGlobalContext } from "@/context/GlobalContext";
import { Prediction } from "@/types/prediction";
import Withdraw from "./Withdraw";

const UserDeposit = () => {
  const { activePredictions, allPredictions, loadingPredictions } =
    useGlobalContext();
  const { address, isConnected } = useAccount();

  const { data: userDepositAmount, isLoading: loadingUserDepositAmount } =
    useReadContract({
      abi: PREDICTION_MARKET_CONTRACT_ABI,
      address: PREDICTION_MARKET_CONTRACT_ADDRESS,
      functionName: "userBalances",
      args: [address],
    });

  console.log("userDepositAmount", userDepositAmount, loadingUserDepositAmount);

  const handleDeposit = () => {
    console.log("Deposit func called");
  };

  if (!isConnected || loadingUserDepositAmount || loadingPredictions) {
    return <div>Loading....</div>;
  }

  const totalNumberOfPredictions =
    (activePredictions as Prediction[]).length +
    (allPredictions as Prediction[]).length;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Deposit</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {Number(formatAmount(userDepositAmount as bigint)).toFixed(2)}{" "}
              {USDC_NAME}
            </div>
            <div className="flex gap-2">
              <DepositDialog onDeposit={handleDeposit} />
              <Withdraw
                amount={Number(formatAmount(userDepositAmount as bigint))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Predictions
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalNumberOfPredictions}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDeposit;

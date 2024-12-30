import { Clock, ThumbsDown, ThumbsUp, User } from "lucide-react";
import { formatAddress, formatAmount, formatDate } from "@/helpers/format";
import { PredictionCardProps } from "@/types/prediction";
import { USDC_NAME } from "@/config/USDCConfig";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { writeContract } from "wagmi/actions";
import { wagmiConfig } from "@/config/wagmiConfig";
import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import { toast } from "react-toastify";
import { Separator } from "@/components/ui/separator";
import { useAccount } from "wagmi";

type CreatedPredictionCardProps = {
  prediction: PredictionCardProps;
  refetchUserCreatedPrediction: () => void;
};

export function CreatedPredictionCard({
  prediction,
  refetchUserCreatedPrediction,
}: CreatedPredictionCardProps) {
  const { address } = useAccount();
  const totalAmount = prediction.totalYesAmount + prediction.totalNoAmount;
  const yesPercentage =
    totalAmount > 0n
      ? Number((prediction.totalYesAmount * 100n) / totalAmount)
      : 0;
  const noPercentage = 100 - yesPercentage;

  const [loading, setLoading] = useState(false);

  const handleResolvePrediction = async (betSide: boolean) => {
    try {
      setLoading(true);
      const predictionResolveTx = await writeContract(wagmiConfig, {
        abi: PREDICTION_MARKET_CONTRACT_ABI,
        address: PREDICTION_MARKET_CONTRACT_ADDRESS,
        functionName: "resolvePrediction",
        args: [prediction.id, betSide],
      });
      console.log("predictionResolveTx", predictionResolveTx);
      toast.success(`Prediction Resolved successfully`);
      refetchUserCreatedPrediction();
    } catch (error) {
      console.log("Error in resolving prediction", error);
      toast.error(`Error in resolving predictions`);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimWinnings = async () => {
    if (!address) return;

    try {
      setLoading(true);
      const predictionResolveTx = await writeContract(wagmiConfig, {
        abi: PREDICTION_MARKET_CONTRACT_ABI,
        address: PREDICTION_MARKET_CONTRACT_ADDRESS,
        functionName: "claimWinnings",
        args: [prediction.id],
      });
      console.log("predictionResolveTx", predictionResolveTx);
      toast.success("Winnings claimed successfully");
    } catch (error) {
      console.log("Error in claiming winnings", error);
      toast.error("Error in claiming winnings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative p-0">
        <img
          src={prediction.imageUri}
          alt={"Image"}
          className="w-full h-48 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="text-lg mb-2">
          <h3 className="text-xl font-semibold mb-4 text-card-foreground">
            {prediction.question}
          </h3>
        </CardTitle>
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-4 justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Created by {formatAddress(prediction.creator)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>
                Prediction Ends in: {formatDate(prediction.bettingEndTime)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>
                Resolution Ends by: {formatDate(prediction.resolutionTime)}
              </span>
            </div>
          </div>

          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-green-500"
              style={{ width: `${yesPercentage}%` }}
            />
            <div
              className="absolute right-0 top-0 h-full bg-red-600"
              style={{ width: `${noPercentage}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-green-600">
              Yes: {formatAmount(prediction.totalYesAmount)} {USDC_NAME} (
              {yesPercentage}%)
            </span>
            <span className="text-red-600">
              No: {formatAmount(prediction.totalNoAmount)} {USDC_NAME}(
              {noPercentage}%)
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Separator />
        {prediction.isResolved && (
          <>
            <div
              className={cn(
                "text-center py-2 rounded-lg font-medium w-full",
                prediction.outcome
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              Resolved: {prediction.outcome ? "Yes" : "No"}
            </div>

            <Button disabled={loading} onClick={handleClaimWinnings}>
              Claim Winnings
            </Button>
          </>
        )}

        <p className="text-xl text-muted-foreground text-left">Resolve Bets</p>

        {new Date() > new Date(Number(prediction.resolutionTime) * 1000) ? (
          <div className="flex flex-col w-full gap-2">
            <div className="flex space-x-4">
              <Button
                onClick={() => handleResolvePrediction(true)}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 py-2 rounded-lg transition-colors dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Yes</span>
              </Button>

              <Button
                onClick={() => handleResolvePrediction(false)}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg transition-colors dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>No</span>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-md text-muted-foreground text-left">
            Waiting for Bet to End...
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

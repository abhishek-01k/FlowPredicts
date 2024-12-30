import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import { USDC_NAME } from "@/config/USDCConfig";
import { wagmiConfig } from "@/config/wagmiConfig";
import { PredictionCardProps } from "@/types/prediction";
import { parseUnits } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/context/GlobalContext";

type PredictionPropsT = {
  prediction: PredictionCardProps;
};

export const DisplayVoteContainer = ({ prediction }: PredictionPropsT) => {
  const { address } = useAccount();
  const { refetchActivePredictions } = useGlobalContext();

  const [bettingAmount, setBettingAmount] = useState<number>(0);
  const [isplacingBet, setIsPlacingBet] = useState(false);

  const handleVote = async (betSide: boolean) => {
    if (!address) {
      toast.error("Connect your wallet ");
      return;
    }

    if (bettingAmount <= 0) {
      toast.error("Betting Amount too low");
      return;
    }

    setIsPlacingBet(true);

    try {
      const placeBetTx = await writeContract(wagmiConfig, {
        abi: PREDICTION_MARKET_CONTRACT_ABI,
        address: PREDICTION_MARKET_CONTRACT_ADDRESS,
        functionName: "placeBet",
        args: [
          Number(prediction.id),
          betSide,
          parseUnits(bettingAmount.toString(), 6),
          address,
        ],
      });

      console.log("placeBetTx", placeBetTx);
      toast.success("Bet Placed successfully");
      refetchActivePredictions();
    } catch (error) {
      console.log("Error in placing bets >>>", error);
      toast.error("Error in placing the bet");
      setIsPlacingBet(false);
    } finally {
      setIsPlacingBet(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-start flex-col gap-2">
        <Label
          htmlFor="bettingAmount"
          className="text-sm text-muted-foreground"
        >
          Enter Amount in {USDC_NAME}
        </Label>
        <Input
          id="bettingAmount"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter Amount"
          value={bettingAmount}
          onChange={(e) => {
            e.preventDefault();
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              setBettingAmount(value);
            }
          }}
        />
      </div>

      <div className="flex space-x-4">
        <Button
          disabled={isplacingBet}
          onClick={() => handleVote(true)}
          className="flex-1 flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 py-2 rounded-lg transition-colors dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Yes</span>
        </Button>

        <Button
          disabled={isplacingBet}
          onClick={() => handleVote(false)}
          className="flex-1 flex items-center justify-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg transition-colors dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>No</span>
        </Button>
      </div>
    </div>
  );
};

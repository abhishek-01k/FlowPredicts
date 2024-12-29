import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import {
  USDC_ABI,
  USDC_CONTRACT_ADDRESS,
  USDC_NAME,
} from "@/config/USDCConfig";
import { wagmiConfig } from "@/config/wagmiConfig";
import { PredictionCardProps } from "@/types/prediction";
import { parseUnits } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "wagmi/actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";

type PredictionPropsT = {
  prediction: PredictionCardProps;
};

export const DisplayVoteContainer = ({ prediction }: PredictionPropsT) => {
  const { address } = useAccount();
  console.log("Adress", address);

  const [bettingAmount, setBettingAmount] = useState<number>(0);

  const handleCheckAllowance = async () => {
    try {
      if (!address) return 0;

      const allowance = await readContract(wagmiConfig, {
        abi: USDC_ABI,
        address: USDC_CONTRACT_ADDRESS,
        functionName: "allowance",
        args: [address, PREDICTION_MARKET_CONTRACT_ADDRESS],
      });

      console.log("Allowance", allowance);
      return Number(allowance);
    } catch (error) {
      console.log("Error in getting allowance", error);
      return 0;
    }
  };

  const handleVote = async (betSide: boolean) => {
    if (!address) {
      toast.error("Connect your wallet ");
      return;
    }

    if (bettingAmount < 0) {
      toast.error("Betting Amount too low");
      return;
    }

    const allowance = await handleCheckAllowance();

    if (allowance < bettingAmount) {
      //TODO: Check the balance of the user and ask them to First Approve the token amount
      toast.error("Your deposit is low, please deposit money first");
    }

    try {
      // Place the bet
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
    } catch (error) {
      console.log("Error in placing bets >>>", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
          onClick={() => handleVote(true)}
          className="flex-1 flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 py-2 rounded-lg transition-colors dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Yes</span>
        </Button>

        <Button
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

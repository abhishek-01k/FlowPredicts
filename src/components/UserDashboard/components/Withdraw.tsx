import { Button } from "@/components/ui/button";
import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import { wagmiConfig } from "@/config/wagmiConfig";
import { parseUnits } from "ethers";
import { MinusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";

const Withdraw = ({ amount }: { amount: number }) => {
  console.log("Amount", amount);
  const { address } = useAccount();

  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!address) return;

    console.log("amount", amount, parseUnits(amount.toString(), 6));

    try {
      setLoading(true);
      const depositTx = await writeContract(wagmiConfig, {
        abi: PREDICTION_MARKET_CONTRACT_ABI,
        address: PREDICTION_MARKET_CONTRACT_ADDRESS,
        functionName: "withdraw",
        args: [parseUnits(amount.toString(), 6)],
      });

      console.log("depositTx", depositTx);
      toast.success("Transaction deposited successfully");
    } catch (error) {
      console.log("Error in withdrawing", error);
      toast.error("Error in withdrewing tokens");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleWithdraw}
        disabled={loading}
      >
        <MinusCircle className="mr-2 h-4 w-4" />
        Withdraw
      </Button>
    </div>
  );
};

export default Withdraw;

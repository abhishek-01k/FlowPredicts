"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { writeContract } from "wagmi/actions";
import { wagmiConfig } from "@/config/wagmiConfig";
import { USDC_ABI, USDC_CONTRACT_ADDRESS } from "@/config/USDCConfig";
import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import { parseUnits } from "ethers";
import { useAccount, useReadContract } from "wagmi";
import { formatAmount } from "@/helpers/format";
import { toast } from "react-toastify";

interface DepositDialogProps {
  onDeposit: (amount: number) => void;
  refetchUserBalance: () => void;
}

export function DepositDialog({
  onDeposit,
  refetchUserBalance,
}: DepositDialogProps) {
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { address } = useAccount();

  const {
    data: tokensApproved,
    isLoading: loadingTokenApprove,
    refetch: refetchTokenApproval,
  } = useReadContract({
    abi: USDC_ABI,
    address: USDC_CONTRACT_ADDRESS,
    functionName: "allowance",
    args: [address, PREDICTION_MARKET_CONTRACT_ADDRESS],
  });

  const handleApprove = async () => {
    try {
      if (!address) return 0;
      const depositAmount = parseFloat(amount);
      const approveTx = await writeContract(wagmiConfig, {
        abi: USDC_ABI,
        address: USDC_CONTRACT_ADDRESS,
        functionName: "approve",
        args: [
          PREDICTION_MARKET_CONTRACT_ADDRESS,
          parseUnits(depositAmount.toString(), 6),
        ],
      });
      console.log("Apprve Tx", approveTx);
      toast.success("Successfully approved");
      refetchTokenApproval();
      return true;
    } catch (error) {
      console.log("Error in approving token", error);
      toast.error("Error in approving tokens");
      return false;
    }
  };

  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      onDeposit(depositAmount);
      try {
        const depositTx = await writeContract(wagmiConfig, {
          abi: PREDICTION_MARKET_CONTRACT_ABI,
          address: PREDICTION_MARKET_CONTRACT_ADDRESS,
          functionName: "deposit",
          args: [parseUnits(depositAmount.toString(), 6)],
        });

        console.log("depositTx", depositTx);
        toast.success("Transaction deposited successfully");
        refetchUserBalance();
        setAmount("");
        setIsOpen(false);
      } catch (error) {
        console.log("Error in depositing ", error);
        toast.error("Error in depositing tokens");
      }
    }
  };

  if (loadingTokenApprove) {
    return <div>Loading Data...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>
            Enter the amount you want to deposit to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="amount" className="text-right">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleApprove}
            disabled={
              Number(formatAmount(tokensApproved as bigint)) > Number(amount)
            }
          >
            Approve
          </Button>
          <Button
            onClick={handleDeposit}
            disabled={
              Number(formatAmount(tokensApproved as bigint)) < Number(amount)
            }
          >
            Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

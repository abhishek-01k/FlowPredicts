// src/context/PredictionContext.tsx
import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useReadContract } from "wagmi";

type PredictionContextType = {
  predictions: never[];
  activePredictions: unknown;
  loadingActivePredictions: boolean;
  refetchActivePredictions: () => unknown;
  setPredictions: React.Dispatch<React.SetStateAction<never[]>>;
} | null;

const PredictionContext = createContext<PredictionContextType>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [predictions, setPredictions] = useState([]);

  const {
    data: activePredictions,
    isLoading: loadingActivePredictions,
    refetch: refetchActivePredictions,
  } = useReadContract({
    abi: PREDICTION_MARKET_CONTRACT_ABI,
    address: PREDICTION_MARKET_CONTRACT_ADDRESS,
    functionName: "getActivePredictions",
  });

  console.log("activePredictions", activePredictions);

  return (
    <PredictionContext.Provider
      value={{
        predictions,
        setPredictions,
        activePredictions,
        loadingActivePredictions,
        refetchActivePredictions,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(PredictionContext);
};

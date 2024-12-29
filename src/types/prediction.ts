export interface Prediction {
  id: bigint;
  question: string;
  imageUri: string;
  creator: string;
  bettingEndTime: bigint;
  resolutionTime: bigint;
  isResolved: boolean;
  outcome: boolean;
  totalYesAmount: bigint;
  totalNoAmount: bigint;
}

export interface PredictionCardProps extends Prediction {
  // onVote: (vote: boolean) => void;
  className?: unknown;
}

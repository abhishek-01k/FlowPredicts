import { Clock, User } from "lucide-react";
import { cn } from "../lib/utils";
import { formatAddress, formatAmount, formatDate } from "@/helpers/format";
import { PredictionCardProps } from "@/types/prediction";
import { USDC_NAME } from "@/config/USDCConfig";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DisplayVoteContainer } from "./DisplayVoteContainer";

type PredictionPropsT = {
  prediction: PredictionCardProps;
};

export function PredictionCard({ prediction }: PredictionPropsT) {
  const totalAmount = prediction.totalYesAmount + prediction.totalNoAmount;
  const yesPercentage =
    totalAmount > 0n
      ? Number((prediction.totalYesAmount * 100n) / totalAmount)
      : 0;
  const noPercentage = 100 - yesPercentage;

  const [showVoteContainer, setShowVoteContainer] = useState(false);

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
      <CardFooter className="flex flex-col items-start">
        {!prediction.isResolved && (
          <>
            {showVoteContainer ? (
              <DisplayVoteContainer prediction={prediction} />
            ) : (
              <Button
                className="w-full"
                onClick={() => setShowVoteContainer(true)}
              >
                Vote
              </Button>
            )}
          </>
        )}

        {prediction.isResolved && (
          <div
            className={cn(
              "text-center py-2 rounded-lg font-medium",
              prediction.outcome
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}
          >
            Resolved: {prediction.outcome ? "Yes" : "No"}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

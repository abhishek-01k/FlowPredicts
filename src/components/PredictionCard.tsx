import { Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "../lib/utils";

interface PredictionCardProps {
  question: string;
  imageUrl: string;
  yesVotes: number;
  noVotes: number;
  endDate: Date;
  onVote: (vote: boolean) => void;
  className?: string;
}

export function PredictionCard({
  question,
  imageUrl,
  yesVotes,
  noVotes,
  endDate,
  onVote,
  className,
}: PredictionCardProps) {
  return (
    <div
      className={cn("bg-white rounded-xl shadow-lg overflow-hidden", className)}
    >
      <img src={imageUrl} alt={question} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{question}</h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              Ends {endDate.toLocaleDateString()}
            </span>
          </div>

          <div className="flex space-x-4">
            <span className="text-green-600">{yesVotes} Yes</span>
            <span className="text-red-600">{noVotes} No</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => onVote(true)}
            className="flex-1 flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 py-2 rounded-lg transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Yes</span>
          </button>

          <button
            onClick={() => onVote(false)}
            className="flex-1 flex items-center justify-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg transition-colors"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
}

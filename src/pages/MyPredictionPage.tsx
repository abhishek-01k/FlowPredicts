import { PredictionCard } from "../components/PredictionCard";

export function MyPredictionsPage() {
  const myPredictions = [
    // Sample data - replace with actual data from blockchain
    {
      id: 1,
      question: "Will ETH 2.0 launch successfully in Q2 2024?",
      imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05",
      yesVotes: 200,
      noVotes: 50,
      endDate: new Date("2024-06-30"),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Predictions</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myPredictions.map((prediction) => (
          <PredictionCard
            key={prediction.id}
            question={prediction.question}
            imageUrl={prediction.imageUrl}
            yesVotes={prediction.yesVotes}
            noVotes={prediction.noVotes}
            endDate={prediction.endDate}
            onVote={(vote) => console.log("Voted:", vote)}
          />
        ))}
      </div>
    </div>
  );
}

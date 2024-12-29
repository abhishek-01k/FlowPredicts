import { PredictionCard } from "@/components/PredictionCard";

export function HomePage() {
  const predictions = [
    {
      id: 1,
      question: "Will Bitcoin reach $100,000 by the end of 2024?",
      imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
      yesVotes: 150,
      noVotes: 75,
      endDate: new Date("2024-12-31"),
    },
    // Add more sample predictions as needed
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {predictions.map((prediction) => (
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
  );
}

import { PredictionCard } from "@/components/PredictionCard";
import { useGlobalContext } from "@/context/GlobalContext";

const UserPrediction = () => {
  const { activePredictions, loadingActivePredictions } = useGlobalContext();

  const predictionBets = [
    {
      bettingEndTime: 1735496311n,
      creator: "0x9452BCAf507CD6547574b78B810a723d8868C85a",
      id: 0n,
      imageUri: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
      isResolved: false,
      outcome: false,
      question: "Will Ethereum price exceed $2,000 by next month?",
      resolutionTime: 1735669111n,
      totalNoAmount: 0n,
      totalYesAmount: 200000n,
    },
    // {
    //   bettingEndTime: 1735496311n,
    //   creator: "0x9452BCAf507CD6547574b78B810a723d8868C85a",
    //   id: 0n,
    //   imageUri: "https://example.com/eth_prediction.jpg",
    //   isResolved: false,
    //   outcome: false,
    //   question: "Will Ethereum price exceed $2,000 by next month?",
    //   resolutionTime: 1735669111n,
    //   totalNoAmount: 0n,
    //   totalYesAmount: 200000n,
    // },
    // {
    //   bettingEndTime: 1735496311n,
    //   creator: "0x9452BCAf507CD6547574b78B810a723d8868C85a",
    //   id: 0n,
    //   imageUri: "https://example.com/eth_prediction.jpg",
    //   isResolved: false,
    //   outcome: false,
    //   question: "Will Ethereum price exceed $2,000 by next month?",
    //   resolutionTime: 1735669111n,
    //   totalNoAmount: 0n,
    //   totalYesAmount: 200000n,
    // },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {!loadingActivePredictions &&
        predictionBets.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
    </div>
  );
};

export default UserPrediction;

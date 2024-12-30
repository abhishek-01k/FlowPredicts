import { useAccount } from "wagmi";
import UserDeposit from "./components/UserDeposit";
import UserPrediction from "./components/UserPrediction";
import UserCreatedPrediction from "./components/UserCreatedPrediction";

const UserDashboard = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <div>Loading....</div>;
  }

  return (
    <div className="container mx-auto py-10 flex flex-col gap-8">
      <h1 className="text-5xl font-bold tracking-tight">DASHBOARD</h1>
      <UserDeposit />
      <UserPrediction />
      <UserCreatedPrediction />
    </div>
  );
};

export default UserDashboard;

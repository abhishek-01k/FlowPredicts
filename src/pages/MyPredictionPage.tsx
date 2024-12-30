import UserDashboard from "@/components/UserDashboard/UserDashboard";
import { useAccount } from "wagmi";

export function MyPredictionsPage() {
  const { isConnected } = useAccount();
  if (!isConnected) return;
  return <UserDashboard />;
}

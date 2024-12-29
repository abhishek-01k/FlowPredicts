import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { useWallets } from "@privy-io/react-auth";
import { truncateAddress } from "@/helpers";

const WalletConnect = () => {
  const { ready, authenticated, login, logout } = usePrivy();

  console.log("Ready", ready, authenticated);

  const { wallets } = useWallets();
  console.log("wallets", wallets);
  const { address } = useAccount();
  console.log("Address", address);

  return (
    <div className="flex gap-2">
      {authenticated ? (
        <div className="flex gap-2">
          {/* <UserProfile /> */}
          <p>{truncateAddress(address!)}</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  );
};

export default WalletConnect;

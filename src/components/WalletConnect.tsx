import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useAccount, useDisconnect } from "wagmi";
import { truncateAddress } from "@/helpers";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/constants/appRoute";

const WalletConnect = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { disconnect } = useDisconnect();

  console.log("Ready", ready, authenticated);

  const { address } = useAccount();
  console.log("Address", address);

  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      {authenticated ? (
        <div className="flex gap-2">
          <p>{truncateAddress(address!)}</p>
          <Button
            onClick={() => {
              disconnect();
              logout();
              navigate(APP_ROUTES.HOME);
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  );
};

export default WalletConnect;

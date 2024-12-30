import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useAccount, useDisconnect } from "wagmi";
import { truncateAddress } from "@/helpers";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/constants/appRoute";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy } from "lucide-react";

const WalletConnect = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { disconnect } = useDisconnect();

  console.log("Ready", ready, authenticated);

  const { address } = useAccount();
  console.log("Address", address);

  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    logout();
    navigate(APP_ROUTES.HOME);
  };

  return (
    <>
      {authenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User</p>
                <div className="flex gap-2">
                  <p className="text-xs leading-none text-muted-foreground">
                    {truncateAddress(address!)}
                  </p>
                  <Copy
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(address!);
                    }}
                  />
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDisconnect}
              className="cursor-pointer"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </>
  );
};

export default WalletConnect;

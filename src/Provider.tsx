import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "@privy-io/wagmi";
import { wagmiConfig } from "./config/wagmiConfig";
import { flowTestnet, flowMainnet } from "viem/chains";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_TEMPLATE_PRIVY_CLIENT_ID}
      config={{
        loginMethods: ["email", "wallet"],
        defaultChain: flowTestnet,
        supportedChains: [flowTestnet, flowMainnet],
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default Provider;

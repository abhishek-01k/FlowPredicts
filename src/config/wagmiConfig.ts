import { flowTestnet, flowMainnet } from "viem/chains";
import { createConfig, http } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [flowTestnet, flowMainnet],
  transports: {
    [flowTestnet.id]: http(),
    [flowMainnet.id]: http(),
  },
});

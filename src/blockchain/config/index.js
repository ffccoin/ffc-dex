import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = "53fc8781d94a11d4ef70a2d11918f99f";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://www.forcefinancecoin.com/", // origin must match your domain & subdomain
  icons: ["https://www.forcefinancecoin.com/logos/header-logo.svg"],
};
 

// Create wagmiConfig
export const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet, bsc], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});

import "./globals.css";
import PreloaderProvider from "./PreloaderProvider";
import { Web3Modal } from "@/context/Web3Modal";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Dex Force Finance | Trade Swap and Earn",
  description:
    "Decentralized Exchange built with trust and confidence. Join us in the realm of cryptocurrencies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Web3Modal> 
            <PreloaderProvider>{children}</PreloaderProvider>
          </Web3Modal>
        </StoreProvider>
      </body>
    </html>
  );
}

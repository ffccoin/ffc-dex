import "./globals.css";
import PreloaderProvider from "./PreloaderProvider";
import { Web3Modal } from "@/context/Web3Modal";
import StoreProvider from "./StoreProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Dex Force Finance | Trade Swap and Earn",
  description:
    "Decentralized Exchange built with trust and confidence. Join us in the realm of cryptocurrencies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen items-center justify-center">
          <h1 className="text-4xl font-bold">Error 404</h1>
          <p className="text-xl">Contact Administrator</p>
        </div>
        {/* <StoreProvider>
          <Web3Modal>
            <PreloaderProvider>
              {children}
            </PreloaderProvider>
          </Web3Modal>
        </StoreProvider> */}
      </body>
    </html>
  );
}

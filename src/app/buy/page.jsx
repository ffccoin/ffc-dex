"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

const MoonPayProvider = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayProvider),
  { ssr: false }
);
const BuyPage = () => {
  const [moonPayShow, setMoonPayShow] = useState(false);
  return (
    <MoonPayProvider
      apiKey="pk_test_1DAreczJSLoDwdRqi0kW6dr0FJy2TY4"
      environment="sandbox"
      debug
    >
      <div className="overflow-hidden h-full flex items-center justify-center px-4 relative">
        <LinkedParticlesAnimation />
        <div className="bg-gray22/50 z-50 py-4 sm:px-2 px-4 rounded-2xl flex flex-col items-center justify-center w-full max-w-[512px] max-h-[500px] h-full mx-4">
          <div className="flex flex-col gap-y-3 w-full h-full px-4">
            <h1 className="text-3xl">Buy</h1>
            <button
              className="bg-primary1 text-black px-3 py-2 rounded-full"
              onClick={() => setMoonPayShow(true)}
            >
              Buy with Moonpay
            </button>
            <button className="bg-primary1 text-black px-3 py-2 rounded-full">
              Buy with Transak
            </button>
          </div>
        </div>

        <MoonPayBuyWidget
          variant="overlay"
          baseCurrencyCode="usd"
          baseCurrencyAmount="100"
          defaultCurrencyCode="eth"
          onLogin={() => console.log("Customer logged in!")}
          visible={moonPayShow}
        />
      </div>
    </MoonPayProvider>
  );
};

export default BuyPage;

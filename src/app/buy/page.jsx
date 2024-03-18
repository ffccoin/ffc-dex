"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Transak } from "@transak/transak-sdk";
import HomeHeader from "@/components/headers/HomeHeader";
import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);
const MoonPayProvider = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayProvider),
  { ssr: false }
);

const transakConfig = {
  apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY,
  environment: "STAGING", // STAGING/PRODUCTION
  defaultCryptoCurrency: "ETH",
  themeColor: "232325", // App theme color
  widgetHeight: "600px",
  widgetWidth: "500px",
};

function openTransak() {
  const transak = new Transak(transakConfig);
  transak.init();

  Transak.on("*", (data) => {
    console.log(data);
  });
  Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
    console.log("Transak SDK closed!");
    transak.close();
  });
  // This will trigger when the user marks payment is made.
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    window.alert("Payment Success");
    transak.close();
  });
}

const BuyPage = () => {
  const [moonPayShow, setMoonPayShow] = useState(false);
  return (
    <MoonPayProvider
      apiKey={process.env.NEXT_PUBLIC_MOONPAY_API_KEY}
      environment="sandbox"
      debug
    >
      <div className="overflow-hidden h-full flex items-center justify-center px-4 relative">
        <LinkedParticlesAnimation />
        <div className="bg-gray22/50 z-50 py-4 sm:px-2 px-4 rounded-2xl flex flex-col items-center justify-center w-full max-w-[512px] max-h-[500px] h-full mx-4">
        <HomeHeader noSettings />

          <div className="flex flex-col gap-y-3 w-full h-full px-4">
            <button
              className="bg-primary1 text-black px-3 py-2 rounded-full"
              onClick={() => setMoonPayShow(true)}
            >
              Buy with Moonpay
            </button>
            <button
              className="bg-primary1 text-black px-3 py-2 rounded-full"
              onClick={() => openTransak()}
            >
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

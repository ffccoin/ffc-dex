"use client";

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import HomeHeader from "@/components/headers/HomeHeader";
import Swap from "@/components/home/swap/Swap";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useState } from "react";
import BlockComponent from "./block";

export default function Home() {
  const { selectedNetworkId } = useWeb3ModalState();
  const [selectedSlippage, setSelectedSlippage] = useState(0.5);

  let apiUrl = `https://api.0x.org/swap/v1/price`;
  if (selectedNetworkId === 84531) {
    apiUrl = `https://base.api.0x.org/swap/v1/price`;
  } else if (selectedNetworkId === 56) {
    apiUrl = `https://bsc.api.0x.org/swap/v1/price`;
  }

  return (
    <main className="overflow-hidden h-screen flex items-center justify-center px-4 relative">
      <LinkedParticlesAnimation />
      {/* <BlockComponent/> */}
      <div className="bg-gray22/50 z-50 py-4 sm:px-2 rounded-2xl flex flex-col items-center justify-center w-fit">
        <HomeHeader
          selectedSlippage={selectedSlippage}
          setSelectedSlippage={setSelectedSlippage}
        />
        <Swap
          slippage={selectedSlippage}
          networkId={selectedNetworkId}
          apiUrl={apiUrl}
        />
      </div>
    </main>
  );
}

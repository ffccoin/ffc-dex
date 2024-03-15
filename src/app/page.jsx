"use client";

import HomeHeader from "@/components/headers/HomeHeader";
import Swap from "@/components/home/swap/Swap";
import SettingsModal from "@/components/models/SettingsModal";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useState } from "react";

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
    <main className="overflow-hidden h-full flex flex-col items-center justify-center">
      <HomeHeader
        selectedSlippage={selectedSlippage}
        setSelectedSlippage={setSelectedSlippage}
      />
      <Swap
        slippage={selectedSlippage}
        networkId={selectedNetworkId}
        apiUrl={apiUrl}
      />
    </main>
  );
}

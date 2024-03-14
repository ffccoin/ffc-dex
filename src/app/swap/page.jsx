"use client";

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
    <main className="overflow-hidden h-full">
      <div className="flex flex-row w-full px-2 justify-between">
        <div className="flex items-center gap-x-2">
          <button className="font-apfel-grotezk font-light bg-primary1 text-black px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
            Swap
          </button>
          <button className="font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
            Limit
          </button>
          <button className="font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
            Send
          </button>
          <button className="font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
            Buy
          </button>
        </div>
        <SettingsModal
          selectedSlippage={selectedSlippage}
          setSelectedSlippage={setSelectedSlippage}
        />
      </div>
      <Swap
        slippage={selectedSlippage}
        networkId={selectedNetworkId}
        apiUrl={apiUrl}
      />
    </main>
  );
}

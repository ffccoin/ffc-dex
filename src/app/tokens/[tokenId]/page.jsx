"use client";
import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import HomeHeader from "@/components/headers/HomeHeader";
import React from "react";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swap from "@/components/home/swap/Swap";
import TokenDetailsPage from "@/components/tokens/TokenDetailsPage";
import { tokenList1 } from "@/lists/tokenList1";

const TokensDetailPage = ({ params }) => {
  const selectedToken = params.tokenId;
  const token = tokenList1.find((token) => token.address === selectedToken);
  console.log("token", token);
  console.log("token id", selectedToken);
  const [selectedSlippage, setSelectedSlippage] = useState(0.5);
  const { selectedNetworkId } = useWeb3ModalState();
  let apiUrl = `https://api.0x.org/swap/v1/price`;
  if (selectedNetworkId === 56) {
    apiUrl = `https://bsc.api.0x.org/swap/v1/price`;
  }
  const { name } = useSelector((state) => state.coin);
  console.log("coin :", name);
  return (
    <main className="relative w-full min-h-screen pt-24">
      <LinkedParticlesAnimation />
      <div className="flex w-full flex-col items-center lg:flex-row px-5 gap-5">
        <TokenDetailsPage tokenId={selectedToken} />
        <div className="bg-gray22/50 rounded-2xl flex flex-col px-4 py-5 w-full z-50 max-w-fit">
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
      </div>
    </main>
  );
};

export default TokensDetailPage;

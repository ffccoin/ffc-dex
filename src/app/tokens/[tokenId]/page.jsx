"use client";
import LimitGraph from "@/components/home/limit/LimitGraph";
import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import HomeHeader from "@/components/headers/HomeHeader";
import React from "react";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LimitOrders from "@/components/home/limit/LimitOrders";
import Swap from "@/components/home/swap/Swap";
import TokenDetailsPage from "@/components/tokens/TokenDetailsPage";

const TokensDetailPage = ({ params }) => {
  const selectedToken = params.tokenId;
  console.log("token id", selectedToken)
  const [selectedSlippage, setSelectedSlippage] = useState(0.5);
  const { selectedNetworkId } = useWeb3ModalState();
  let apiUrl = `https://api.0x.org/swap/v1/price`;
  if (selectedNetworkId === 84531) {
    apiUrl = `https://base.api.0x.org/swap/v1/price`;
  } else if (selectedNetworkId === 56) {
    apiUrl = `https://bsc.api.0x.org/swap/v1/price`;
  }

  const tokenList = "";
  const { name } = useSelector((state) => state.coin);
  console.log("coin :", name);
  return (
    <main className="overflow-hidden h-auto flex  justify-center  relative">
      <div className="overflow-y-auto h-full overflow-x-hidden flex flex-col items-center w-full justify-center mb-10">
        <LinkedParticlesAnimation />
        <div className="flex lg:flex-row justify-between lg:pl-4 h-full   lg:items-center lg:mt-32 flex-col-reverse gap-y-10 mt-[85rem] max-w-[88rem]">
          <div className="lg:w-[59vw] h-full w-[97vw] lg:mt-40 ">
            {/* <LimitGraph tokenOne={tokenOne} tokenTwo={tokenTwo} /> */}
            {/* <LimitOrders /> */}
            <TokenDetailsPage coin={name} />
          </div>
          <div className=" lg:w-[40vw] flex lg:mt-40 justify-center w-[97vw] h-screen">
            <div className="bg-gray22/50 z-50 py-4 sm:px-2 px-4 rounded-2xl flex flex-col items-center justify-center w-full max-w-[512px] max-h-[500px] h-full mx-4">
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
        </div>
      </div>
    </main>
  );
};

export default TokensDetailPage;

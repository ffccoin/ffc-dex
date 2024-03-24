"use client";
import LimitGraph from "@/components/home/limit/LimitGraph";
import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import HomeHeader from "@/components/headers/HomeHeader";
import React from "react";
import Limit from "@/components/home/limit/Limit";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useState } from "react";
import { SignMessage } from "@/components/home/limit/test";

const LimitPage = () => {
  const [tokenOne, setTokenOne] = useState(null);
  const [tokenTwo, setTokenTwo] = useState(null);
  const { selectedNetworkId } = useWeb3ModalState();
  let apiUrl = `https://api.0x.org/swap/v1/price`;
  if (selectedNetworkId === 84531) {
    apiUrl = `https://base.api.0x.org/swap/v1/price`;
  } else if (selectedNetworkId === 56) {
    apiUrl = `https://bsc.api.0x.org/swap/v1/price`;
  }
  return (
    <div className="overflow-hidden h-full flex flex-col items-center justify-center mt-20">
      <LinkedParticlesAnimation />
      <div className="flex ">
      <LimitGraph tokenOne={tokenOne} tokenTwo={tokenTwo}/>
      <div className="overflow-hidden h-full flex items-center justify-center px-4 relative">
        <div className="bg-gray22/50 z-50 py-4 sm:px-2 px-4 rounded-2xl flex flex-col items-center justify-center w-full max-w-[512px] max-h-[500px] h-full mx-4">
          <HomeHeader noSettings />
          {/* <SignMessage/> */}
          <Limit networkId={selectedNetworkId} tokenOne={tokenOne} tokenTwo={tokenTwo}apiUrl={apiUrl}  setTokenOne={setTokenOne} setTokenTwo={setTokenTwo}/>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default LimitPage;

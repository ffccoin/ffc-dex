"use client";
import LimitGraph from "@/components/home/limit/LimitGraph";
import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import HomeHeader from "@/components/headers/HomeHeader";
import React from "react";
import Limit from "@/components/home/limit/Limit";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useState } from "react";
import { SignMessage } from "@/components/home/limit/test";
import { useSelector } from "react-redux";

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
  const order = useSelector((state) => state.order);
  console.log("Redux", order);
  return (
    <div className="overflow-hidden h-full flex flex-col items-center w-full lg:mt-44">
      <LinkedParticlesAnimation />
      <div className="flex lg:flex-row justify-between  pl-4 flex-col-reverse gap-y-10 max-w-[88rem]">
      <div className="  lg:w-[59vw]">
        <LimitGraph tokenOne={tokenOne} tokenTwo={tokenTwo} />
        </div>
        <div className="overflow-hidden lg:w-[40vw] h-full flex items-center  justify-center relative">
          <div className="bg-gray22/50 z-50 py-4 sm:px-2 px-4 rounded-2xl flex flex-col items-center justify-center w-full max-w-[512px] max-h-[500px] h-full mx-4">
            <HomeHeader noSettings />
            <Limit
              networkId={selectedNetworkId}
              tokenOne={tokenOne}
              tokenTwo={tokenTwo}
              apiUrl={apiUrl}
              setTokenOne={setTokenOne}
              setTokenTwo={setTokenTwo}
            />
          </div>
        </div>
      </div>
      </div>
  );
};

export default LimitPage;

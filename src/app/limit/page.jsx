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
import { LimitOrder } from "@1inch/limit-order-sdk";
import LimitOrders from "@/components/home/limit/LimitOrders";

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
  return (
    <div className="flex w-full max-w-[87rem] flex-col-reverse lg:flex-row items-center lg:items-start gap-y-10">
      <div className="w-full flex flex-col gap-10">
        <LimitGraph tokenOne={tokenOne} tokenTwo={tokenTwo} />
        <LimitOrders />
      </div>
      <div className="bg-gray22/50 z-50 py-4 lg:px-2 rounded-2xl flex flex-col items-center justify-center w-full max-w-[450px] max-h-[500px] h-full mx-4">
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
  );
};

export default LimitPage;

"use client";

import React from "react";
import { web3ModalCreate } from "@/context/Web3Modal";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Web3ModalButton() {
  const { open, close } = useWeb3Modal(web3ModalCreate);
  const [networkIcon, setNetworkIcon] = useState("/header/ethereum.svg");
  const { open1, selectedNetworkId } = useWeb3ModalState();
  useEffect(() => {
    // Set the network icon based on the selected network ID
    if (selectedNetworkId === 1) {
      setNetworkIcon("/header/ethereum.svg");
    } else if (selectedNetworkId === 84531) {
      setNetworkIcon("/header/goerli.svg");
    }else{
        setNetworkIcon("/header/goerli.svg");
  }}, [selectedNetworkId]);
  const openNetworksView = () => {
    open({
      view: "Networks",
    });
  };

  return (
    <div>
      {/* Button to open networks view */}
      <button onClick={openNetworksView}>
        <Image src={networkIcon} width={20} height={20} alt="logo" />
      </button>
    </div>
  );
}

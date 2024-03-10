import React, { useState, useEffect } from "react";
import { web3ModalCreate } from "@/context/Web3Modal";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export default function Web3ModalButton() {
  const { open, close } = useWeb3Modal(web3ModalCreate);
  const [networkIcon, setNetworkIcon] = useState("/header/ethereum.svg");
  const { open1, selectedNetworkId } = useWeb3ModalState();
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address }); // Fetches the ENS name for the connected address



  // Render connected state or connect button
  if (isConnected && address) {
    return (
      <div>
        {/* Display ENS name if available, otherwise display the address */}
        <div>{ensName || address}</div>
        <div>Connected to {connector?.name}</div>
      </div>
    );
  } else {
    return (
      <button >
        Connect Wallet
      </button>
    );
  }
}

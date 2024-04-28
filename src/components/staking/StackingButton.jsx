import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function StackingButton({ isConnected }) {
  const { open } = useWeb3Modal();

  return (
    <div className="mt-4">
      {isConnected ? (
        <button className="w-full  rounded-full bg-gray22 text-neutralLight  py-3">
          Stake
        </button>
      ) : (
        <button
          onClick={() => open({ view: "Connect" })}
          className="w-full    bg-primary1 text-black rounded-full py-3"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

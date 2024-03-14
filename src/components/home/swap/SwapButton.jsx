"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ThreeDots } from "react-loader-spinner";
import { useAccount } from "wagmi";

const SwapButton = ({ tokenOneAmount, isLoading, swapTokens, buttonLabel }) => {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  return (
    <div className="w-full mt-4">
      {isConnected ? (
        <button
          className={`w-full  rounded-full ${
            tokenOneAmount === null || tokenOneAmount === 0 || !tokenOneAmount
              ? "bg-gray23 text-neutralLight"
              : "bg-primary1 text-black"
          }
              ${!isLoading && "py-3"}
              `}
          onClick={() => swapTokens()}
        >
          {isLoading ? (
            <div className="flex w-full justify-center items-center">
              <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="#000000"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            buttonLabel
          )}
        </button>
      ) : (
        <button
          onClick={() => open({ view: "Connect" })}
          className="w-full bg-primary1 text-black rounded-full py-3"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default SwapButton;

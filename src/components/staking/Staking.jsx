"use client";

import StackingButton from "./StackingButton";

import { useAccount } from "wagmi";
import Image from "next/image";
import { useState } from "react";
import Slipage from "./Slipage";
import Detail from "./Detail";
import Power from "./Power";
export default function Staking() {
  const [selectedOption, setSelectedOption] = useState("25%");
  const [Amount, setAmount] = useState(null);
  async function changeAmount(e) {
    setAmount(e.target.value);
  }
  const { isConnected } = useAccount();
  const [isSelected, setIsSelected] = useState("Stake");
  function handleClick(value) {
    setIsSelected(value);
  }
  return (
    <div
      className={`h-fit bg-gray22/50  ${
        isConnected ? "md:mt-10" : "md:-mt-14"
      } px-4  py-3 rounded-2xl max-w-[28rem]`}
    >
      <div className=" flex ml-1 justify-start gap-7 font-medium w-full">
        <button
          className={`${
            isSelected === "Stake" ? "text-gray12 " : "text-white"
          }`}
          onClick={() => handleClick("Stake")}
        >
          Stake
        </button>
        <button
          className={`${
            isSelected === "UnStake" ? "text-gray12 " : "text-white"
          }`}
          onClick={() => handleClick("UnStake")}
        >
          Unstake
        </button>
      </div>
      <div className="w-fit border mt-3 border-gray22  bg-gray22/75 rounded-2xl focus-within:bg-gray24   px-3 py-2 flex flex-col justify-between gap-y-1">
        <div className="flex">
          <div className="flex flex-col justify-start">
            <p className="text-sm  text-gray12">Amount</p>
            <div className="flex gap-2 mt-1">
              <Image src={"/header/logo-mobile.svg"} width={24} height={24} />
              <p className="text-xl font-semibold">FFC</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {isConnected && (
              <span className="self-end text-xs text-gray12">
                {isSelected === "Stake" ? "Balance: 0" : "Staked: 0"}
              </span>
            )}
            <input
              placeholder="0"
              onChange={changeAmount}
              value={Amount}
              className={`w-[82%] ${
                isConnected ? "mt-0" : "mt-3"
              }  text-[34px] caret-gray12 text-right  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none `}
            />
          </div>
        </div>

        <div className="flex  justify-between items-center">
          <p className="text-sm  text-gray12">FFC Token</p>
          <p className="text-xs  text-gray12">~$0.00</p>
        </div>
        {isConnected && isSelected === "Stake" && (
          <Slipage
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        )}
      </div>
      {isConnected && <Power />}
      {isConnected && <Detail isSelected={isSelected} />}

      <StackingButton isConnected={isConnected} />
    </div>
  );
}

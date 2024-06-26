"use client";

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const BridgePage = () => {
  const [amount, setAmount] = useState(null);
  const [transferFrom, setTransferFrom] = useState(0);
  const [transferFromDropdown, setTransferFromDropdown] = useState(false);
  const [transferTo, setTransferTo] = useState(1);
  const [transferToDropdown, setTransferToDropdown] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState("25%");

  const chainOptions = [
    { id: 0, name: "Ethereum", img: "/chains/ethereum.svg" },
    { id: 1, name: "Polygon POS", img: "/chains/polygon.svg" },
    { id: 2, name: "BNB Smart Chain", img: "/chains/bnb.svg" },
  ];

  const handleSwitch = () => {
    setTransferTo(transferFrom);
    setTransferFrom(transferTo);
  };

  const selectChain = (setTransfer, chainId) => {
    setTransfer(chainId);
    setTransferFromDropdown(false);
    setTransferToDropdown(false);
  };

  return (
    <div className="bg-gray22/50 z-50 py-5 px-4 rounded-2xl flex flex-col gap-y-1 items-center justify-center w-full max-w-[512px] mx-4">
      <div className="flex justify-between w-full px-1 pb-3">
        <div className="text-2xl font-bold">Bridge</div>
        <Link
          href="/transactions"
          className="bg-primary1/90 text-black text-sm hover:bg-primary1 px-5 py-2 rounded-full"
        >
          All Transactions
        </Link>
      </div>
      <div className="grid grid-cols-2 bg-gray22/75 w-full rounded-2xl">
        <div className="flex flex-col gap-1 px-4 py-5">
          <span className="text-sm font-semibold">Transfer from:</span>
          <input
            placeholder="0"
            className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
          />
          <span>Balance: 0.0</span>
        </div>
        <div className="flex flex-col justify-center items-end px-4 py-5 gap-3">
          <div className="flex items-center gap-1">
            <button
              className={`rounded-full text-[10px] px-3 py-0.5 border ${
                selectedPercentage === "25%"
                  ? "border-primary1"
                  : "border-gray20"
              }`}
              onClick={() => setSelectedPercentage("25%")}
            >
              25%
            </button>
            <button
              className={`rounded-full text-[10px] px-3 py-0.5 border ${
                selectedPercentage === "50%"
                  ? "border-primary1"
                  : "border-gray20"
              }`}
              onClick={() => setSelectedPercentage("50%")}
            >
              50%
            </button>
            <button
              className={`rounded-full text-[10px] px-3 py-0.5 border ${
                selectedPercentage === "MAX"
                  ? "border-primary1"
                  : "border-gray20"
              }`}
              onClick={() => setSelectedPercentage("MAX")}
            >
              MAX
            </button>
          </div>
          <div className="flex gap-2 items-center px-2 font-medium text-sm">
            <Image src="/logos/logo.svg" width={18} height={18} alt="FFC" />
            $FFC
          </div>
          <div className="relative">
            <button
              className="bg-primary1/90 text-black text-sm hover:bg-primary1 pl-2 pr-3 py-2 rounded-full flex items-center"
              onClick={() => setTransferFromDropdown(!transferFromDropdown)}
            >
              <div className="rounded-full p-1 w-5 h-5 bg-white mr-2 flex items-center justify-center">
                <Image
                  src={chainOptions[transferFrom].img}
                  width={transferFrom === 0 ? 8 : 14}
                  height={transferFrom === 0 ? 8 : 14}
                  alt={chainOptions[transferFrom].name}
                />
              </div>
              {chainOptions[transferFrom].name} {chevronDown}
            </button>
            {transferFromDropdown && (
              <div className="absolute top-12 py-3 px-1 bg-gray23 w-40 right-0 rounded-2xl flex flex-col z-50">
                {chainOptions.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => selectChain(setTransferFrom, chain.id)}
                    className="flex items-center gap-2 text-xs py-2 hover:bg-gray24 rounded-xl px-2"
                  >
                    <div className="rounded-full p-1 w-5 h-5 bg-white flex items-center justify-center">
                      <Image
                        src={chain.img}
                        width={chain.id === 0 ? 8 : 14}
                        height={chain.id === 0 ? 8 : 14}
                        alt={chain.name}
                      />
                    </div>
                    {chain.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <button
          onClick={handleSwitch}
          className="absolute cursor-pointer mt-2 w-8 h-8 bg-gray21/70 rounded-lg p-1"
        >
          <Image
            src="/home/doubleArrow.svg"
            alt="setting"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="grid grid-cols-2 bg-gray22/75 w-full rounded-2xl">
        <div className="flex flex-col gap-1 px-4 py-5">
          <span className="text-sm font-semibold">Transfer to:</span>
          <input
            placeholder="0"
            className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
          />
          <span>Wrapped FFC</span>
        </div>
        <div className="flex flex-col justify-center items-end px-4 py-5 gap-3">
          <div className="relative">
            <button
              className="bg-primary1/90 text-black text-sm hover:bg-primary1 pl-2 pr-3 py-2 rounded-full flex items-center"
              onClick={() => setTransferToDropdown(!transferToDropdown)}
            >
              <div className="rounded-full p-1 w-5 h-5 bg-white mr-2 flex items-center justify-center">
                <Image
                  src={chainOptions[transferTo].img}
                  width={transferTo === 0 ? 8 : 14}
                  height={transferTo === 0 ? 8 : 14}
                  alt={chainOptions[transferTo].name}
                />
              </div>
              {chainOptions[transferTo].name} {chevronDown}
            </button>
            {transferToDropdown && (
              <div className="absolute top-12 py-3 px-1 bg-gray23 w-40 right-0 rounded-2xl flex flex-col z-50">
                {chainOptions.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => selectChain(setTransferTo, chain.id)}
                    className="flex items-center gap-2 text-xs py-2 hover:bg-gray24 rounded-xl px-2"
                  >
                    <div className="rounded-full p-1 w-5 h-5 bg-white flex items-center justify-center">
                      <Image
                        src={chain.img}
                        width={chain.id === 0 ? 8 : 14}
                        height={chain.id === 0 ? 8 : 14}
                        alt={chain.name}
                      />
                    </div>
                    {chain.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <button className="w-full bg-primary1/90 hover:bg-primary1 text-black rounded-full mt-2 py-3">
        Bridge Anyway
      </button>
    </div>
  );
};

const chevronDown = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 9.99997L12 14L16 9.99997"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BridgePage;

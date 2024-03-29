"use client";

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import HomeHeader from "@/components/headers/HomeHeader";
import SwapBalance from "@/components/home/swap/SwapBalance";
import SelectATokenSendModal from "@/components/models/SelectATokenSendModal";
import { useState, useRef } from "react";
import { useAccount } from "wagmi";
import { useChainId, useWriteContract } from "wagmi";
const SendPage = () => {
  const [amount, setAmount] = useState("");
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [changeToken, setChangeToken] = useState(1);
  const { address } = useAccount();
  const [walletAddressToSendTokens, setWalletAddressToSendTokens] =
    useState("");
  const amountRef = useRef(null); // Create a ref for the amount input field
  const walletAddressToSendTokensRef  = useRef(null); // Create a ref for the amount input field

  const handleAmountChange = () => {
    // Access the current value of the input field using the ref
    const amountValue = amountRef.current.value;
    console.log(amountValue); // Log the current value
  };
  const handleWalletAddressToSendTokensChange = (e) => {
    setWalletAddressToSendTokens(e.target.value);
  };
  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }
  async function send() {
    try {
      const usdtAbi = [
        {
          type: "event",
          name: "Approval",
          inputs: [
            {
              indexed: true,
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            {
              indexed: true,
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
        },
        {
          type: "function",
          name: "allowance",
          stateMutability: "view",
          inputs: [
            {
              name: "owner",
              type: "address",
            },
            {
              name: "spender",
              type: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
        },
        {
          type: "function",
          name: "approve",
          stateMutability: "nonpayable",
          inputs: [
            {
              name: "spender",
              type: "address",
            },
            {
              name: "amount",
              type: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
        },
        {
          type: "function",
          name: "balanceOf",
          stateMutability: "view",
          inputs: [
            {
              name: "account",
              type: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
        },
        {
          type: "function",
          name: "decimals",
          stateMutability: "view",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint8",
            },
          ],
        },
        {
          type: "function",
          name: "name",
          stateMutability: "view",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
        },
        {
          type: "function",
          name: "symbol",
          stateMutability: "view",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
        },
        {
          type: "function",
          name: "totalSupply",
          stateMutability: "view",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
        },
        {
          type: "function",
          name: "transfer",
          stateMutability: "nonpayable",
          inputs: [
            {
              name: "recipient",
              type: "address",
            },
            {
              name: "amount",
              type: "uint256",
            },
          ],
          outputs: [],
        },
        {
          type: "function",
          name: "transferFrom",
          stateMutability: "nonpayable",
          inputs: [
            {
              name: "sender",
              type: "address",
            },
            {
              name: "recipient",
              type: "address",
            },
            {
              name: "amount",
              type: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
        },
      ];
      const amountValue = amountRef.current.value;
      const walletAddress = walletAddressToSendTokensRef.current.value;

      console.log(amountValue);

      const data = await writeContractAsync({
        chainId: chainId,
        address: token.address, // change to receipient address
        functionName: "transfer",
        abi: usdtAbi,
        args: [walletAddress, amountValue],
      });
      console.log(data);
    } catch (error) {
      console.error("Error sending transaction:", error);
      // Handle error appropriately, e.g., show a message to the user
    }
  }
  return (
    <div className="overflow-hidden h-full flex items-center justify-center px-4 relative">
      <LinkedParticlesAnimation />
      <div className="bg-gray22/50 z-50 py-4 sm:px-2 px-4 rounded-2xl flex flex-col gap-y-1 items-center justify-center w-full max-w-[512px] mx-4">
        <HomeHeader noSettings />
        <SelectATokenSendModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          token={token}
          setToken={setToken}
          tokenAmount={amount}
          setTokenAmount={setAmount}
          changeToken={changeToken}
        />
        <div className="flex flex-col gap-y-[2px] w-full h-full mt-3">
          <div className="flex flex-col bg-gray22/80 rounded-t-lg pb-10">
            <p className="text-gray10  px-3 py-2">You are sending</p>
            <div className="flex justify-center">
              <div className="flex flex-col gap-y-1">
                <input
                  className="bg-transparent text-center w-full outline-none text-7xl"
                  placeholder="$0"
                  name="amount"
                  id="amount"
                  ref={amountRef}
                  autoComplete="off"
                  value={amount}
                  onChange={handleAmountChange}
                />
                {token ? (
                  <p className="text-center text-gray10">0{token?.symbol}</p>
                ) : (
                  <p className="text-center text-gray10">
                    Please select a token
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray22/80 rounded-b-lg">
            {token ? (
              <div className="flex items-center w-full gap-x-2">
                <button
                  className="text-start flex gap-x-1 w-full items-center justify-between p-3 border border-gray22 rounded-2xl h-[64px] min-w-[136px]"
                  onClick={() => openModal(1)}
                >
                  <img
                    src={token.logoURI}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={32}
                    height={32}
                    quality={100}
                  />
                  <div className="flex flex-col w-full px-2">
                    <span className="text-sm font-semibold">
                      {token.symbol}
                    </span>
                    {token && address ? (
                      <SwapBalance address={address} token={token.address} />
                    ) : (
                      <span className="text-sm text-gray10">Balance: 0.0</span>
                    )}
                  </div>
                  {chevronDown}
                </button>
              </div>
            ) : (
              <div className="">
                <button
                  className="text-start justify-self-end p-4 w-full text-gray10"
                  onClick={() => openModal(1)}
                >
                  Select a token
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-lg bg-gray22/80 p-3 flex w-full flex-col gap-y-1">
          <span className="text-sm text-gray10">To</span>
          <input
            type="text"
            className="bg-transparent outline-none placeholder:text-gray15 w-full"
            placeholder="Wallet Address"
            ref={walletAddressToSendTokensRef}
            value={walletAddressToSendTokens}
            onChange={handleWalletAddressToSendTokensChange}
            autoComplete="off"
          />
        </div>
        <button
          className="rounded-lg bg-gray22/80 text-center py-4 text-xl font-bold w-full gap-y-1"
          onClick={() => send()}
        >
          {walletAddressToSendTokens === "" ? "Select recipient" : "Send"}
        </button>
      </div>
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
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SendPage;

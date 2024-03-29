"use client";
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DNA } from "react-loader-spinner";
import TransactionSuccessModal from "../../models/TransactionSuccessModal";
import SelectATokenModal from "../../models/SelectATokenModal";
import { tokenList1 } from "@/lists/tokenList1";
import {
  useSendTransaction,
  useAccount,
  useConnect,
  useConnectorClient,
  useSignMessage,
  useSignTypedData,
} from "wagmi";
import { tokenList56 } from "@/lists/tokenList56";
import SwitchTokenButton from "../swap/SwitchTokenButton";
import SwapBalance from "../swap/SwapBalance";
import PerTokenPrice from "../swap/PerTokenPrice";
import Web3 from "web3";
const ethers = require("ethers");
import { LimitOrder, MakerTraits, Address } from "@1inch/limit-order-sdk";
import { Wallet } from "ethers";
import { Api, getLimitOrderV4Domain } from "@1inch/limit-order-sdk";
const { AxiosProviderConnector } = require("@1inch/limit-order-sdk/axios");
import LimitButton from "./LimitButton";
import { useWalletClient } from "wagmi";
import { useVerifyTypedData } from "wagmi";
import { useAppDispatch } from "@/lib/hooks";
import { setOrder } from "@/lib/features/limit/orderSlice";
import LimitExpiry from "./LimitExpiry";

export default function Limit({
  slippage,
  networkId,
  apiUrl,
  tokenOne,
  tokenTwo,
  setTokenOne,
  setTokenTwo,
}) {
  const account = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const [selectedOption, setSelectedOption] = useState("1day");
  const dispatch = useAppDispatch();
  // const {  data: SignTypedDataData,signTypedData } = useSignTypedData();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Enter an amount");
  const [tokenList, setTokenList] = useState([]);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [successfulTransaction, setSuccessfulTransaction] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const chainId = ChainId.ethereumMainnet;
  // const { data: client } = useConnectorClient({ chainId: 1 });

  const [loadingValue, setLoadingValue] = useState(false);

  useEffect(() => {
    setTokenOne(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    setTokenTwo(null);
    if (networkId == 56) {
      setTokenList(tokenList56);
    } else {
      setTokenList(tokenList1);
    }
  }, [networkId]);

  useEffect(() => {
    if (tokenOne && tokenTwo) {
      setLoadingValue(true);
      setButtonLabel("Swap");
      fetchPrices().then(() => setLoadingValue(false));
    }
  }, [tokenOneAmount]);

  const filteredTokenList = tokenList.filter((token) => {
    const tokenName = token.symbol.toLowerCase();
    const tokenAddress = token.address.toLowerCase();
    const search = searchQuery.trim().toLowerCase();

    return tokenName.includes(search) || tokenAddress.includes(search);
  });

  async function changeAmount(e) {
    setTokenOneAmount(e.target.value);
  }
  function checkDisabled(tokenOne, tokenTwo) {
    return tokenOne === null || tokenTwo === null;
  }

  function switchTokens() {
    const amount = tokenTwoAmount;
    setTokenOneAmount(amount);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    if (tokenTwo != null && tokenOne != null) {
      fetchPrices();
    }
  }

  function modifyToken(i) {
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(filteredTokenList[i]);
    } else {
      setTokenTwo(filteredTokenList[i]);
    }
    setIsOpen(false);
  }

  async function fetchPrices() {
    if (!tokenOneAmount || tokenOneAmount === null || tokenOneAmount === 0) {
      setTokenTwoAmount(0);
      setButtonLabel("Enter an amount");
      return; // Exit early if tokenOneAmount is invalid
    }

    const tokenOneAmountNum = parseFloat(tokenOneAmount);
    const amount = tokenOneAmountNum * Math.pow(10, tokenOne.decimals);
    const params = {
      sellToken: tokenOne.address,
      buyToken: tokenTwo.address,
      sellAmount: amount,
      slippagePercentage: slippage,
    };

    const headers = {
      "0x-api-key": process.env.NEXT_PUBLIC_0X_API_KEY,
    };
    try {
      const response = await fetch(`${apiUrl}?${qs.stringify(params)}`, {
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch price: ${response.status}`);
      }
      const swapPriceJSON = await response.json();
      setTokenTwoAmount(swapPriceJSON.buyAmount / 10 ** tokenTwo.decimals);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  }
  const limit = async () => {
    const res = await axios.get('/api/limit', {
      params: {
        address: address,
      },
    });
    const data = res.data
    const signature = await signTypedDataAsync({
      domain:res.data.domain,
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Order: [
          { name: "salt", type: "uint256" },
          { name: "maker", type: "address" },
          { name: "receiver", type: "address" },
          { name: "makerAsset", type: "address" },
          { name: "takerAsset", type: "address" },
          { name: "makingAmount", type: "uint256" },
          { name: "takingAmount", type: "uint256" },
          { name: "makerTraits", type: "uint256" },
        ],
      },
      primaryType: "Order",
      message: res.data.message
       
    });
   const res1 = await axios.post('/api/limit', {
    signature: signature,
  });
  };

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  return (
    <div className="grid place-items-center">
      <SelectATokenModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        tokenOne={tokenOne}
        setTokenOne={setTokenOne}
        tokenTwo={tokenTwo}
        setTokenTwo={setTokenTwo}
        tokenOneAmount={tokenOneAmount}
        setTokenOneAmount={setTokenOneAmount}
        tokenTwoAmount={tokenTwoAmount}
        setTokenTwoAmount={setTokenTwoAmount}
        modifyToken={modifyToken}
        changeToken={changeToken}
      />
      <TransactionSuccessModal
        isOpen={successfulTransaction}
        onClose={() => setSuccessfulTransaction(false)}
      />
      <div className="max-w-[512px] px-3 sm:px-1 flex-col flex items-start">
        <div className="mt-3 flex rounded-2xl flex-col">
          <div className="w-full border flex items-center border-gray22 bg-gray22/75 focus-within:bg-gray24 focus-within:border-gray24 rounded-2xl px-4 py-5">
            <div className="sm:w-full w-[50%] flex flex-col gap-y-1">
              <p className="text-sm font-semibold text-neutralLight">You Pay</p>
              <input
                placeholder="0"
                value={tokenOneAmount || ""}
                onChange={changeAmount}
                disabled={checkDisabled(tokenOne, tokenTwo)}
                className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
              />
              {tokenOne && address ? (
                <SwapBalance address={address} token={tokenOne.address} />
              ) : (
                <span className="text-neutralLight">Balance: 0.0</span>
              )}
            </div>
            {tokenOne ? (
              <div className="flex items-center gap-x-2">
                <p className="text-[#CBFB45] mx-4 font-semibold">Max</p>
                <button
                  className="w-28 flex gap-x-1 items-center justify-between p-3 border border-gray22 rounded-2xl h-[64px] min-w-[136px]"
                  onClick={() => openModal(1)}
                >
                  <img
                    src={tokenOne.logoURI}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={32}
                    height={32}
                    quality={100}
                  />
                  <span className="text-sm font-semibold">
                    {tokenOne.symbol}
                  </span>
                  {chevronDown}
                </button>
              </div>
            ) : (
              <div className="w-[50%] grid " onClick={() => openModal(1)}>
                <button className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit">
                  Select a token
                </button>
              </div>
            )}
          </div>
          <SwitchTokenButton switchTokens={switchTokens} />
          <div className="w-full border mt-2 flex items-center border-gray22 bg-gray22/75 rounded-2xl px-4 py-5">
            <div className="sm:w-full w-[50%] flex flex-col gap-y-1">
              <p className="text-sm font-semibold text-neutralLight">
                You Recieve
              </p>
              {loadingValue ? (
                <DNA
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              ) : (
                <input
                  placeholder="0"
                  value={
                    loadingValue
                      ? "Loading..."
                      : isNaN(tokenTwoAmount)
                      ? "Can't fetch value"
                      : tokenTwoAmount
                      ? tokenTwoAmount?.toFixed(6)
                      : ""
                  }
                  disabled={true}
                  className={`w-full text-[34px] ${
                    tokenTwoAmount === 0 && "text-gray12"
                  } caret-gray12 placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none`}
                />
              )}
              {tokenTwo && address ? (
                <SwapBalance address={address} token={tokenTwo.address} />
              ) : (
                <span className="text-neutralLight"> Balance: 0.0</span>
              )}
            </div>
            {tokenTwo ? (
              <div className="flex items-center gap-x-2">
                <p className="text-[#11130e] mx-4 font-semibold">Max</p>
                <button
                  className="w-28 flex gap-x-1 items-center justify-between p-3 border border-gray22 rounded-2xl h-[64px] min-w-[136px]"
                  onClick={() => openModal(2)}
                >
                  <img
                    src={tokenTwo.logoURI}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={32}
                    height={32}
                    quality={100}
                  />
                  <span className="text-sm font-semibold">
                    {tokenTwo.symbol}
                  </span>
                  {chevronDown}
                </button>
              </div>
            ) : (
              <div className="w-[50%] grid " onClick={() => openModal(2)}>
                <button className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit">
                  Select a token
                </button>
              </div>
            )}
          </div>
          <LimitExpiry
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
          {tokenOne && tokenTwo && (
            <div className="bg-gray24 my-2 px-2 py-3 rounded-2xl">
              <PerTokenPrice
                tokenOne={tokenOne}
                tokenTwo={tokenTwo}
                apiUrl={apiUrl}
              />
            </div>
          )}
          <button
            className="w-full bg-primary1 text-black rounded-full py-3"
            onClick={() => limit()}
          >
            Limit
          </button>
          {/* <LimitButton
            tokenOneAmount={tokenOneAmount}
            isLoading={isLoading}
            Limit={limit}
            buttonLabel={buttonLabel}
          /> */}
        </div>
      </div>
    </div>
  );
}

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
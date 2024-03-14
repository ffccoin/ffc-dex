"use client";
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSendTransaction, useAccount } from "wagmi";
import { DNA } from "react-loader-spinner";
import TransactionSuccessModal from "../../models/TransactionSuccessModal";
import SelectATokenModal from "../../models/SelectATokenModal";
import { tokenList1 } from "@/lists/tokenList1";
import { tokenList56 } from "@/lists/tokenList56";
import SwitchTokenButton from "./SwitchTokenButton";
import SwapButton from "./SwapButton";
import PerTokenPrice from "./PerTokenPrice";

export default function Swap({ slippage, networkId, apiUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Enter an amount");
  const [tokenList, setTokenList] = useState([]);
  const [tokenOne, setTokenOne] = useState(null);
  const [tokenTwo, setTokenTwo] = useState(null);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [successfulTransaction, setSuccessfulTransaction] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const {
    data: hash,
    error,
    isPending,
    isSuccess,
    sendTransaction,
  } = useSendTransaction();

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

  useEffect(() => {
    console.log("tx UseEffect called");
    console.log(txDetails);
    if (txDetails.to && isConnected) {
      sendTransaction1();
      setIsLoading(false);
    }
  }, [txDetails]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessfulTransaction(true);
    }
  }, [isSuccess]);

  async function sendTransaction1() {
    sendTransaction({
      from: address,
      to: txDetails.to,
      data: txDetails.data,
      value: txDetails.value,
    });
  }

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

  async function swapTokens() {
    if (isConnected) {
      if (buttonLabel == "Swap") {
        setIsLoading(true);
        let tokenOneAmountNum = parseFloat(tokenOneAmount);
        let amount = tokenOneAmountNum * Math.pow(10, tokenOne.decimals);
        const res1 = await axios.get(`/api/allowance`, {
          params: {
            src: tokenOne.address,
            address: address,
            selectedNetworkId: networkId,
          },
        });
        if (res1.data.data.allowance == "0") {
          setButtonLabel("Increase Allowance");
          setIsLoading(false);
          return;
        } else {
          const res = await axios.get(`/api/swap`, {
            params: {
              src: tokenOne.address,
              dst: tokenTwo.address,
              amount: amount,
              slippage: slippage,
              selectedNetworkId: networkId,
              from: address,
            },
          });
          console.log("helo");
          console.log(res.data);
          setTxDetails({
            to: res.data.to,
            data: res.data.data,
            value: res.data.value,
          });
          setIsLoading(false);
          return;
        }
      }
      if (buttonLabel == "Increase Allowance") {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const approve = await axios.get(`/api/approveAllowance`, {
          params: {
            src: tokenOne.address,
            selectedNetworkId: networkId,
          },
        });
        setTxDetails({
          to: approve.data.to,
          data: approve.data.data,
          value: approve.data.value,
        });
        console.log("not approved");
        setButtonLabel("Swap");

        return;
      }
    }
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  return (
    <div className="">
      <div className="grid place-items-center pt-20 px-3">
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
        />
        <TransactionSuccessModal
          isOpen={successfulTransaction}
          onClose={() => setSuccessfulTransaction(false)}
        />
        <div className={`max-w-[512px] px-3 sm:px-1 flex-col flex items-start`}>
          <div className={`mt-3 flex bg-gray22/25 p-4 rounded-2xl flex-col`}>
            <div className="w-full border mt-2 flex items-center border-gray22 rounded-2xl px-4 py-5">
              <div className="sm:w-full w-[50%] flex flex-col gap-y-1">
                <p className="text-sm font-semibold">From</p>
                <input
                  placeholder="0"
                  value={tokenOneAmount}
                  onChange={changeAmount}
                  disabled={checkDisabled(tokenOne, tokenTwo)}
                  className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
                />
                <div className="flex flex-row gap-x-2">
                  <p className="text-sm font-normal">Balance :</p>
                  <p className="text-sm font-normal"> 0.0</p>
                </div>
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
            <div className="w-full border mt-2 flex items-center border-gray22 rounded-2xl px-4 py-5">
              <div className="sm:w-full w-[50%] flex flex-col gap-y-1">
                <p className="text-sm font-semibold">To</p>
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
                    }
                    disabled={true}
                    className={`w-full text-[34px] ${
                      tokenTwoAmount === 0 && "text-gray12"
                    } caret-gray12 placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none`}
                  />
                )}

                <div className="flex flex-row gap-x-2">
                  <p className="text-sm font-normal">Balance :</p>
                  <p className="text-sm font-normal"> 0.0</p>
                </div>
              </div>
              {tokenTwo ? (
                <div className="flex items-center gap-x-2">
                  <p className="text-[#CBFB45] mx-4 font-semibold">Max</p>
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
            <PerTokenPrice
              tokenOne={tokenOne}
              tokenTwo={tokenTwo}
              slippage={slippage}
              apiUrl={apiUrl}
            />
            <SwapButton
              tokenOneAmount={tokenOneAmount}
              isLoading={isLoading}
              swapTokens={swapTokens}
              buttonLabel={buttonLabel}
            />
          </div>
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
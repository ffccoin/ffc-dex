"use client";
import qs from "qs";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../buttons/button";
import tokenList from "../../../public/tokenList.json";
import SettingsModal from "../models/SettingsModal";
import axios from "axios";
import { formatUnits } from "ethers";
import { useAccount, useEnsName } from "wagmi";
import { useSendTransaction, useWaitForTransaction } from "wagmi";


export default function Swap() {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedSlippage, setSelectedSlippage] = useState(0);
  const [swapPlaces, setSwapPlaces] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [tokenOne, setTokenOne] = useState(null);
  const [tokenTwo, setTokenTwo] = useState(null);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [prices, setPrices] = useState(null);
  const [coinData, setCoinData] = useState(null);
  const { address, connector, isConnected } = useAccount();
  
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });

  const {data, sendTransaction} = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    }
  })
  useEffect(()=>{

    if(txDetails.to && isConnected){
      sendTransaction();
    }
}, [txDetails])

  // const fetchExchangeRate = async () => {
  //   try {
  //     const url = "https://tokens.coingecko.com/uniswap/all.json";
  //     const res = await fetch(url);

  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await res.json();
  //     console.log(data.tokens);
  //     const additionalToken = {
  //       chainId: 1,
  //       address: "0xbf05C4023E735ab912E2c34c0f391702efEC34",
  //       name: "FFC",
  //       ticker: "FFC",
  //       decimals: 18,
  //       img: "/header/logo-mobile.svg"
  //     };

  //     // const concatenatedTokens = data.tokens.reduce((acc, curr) => [...acc, ...curr], []);
  //     // console.log("Tokens fetched:", concatenatedTokens);

  //     // setTokenList(concatenatedTokens);
  //     if (Array.isArray(data.tokens)) {
  //       console.log("Tokens fetched:", data.tokens);
  //       const top50Tokens = data.tokens.slice(0, 50);
  //       const tokenListWithAdditional = [...top50Tokens, additionalToken];
  //       setTokenList(tokenListWithAdditional);
  //     } else {
  //       console.error("Unexpected data structure for tokens", data.tokens);
  //     }
  //     fetchPrices(tokenList[0].address, tokenList[1].address);

  //     // Set the state with fetched data
  //   } catch (error) {
  //     console.error("Error fetching exchange rate:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchExchangeRate();
  // }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  const filteredTokenList = tokenList.filter((token) => {
    const tokenName = token.ticker.toLowerCase();
    const tokenAddress = token.address.toLowerCase();
    const search = searchQuery.trim().toLowerCase();

    return tokenName.includes(search) || tokenAddress.includes(search);
  });
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleSlippageSelection = (slippage) => {
    setSelectedSlippage(slippage);
  };
  async function changeAmount(e) {
    setTokenOneAmount(e.target.value);
  }
  function checkDisabled(tokenOne, tokenTwo) {
    return tokenOne === null || tokenTwo === null;
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    if (tokenTwo != null && tokenOne != null) {
      fetchPrices(two.address, one.address);
    }
  }
  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    if (changeToken === 1) {
      setTokenOne(filteredTokenList[i]);
      if (tokenTwo != null) {
        // fetchPrices(tokenList[i].address, tokenTwo.address);
      }
    } else {
      setTokenTwo(filteredTokenList[i]);
      if (tokenOne != null) {
        // fetchPrices(tokenOne.address, tokenList[i].address);
      }
    }

    setIsOpen(false);
  }

  async function fetchPrices() {
    let tokenOneAmountNum = parseFloat(tokenOneAmount);
    let amount = tokenOneAmountNum * Math.pow(10, tokenOne.decimals);
    const params = {
      sellToken: tokenOne.address,
      buyToken: tokenTwo.address,
      sellAmount: amount,
    };

    const headers = {
      "0x-api-key": "9a827917-91ba-4739-87f9-23451d511ea6",
    };

    // Fetch the swap price.
    const response = await fetch(
      `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`,
      { headers }
    );

    const swapPriceJSON = await response.json();
    setTokenTwoAmount(swapPriceJSON.buyAmount / 10 ** tokenTwo.decimals);
  }

  async function swapTokens() {
    let tokenOneAmountNum = parseFloat(tokenOneAmount);
    let amount = tokenOneAmountNum * Math.pow(10, tokenOne.decimals);
    const res1 = await axios.get(`/api/allowance`, {
      params: {
        src: tokenOne.address,
        address: address,
      },
    });
    console.log(res1.data);

    
    const res = await axios.get(`/api/swap`, {
      params: {
        src: tokenOne.address,
        dst: tokenTwo.address,
        amount: amount,
        slippage: selectedSlippage,
        from: address,
      },
    });
    console.log(res.data);
    setTxDetails(res.data)
    console.log(txDetails);
  }

  // async function fetchPrices(one, two) {
  //   const res = await axios.get(`/api/swap`, {
  //     params: { addressOne: one, addressTwo: two },
  //   });
  //   console.log(res.data);
  //   setPrices(res.data);
  // }
  // async function fetchDexSwap() {
  //   const allowance = await axios.get(
  //     `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
  //   );

  //   if (allowance.data.allowance === "0") {
  //     const approve = await axios.get(
  //       `https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`
  //     );

  //     setTxDetails(approve.data);
  //     console.log("not approved");
  //     return;
  //   }

  //   const tx = await axios.get(
  //     `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
  //       tokenOne.address
  //     }&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
  //       tokenOne.decimals + tokenOneAmount.length,
  //       "0"
  //     )}&fromAddress=${address}&slippage=${slippage}`
  //   );

  //   let decimals = Number(`1E${tokenTwo.decimals}`);
  //   setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

  //   setTxDetails(tx.data.tx);
  // }

  // when price of token 1 changes fetch prices
  useEffect(() => {
    if (tokenOne && tokenTwo) {
      setLoadingValue(true);
      fetchPrices().then(() => setLoadingValue(false));
    }
  }, [tokenOneAmount]);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }
  return (
    <div className="grid place-items-center justify-center py-10 px-3">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-10">
          <div className="bg-neutral rounded-3xl w-full max-w-[32rem] h-[95%] overflow-y-auto">
            <div className="px-7 py-3">
              <div className="flex mt-4 items-center justify-between">
                <div className="flex-grow text-center">
                  <p className="text-2xl">Select a Token</p>
                </div>
                <Image
                  alt="close"
                  src="/home/cross.svg"
                  className="justify-self-end cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <input
                type="text"
                placeholder="Search name or paste address"
                className="w-full p-2 mt-6 mb-2 border h-14 outline-none rounded-2xl border-neutralLight text-neutralLight bg-neutral"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredTokenList.map((e, i) => {
                return (
                  <Dialog.Description className="mt-4" key={i}>
                    <div
                      className="flex gap-9 items-center justify-between cursor-pointer"
                      onClick={() => modifyToken(i)}
                    >
                      <div className="flex gap-5 items-center">
                        <img
                          src={e.img}
                          alt={e.ticker}
                          width={33}
                          height={33}
                          quality={100}
                        />
                        <div className="flex flex-col">
                          <div className="text-base uppercase font-neue-machina">
                            {e.ticker}
                          </div>
                          <div className="text-sm mt-1 text-neutralLight">
                            {e.name}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-neutralLight">
                        {e.decimals}
                      </div>
                    </div>
                  </Dialog.Description>
                );
              })}

              <div className="flex justify-center gap-3 mt-4">
                <Image
                  alt="manage"
                  src="/home/manage.svg"
                  width={24}
                  height={24}
                />
                <p className="text-primary1">Manage</p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <SettingsModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSelectOption={handleSlippageSelection}
      />
      <div
        className={`max-w-[512px] px-3 sm:px-1  flex-col
        flex items-start`}
      >
        <div className=" flex flex-row w-full justify-between">
          <div className="font-light text-5xl">Swap</div>
          <Image
            src="/home/settings.svg"
            alt="setting"
            onClick={() => setModalOpen(true)}
            width={32}
            className="cursor-pointer"
            height={32}
          />
        </div>
        <div
          className={`mt-8 flex ${
            swapPlaces ? "flex-col-reverse" : "flex-col"
          } `}
        >
          <div className="w-full border mt-2 flex items-center border-neutral rounded-2xl px-4 py-4">
            <div className="sm:w-full w-[50%]">
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
                  className="w-28 flex gap-x-1 items-center justify-between p-3 border border-neutral rounded-2xl h-[64px] min-w-[136px]"
                  onClick={() => openModal(1)}
                >
                  <Image
                    src={tokenOne.img}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={32}
                    height={32}
                    quality={100}
                  />
                  <span className="text-sm font-semibold">
                    {tokenOne.ticker}
                  </span>
                  {chevronDown}
                </button>
              </div>
            ) : (
              <div className="w-[50%] grid " onClick={() => openModal(1)}>
                <button className="bg-primary1 text-sm sm:text-base justify-self-end text-black rounded-full px-4 py-3 min-w-fit">
                  Select a token
                </button>
              </div>
            )}
          </div>
          <Image
            src="/home/doubleArrow.svg"
            alt="setting"
            width={32}
            height={32}
            onClick={switchTokens}
            className="self-center cursor-pointer mt-2"
          />
          <div className="w-full  border mt-2 flex items-center border-neutral rounded-2xl px-4 py-4">
            <div className="sm:w-full w-[50%]">
              <p className="text-sm font-semibold">To</p>
              <input
                placeholder="0"
                value={
                  loadingValue
                    ? "Loading..."
                    : tokenTwoAmount === NaN
                    ? "Cannot fetch value"
                    : tokenTwoAmount
                }
                disabled={true}
                className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
              />
              <div className="flex flex-row gap-x-2">
                <p className="text-sm font-normal">Balance :</p>
                <p className="text-sm font-normal"> 0.0</p>
              </div>
            </div>
            {tokenTwo ? (
              <div className="flex items-center gap-x-2">
                <p className="text-[#CBFB45] mx-4 font-semibold">Max</p>
                <button
                  className="w-28 flex gap-x-1 items-center justify-between p-3 border border-neutral rounded-2xl h-[64px] min-w-[136px]"
                  onClick={() => openModal(2)}
                >
                  <Image
                    src={tokenTwo.img}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={32}
                    height={32}
                    quality={100}
                  />
                  <span className="text-sm font-semibold">
                    {tokenTwo.ticker}
                  </span>
                  {chevronDown}
                </button>
              </div>
            ) : (
              <div className="w-[50%] grid " onClick={() => openModal(2)}>
                <button className="bg-primary1 text-sm sm:text-base justify-self-end text-black rounded-full px-4 py-3 min-w-fit">
                  Select a token
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-10">
          <button
            className={`w-full py-3 rounded-full ${
              tokenOneAmount === null || tokenOneAmount === 0
                ? "bg-neutral text-neutralLight"
                : "bg-primary1 text-black"
            }`}
            onClick={() => swapTokens()}
          >
            {tokenOneAmount === null || tokenOneAmount === 0
              ? "Enter an amount"
              : "Swap"}
          </button>
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

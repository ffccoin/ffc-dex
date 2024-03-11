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
import LoadingPage from "@/components/animations/swapLoading";
import { DNA, ThreeDots } from "react-loader-spinner";
import loading from "@/app/loading";

export default function Swap() {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedSlippage, setSelectedSlippage] = useState(0);
  const [swapPlaces, setSwapPlaces] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Enter an amount");
  const [buttonClass, setButtonClass] = useState(
    "bg-neutral text-neutralLight"
  );

  const [tokenOne, setTokenOne] = useState(null);
  const [tokenTwo, setTokenTwo] = useState(null);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [coinData, setCoinData] = useState(null);
  const { address, connector, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

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
    sendTransaction,
  } = useSendTransaction();
  async function sendTransaction1() {
    sendTransaction({
      from: address,
      to: txDetails.to,
      data: txDetails.data,
      value: txDetails.value,
    });
  }

  // const { data, sendTransaction } = useSendTransaction({
  //   request: {
  //     from: "0x8744bf1060285DA8A0F49dcAb1b319657DB7aECF",
  //     to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  //     data: "0x095ea7b3000000000000000000000000111111125421ca6dc452d289314280a0f8842a65ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  //     value: "0",
  //   },
  // });
  useEffect(() => {
    console.log("tx UseEffect called");
    console.log(txDetails); // This will log the updated state, but only after it changes.

    if (txDetails.to && isConnected) {
      sendTransaction1();
      setIsLoading(false);
    }
  }, [txDetails]);

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
    const amount = tokenTwoAmount
    setTokenOneAmount(amount);
    setTokenTwoAmount(0);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    if (tokenTwo != null && tokenOne != null) {
      fetchPrices();
    }
  }
  function modifyToken(i) {
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
    if (isConnected) {
      if (buttonLabel == "Swap") {
        setIsLoading(true);
        let tokenOneAmountNum = parseFloat(tokenOneAmount);
        let amount = tokenOneAmountNum * Math.pow(10, tokenOne.decimals);
        const res1 = await axios.get(`/api/allowance`, {
          params: {
            src: tokenOne.address,
            address: address,
          },
        });
        if (res1.data.data.allowance == "0") {
          setButtonLabel("increase Allowance");
          setIsLoading(false);
          return;
        } else {
          const res = await axios.get(`/api/swap`, {
            params: {
              src: tokenOne.address,
              dst: tokenTwo.address,
              amount: amount,
              slippage: selectedSlippage,
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
          return;
        }
      }
      if (buttonLabel == "increase Allowance") {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const approve = await axios.get(`/api/approveAllowance`, {
          params: {
            src: tokenOne.address,
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

  useEffect(() => {
    if (tokenOne && tokenTwo) {
      setLoadingValue(true);
      setButtonLabel("Swap");
      fetchPrices().then(() => setLoadingValue(false));
    }
  }, [tokenOneAmount]);

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }
  return (
    <div className="">
      <div className="grid place-items-center pt-20 px-3">
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
                  className="w-full p-2 mt-6 mb-2 border h-14 outline-none rounded-2xl border-gray22Light text-neutralLight bg-neutral"
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
          className={`max-w-[512px] px-3 sm:px-1  flex-col flex items-start`}
        >
          <div className="flex flex-row w-full px-2 justify-between">
            <div className="flex items-center gap-x-2">
              <button className="font-apfel-grotezk font-light bg-primary1 text-black px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
                Swap
              </button>
              <button className="font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
                Limit
              </button>
              <button className="font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
                Send
              </button>
              <button className="font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full">
                Buy
              </button>
            </div>
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
            className={`mt-3 flex bg-gray22/25 p-4 rounded-2xl ${
              swapPlaces ? "flex-col-reverse" : "flex-col"
            } `}
          >
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
                  <button className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit">
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
            <div className="w-full  border mt-2 flex items-center border-gray22 rounded-2xl px-4 py-5">
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
                    className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
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
                  <button className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit">
                    Select a token
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full mt-4">
            <button
              className={`w-full  rounded-full ${
                tokenOneAmount === null || tokenOneAmount === 0
                  ? "bg-neutral text-neutralLight"
                  : "bg-primary1 text-black"
              }
              ${
                isLoading ? "": "py-3"
              }
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

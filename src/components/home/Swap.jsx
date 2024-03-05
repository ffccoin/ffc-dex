"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../buttons/button";
import tokenList from "../../../public/tokenList.json";
import SettingsModal from "../models/SettingsModal";
import axios from "axios";

export default function Swap() {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedSlippage, setSelectedSlippage] = useState(null);
  const [swapPlaces, setSwapPlaces] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [tokenOne, setTokenOne] = useState(null);
  const [tokenTwo, setTokenTwo] = useState(null);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokenList = tokenList.filter((token) => {
    const tokenName = token.ticker.toLowerCase();
    const tokenAddress = token.address.toLowerCase();
    const search = searchQuery.trim().toLowerCase();

    console.log("Token Name:", tokenName);
    console.log("Token Address:", tokenAddress);
    console.log("Search Query:", search);

    return tokenName.includes(search) || tokenAddress.includes(search);
  });
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleSlippageSelection = (slippage) => {
    setSelectedSlippage(slippage);
  };
  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
  }
  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
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
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      if (tokenTwo != null) {
        fetchPrices(tokenList[i].address, tokenTwo.address);
      }
    } else {
      setTokenTwo(tokenList[i]);
      if (tokenOne != null) {
        console.log("helo");
        fetchPrices(tokenOne.address, tokenList[i].address);
      }
    }

    setIsOpen(false);
  }

  async function fetchPrices(one, two) {
    const res = await axios.get(`/api/swap`, {
      params: { addressOne: one, addressTwo: two },
    });
    console.log(res.data);
    setPrices(res.data);
  }
  async function fetchDexSwap() {
    const allowance = await axios.get(
      `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
    );

    if (allowance.data.allowance === "0") {
      const approve = await axios.get(
        `https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`
      );

      setTxDetails(approve.data);
      console.log("not approved");
      return;
    }

    const tx = await axios.get(
      `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
        tokenOne.address
      }&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        "0"
      )}&fromAddress=${address}&slippage=${slippage}`
    );

    let decimals = Number(`1E${tokenTwo.decimals}`);
    setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

    setTxDetails(tx.data.tx);
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

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
  <div className="fixed inset-0 flex items-center justify-center p-10" >
    <div className="bg-neutral rounded-3xl w-full max-w-[32rem] h-[90%] overflow-y-auto">
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
                disabled={!prices}
                className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
              />
              <div className="flex flex-row gap-x-2">
                {" "}
                <p className="text-sm font-normal">Balance :</p>
                <p className="text-sm font-normal"> 0.0</p>
              </div>
            </div>
            {tokenOne && (
              <div className="flex items-center ">
                <p className="text-[#CBFB45] font-semibold ">Max</p>
                <div className="w-28 flex gap-x-1 items-center justify-between p-3 border rounded-2xl h-[64px] ">
                  <img
                    src={tokenOne.img}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={30}
                    height={30}
                  />
                  {tokenOne.ticker}
                  <Image
                    alt="img"
                    src="/home/downArrow.svg"
                    onClick={() => openModal(1)}
                    width={14}
                    height={14}
                  />
                </div>
              </div>
            )}
            {!tokenOne && (
              <div className="w-[50%] grid " onClick={() => openModal(2)}>
              <button className="bg-primary1 justify-self-end text-black rounded-full px-4 py-3 min-w-fit">
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
            className="self-center cursor-pointer   mt-2"
          />
          <div className="w-full  border mt-2 flex items-center border-neutral rounded-2xl px-4 py-4">
            <div className="sm:w-full w-[50%]">
              <p className="text-sm font-semibold">To</p>
              <input
                placeholder="0"
                value={tokenTwoAmount}
                disabled={true}
                className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
              />{" "}
              <div className="flex flex-row gap-x-2">
                {" "}
                <p className="text-sm font-normal">Balance :</p>
                <p className="text-sm font-normal"> 0.0</p>
              </div>
            </div>
            {tokenTwo ? (
              <div className="flex items-center">
                <p className="text-[#CBFB45] font-semibold ">Max</p>
                <div className="border-gray23 w-28  text-sm flex gap-x-1 items-center justify-between p-3 border rounded-2xl h-[64px]">
                  <img
                    src={tokenTwo.img}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={30}
                    height={30}
                  />
                  {tokenTwo.ticker}
                  <Image
                    alt="img"
                    src="/home/downArrow.svg"
                    onClick={() => openModal(2)}
                    className=""
                    width={15}
                    height={15}
                  />
                </div>
              </div>
            ) : (
              <div className="w-[50%] grid " onClick={() => openModal(2)}>
                <button className="bg-primary1 justify-self-end text-black rounded-full px-4 py-3 min-w-fit">
                  Select a token
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-10">
          <button className="w-full py-3 rounded-full bg-neutral text-neutralLight">
            Enter an amount
          </button>
        </div>
      </div>
    </div>
  );
}

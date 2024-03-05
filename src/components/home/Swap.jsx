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

  async function fetchPrices(one,two) {
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
    <div className="grid place-items-center  justify-center">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="mx-auto my-auto w-[512px] p-10  rounded bg-gray22">
              <Dialog.Title className={" text-center text-2xl " }>Select a Token</Dialog.Title>
              {tokenList?.map((e, i) => {
                return (
                  <Dialog.Description>
                    <div className="mt-7 flex gap-9 items-center " key={i} onClick={() => modifyToken(i)}>
                      <img
                        src={e.img}
                        alt={e.ticker}
                        className=" w-6 h-6"
                        width={25}
                        height={25}
                      />
                      <div className="flex flex-col">
                        <div className="">{e.name}</div>
                        <div className="">{e.ticker}</div>
                      </div>
                      <div className=""> {e.decimals}</div>
                    </div>
                  </Dialog.Description>
                );
              })}
            </Dialog.Panel>
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
          <div className="font-light text-5xl text-[#CBFB45] ">Swap</div>
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
          <div className="w-full border mt-2 flex items-center border-gray22 rounded-2xl px-4 py-4">
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
                <div className="border-gray23 w-28 flex gap-x-1 items-center justify-between p-3 border rounded-2xl h-[64px] ">
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
              <div className="w-[50%] sm:w-[37%] " onClick={() => openModal(1)}>
                <Button
                  title={"Select a Token"}
                  className={"bg-[#CBFB45] text-black"}
                  width="full"
                />
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
          <div className="w-full  border mt-2 flex items-center border-gray22 rounded-2xl px-4 py-4">
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
            {tokenTwo && (
              <div className="flex items-center ">
                {" "}
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
            )}
            {!tokenTwo && (
              <div className="w-[50%] sm:w-[37%] " onClick={() => openModal(2)}>
                <Button
                  title={"Select a Token"}
                  className={"bg-[#CBFB45] text-black"}
                  width="full"
                />
              </div>
            )}
          </div>{" "}
        </div>
        <div className="w-full mt-10 ">
          <Button
            title={"Enter an Amount"}
            className={"bg-gray23 text-gray18"}
            width="full"
          />
        </div>{" "}
      </div>
    </div>
  );
}

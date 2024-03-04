"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../buttons/button";
import SettingsModal from "../models/SettingsModal";
export default function Swap() {
  const [swapPlaces, setSwapPlaces] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    //styleName: Headline-Thin/H3-Bold;

    <div className="grid place-items-center  justify-center">
      <SettingsModal isOpen={isModalOpen} onClose={toggleModal} />

      <div
        className={`max-w-[512px] px-3 sm:px-1  flex-col
        flex items-start`}
      >
        <div className=" flex flex-row w-full justify-between">
          <div className="font-light text-5xl ">Swap</div>
          <Image
            src="/home/settings.svg"
            alt="setting"
            onClick={()=> setModalOpen(true)}
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
                type="text"
                placeholder="0.0"
                className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
              />
              <div className="flex flex-row gap-x-2">
                {" "}
                <p className="text-sm font-normal">Balance :</p>
                <p className="text-sm font-normal"> 0.0</p>
              </div>
            </div>
            <p className="text-primary5 font-semibold sm:mr-5">Max</p>
            <div className="border-gray23  flex gap-x-1 items-center justify-between p-3 border rounded-2xl h-[64px] w-[40%]">
              <Image alt="img" src="/home/circle.svg" width={32} height={32} />
              <p className="text-sm font-semibold uppercase">Eth</p>
              <Image
                alt="img"
                src="/home/downArrow.svg"
                width={14}
                height={14}
              />
            </div>
          </div>
          <Image
            src="/home/doubleArrow.svg"
            alt="setting"
            width={32}
            height={32}
            onClick={() => setSwapPlaces(!swapPlaces)}
            className="self-center cursor-pointer   mt-2"
          />
          <div className="w-full  border mt-2 flex items-center border-gray22 rounded-2xl px-4 py-4">
            <div className="sm:w-full w-[50%]">
              <p className="text-sm font-semibold">To</p>
              <input
                type="text"
                placeholder="0.0"
                className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
              />
              <div className="flex flex-row gap-x-2">
                {" "}
                <p className="text-sm font-normal">Balance :</p>
                <p className="text-sm font-normal"> 0.0</p>
              </div>
            </div>
            <div className="w-[50%] sm:w-[37%] ">
              <Button
                title={"Select a Token"}
                className={"gradient-9"}
                width="full"
              />
            </div>
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

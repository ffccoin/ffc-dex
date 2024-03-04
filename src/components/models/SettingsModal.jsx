import React from "react";
import Image from "next/image";

export default function SettingsModal({ isOpen, onClose }) {
  return (
    isOpen && (
      <div className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm  ">
        <div className="fixed  px-8 z-50 top-0 left-0  h-full w-full items-center justify-center flex">
          <div className=" bg-gray23  w-[512px] h-[536px] px-8 py-10 rounded-3xl shadow-lg">
            <div className="flex justify-between">
              <p className="text-xl font-light">Transaction Settings</p>
              <Image
                alt="img"
                src="/home/cross.svg"
                width={24}
                height={24}
                onClick={onClose}
              />
            </div>
            <div className="flex items-center mt-8 gap-x-2 ">
                <p className="text-sm font-normal"> Slippage Tolerance</p>
                <Image
                alt="img"
                src="/home/questionMark.svg"
                width={24}
                height={24}
                onClick={onClose}
              />
            </div>
            <div className="grid sm:grid-cols-4  grid-cols-2 grid-rows-2 gap-y-4 sm:gap-y-0 w-full sm:place-items-start items-center place-items-center  mt-6 sm:max-w-[350px]">
                <div className="h-10 bg-gray22 rounded-full w-20 px-2 py-2" > <p className="text-primary5 text-center"> 0.1% </p></div>
                <div className="h-10 bg-gray22 rounded-full w-20 px-2 py-2" > <p className="text-primary5 text-center"> 0.1% </p></div>
                <div className="h-10 bg-gray22 rounded-full w-20 px-2 py-2" > <p className="text-primary5 text-center"> 0.1% </p></div>
                <div className="h-10 bg-gray22 rounded-xl sm:w-[121px]  w-24 px-2 py-2" > <p className="text-gray18 text-center"> 0.1% </p></div>

            </div>
            <div className="flex items-center mt-8 gap-x-2 ">
                <p className="text-sm font-normal">Transaction Deadline</p>
                <Image
                alt="img"
                src="/home/questionMark.svg"
                width={24}
                height={24}
                onClick={onClose}
              />
            </div>
            <div className="flex items-center mt-8 gap-x-2 ">
            <input
                type="text"
                placeholder="20"
                className=" w-[121px] text-[34px] caret-gray12   placeholder-gray12 leading-[42px] border border-gray22 bg-transparent outline-none"
              />
            </div>

          </div>
        </div>
      </div>
    )
  );
}

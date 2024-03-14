"use client";

import Image from "next/image";
import { useState } from "react";

export default function SettingsModal({
  selectedSlippage,
  setSelectedSlippage,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const options = [
    { value: 0.1, label: "0.1%" },
    { value: 0.5, label: "0.5%" },
    { value: 1, label: "1.0%" },
  ];

  const calculatePercentage = () => {
    if (selectedSlippage) {
      // Extract numeric value from the selected option
      const numericValue = parseFloat(selectedSlippage);
      return numericValue.toFixed(2); // Display one decimal place
    }
    return "0.0";
  };
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>
        <Image
          src="/home/settings.svg"
          alt="setting"
          width={32}
          className="cursor-pointer"
          height={32}
        />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
          <div className="fixed  px-8 z-50 top-0 left-0  h-full w-full items-center justify-center flex">
            <div className=" bg-gray23  w-[512px] sm:h-[536px] h-[619px] px-8 py-10 rounded-3xl shadow-lg">
              <div className="flex justify-between">
                <p className="text-xl font-light">Transaction Settings</p>
                <button onClick={() => setModalOpen(false)}>
                  <Image
                    alt="Close Icon"
                    src="/home/cross.svg"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className="flex items-center mt-8 gap-x-2">
                <p className="text-sm font-normal"> Slippage Tolerance</p>
                <div className="group relative flex gap-x-2">
                  <Image
                    alt="img"
                    src="/home/questionMark.svg"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                  <div className="absolute -top-5 left-7 hidden group-hover:block bg-neutral rounded-md p-2 w-44 text-xs">
                    Your transaction will revert if the price changes
                    unfavorably by more than this percentage.
                  </div>
                </div>
              </div>
              <form>
                <div className="grid sm:grid-cols-4  grid-cols-2 grid-rows-2 sm:grid-rows-1 gap-y-4 sm:gap-y-0 w-full sm:place-items-start items-center place-items-center  mt-6 sm:max-w-[350px]">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={`h-10 cursor-pointer ${
                        selectedSlippage === option.value
                          ? "bg-primary1"
                          : "bg-gray22 "
                      } ${
                        option.value === "0.1%"
                          ? "rounded-full"
                          : "rounded-full"
                      } w-20  px-2 py-2`}
                      onClick={() => setSelectedSlippage(option.value)}
                    >
                      <p
                        className={`text-${
                          selectedSlippage === option.value ? "black" : "white"
                        } text-center`}
                      >
                        {option.label}
                      </p>
                    </div>
                  ))}
                  <div
                    className={`h-10 rounded-xl px-2 pl-3 py-2 sm:w-[121px] border border-gray22  w-24`}
                  >
                    <p className="text-gray18 ">{calculatePercentage()}%</p>
                  </div>
                </div>
              </form>

              <div className="flex items-center mt-10 gap-x-2 ">
                <p className="text-sm font-normal">Transaction Deadline</p>
                <div className="group relative flex gap-x-2">
                  <Image
                    alt="img"
                    src="/home/questionMark.svg"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                  <div className="absolute -top-5 left-7 hidden group-hover:block bg-neutral rounded-md p-2 w-44 text-xs">
                    Your transaction will revert if it is pending for more than
                    this long
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-[16px] gap-x-2 ">
                <input
                  type="text"
                  placeholder="20"
                  className=" w-[121px] text-sm caret-gray12  rounded-xl pl-2  placeholder-gray12 leading-[42px] border border-gray22 bg-transparent  outline-none"
                />
                <p className="ml-3">Minutes</p>
              </div>
              <div className="flex items-center mt-10 gap-x-2 ">
                <p className="text-xl  font-light">Interface Settings</p>
              </div>
              <div className="flex items-center justify-between w-full mt-8">
                <div className="flex items-center  gap-x-2 ">
                  <p className="text-sm font-normal"> Transaction Deadline </p>
                  <div className="group relative flex gap-x-2">
                    <Image
                      alt="img"
                      src="/home/questionMark.svg"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                    <div className="absolute -top-5 left-7 hidden group-hover:block bg-neutral rounded-md p-2 w-44 text-xs">
                      Your transaction will revert if it is pending for more
                      than this long
                    </div>
                  </div>
                </div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" />
                  <div class="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-transparent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-neutralLight peer-checked:after:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-100 after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary1 peer-checked:"></div>
                </label>
              </div>
              <div className="flex items-center justify-between w-full mt-7 ">
                <div className="flex items-center gap-x-2 ">
                  <p className="text-sm font-normal"> Disable Multihops </p>
                  <div className="group relative flex gap-x-2">
                    <Image
                      alt="img"
                      src="/home/questionMark.svg"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                    <div className="absolute -top-3 left-7 hidden group-hover:block bg-neutral rounded-md p-2 w-44 text-xs">
                      Restricts swaps to direct pairt only
                    </div>
                  </div>
                </div>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" />
                  <div class="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-transparent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-neutralLight peer-checked:after:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-100 after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary1 peer-checked:"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

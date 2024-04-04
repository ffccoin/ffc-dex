import React from "react";

export default function LimitTime({
  setSelectedOption,
  selectedOption,
  tokenOne,
  tokenTwo,
}) {
  return (
    <div className="flex  justify-between sm:px-8 ">
      {tokenOne && tokenTwo && (
        <div className="flex h-6 justify-center  md:ml-0 ml-9 items-center">
          <img
            src={tokenOne.logoURI}
            alt={tokenOne.symbol}
            width={23}
            height={23}
            quality={100}
          />
          <img
            src={tokenTwo.logoURI}
            alt={tokenTwo.symbol}
            width={23}
            height={23}
            quality={100}
          />
          <div className="flex sm:ml-3 font-bold items-center">
            <div>{tokenOne.symbol}/</div>
            <div>{tokenTwo.symbol}</div>
            {chevron}
          </div>
        </div>
      )}
      <div className="bg-[#22262e]   md:flex hidden  sm:max-w-60  rounded-2xl py-1 px-1">
        <button
          className={`time-option-btn ${
            selectedOption === "5m" && "active"
          } px-3  text-xs rounded-2xl `}
          onClick={() => setSelectedOption("5m")}
          style={{
            backgroundColor:
              selectedOption === "5m" ? "#333b47" : "transparent",
          }}
        >
          5M
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "15m" && "active"
          } px-3 text-xs rounded-2xl `}
          onClick={() => setSelectedOption("15m")}
          style={{
            backgroundColor:
              selectedOption === "15m" ? "#333b47" : "transparent",
          }}
        >
          15M
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "1h" && "active"
          } px-3 text-xs rounded-2xl `}
          onClick={() => setSelectedOption("1h")}
          style={{
            backgroundColor:
              selectedOption === "1h" ? "#333b47" : "transparent",
          }}
        >
          1H
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "4h" && "active"
          }  px-3 text-xs rounded-2xl`}
          onClick={() => setSelectedOption("4h")}
          style={{
            backgroundColor:
              selectedOption === "4h" ? "#333b47" : "transparent",
          }}
        >
          4H
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "1d" && "active"
          } px-3 text-xs rounded-2xl `}
          onClick={() => setSelectedOption("1d")}
          style={{
            backgroundColor:
              selectedOption === "1d" ? "#333b47" : "transparent",
          }}
        >
          1D
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "1w" && "active"
          } px-3 text-xs rounded-2xl `}
          onClick={() => setSelectedOption("1w")}
          style={{
            backgroundColor:
              selectedOption === "1w" ? "#333b47" : "transparent",
          }}
        >
          1W
        </button>
      </div>
    </div>
  );
}
const chevron = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 12 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rotate-90 ml-1 mt-1"
  >
    <path
      d="M0.999939 22C0.868332 22.0008 0.73787 21.9755 0.616033 21.9258C0.494195 21.876 0.383379 21.8027 0.289939 21.71C0.19621 21.617 0.121816 21.5064 0.0710478 21.3846C0.0202791 21.2627 -0.00585938 21.132 -0.00585938 21C-0.00585938 20.868 0.0202791 20.7373 0.0710478 20.6154C0.121816 20.4936 0.19621 20.383 0.289939 20.29L9.58994 11L0.289939 1.71C0.101635 1.5217 -0.00415278 1.2663 -0.00415277 1C-0.00415277 0.733701 0.101635 0.478306 0.289939 0.290002C0.478243 0.101699 0.733637 -0.00408935 0.999939 -0.00408936C1.26624 -0.00408936 1.52164 0.101699 1.70994 0.290002L11.7099 10.29C11.8037 10.383 11.8781 10.4936 11.9288 10.6154C11.9796 10.7373 12.0057 10.868 12.0057 11C12.0057 11.132 11.9796 11.2627 11.9288 11.3846C11.8781 11.5064 11.8037 11.617 11.7099 11.71L1.70994 21.71C1.6165 21.8027 1.50568 21.876 1.38385 21.9258C1.26201 21.9755 1.13155 22.0008 0.999939 22Z"
      fill="white"
    />
  </svg>
);

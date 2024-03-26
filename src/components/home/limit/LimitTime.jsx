import React from "react";

export default function LimitTime({ setSelectedOption, selectedOption }) {
  return (
    <div className="flex justify-end pr-8 ">
      <div className="bg-[#22262e]   flex sm:max-w-60  rounded-2xl py-1 px-1">
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

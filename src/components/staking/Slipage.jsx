import React from "react";

export default function Slipage({ setSelectedOption, selectedOption }) {
  return (
    <div className=" flex  gap-1 px-1 bg-gray22/35 justify-between w-full ">
      <button
        className={`time-option-btn ${
          selectedOption === "25%" && "active"
        } px-[1.8vw] py-[6px] text-sm rounded border  w-full border-[#333b47]`}
        onClick={() => setSelectedOption("25%")}
        style={{
          backgroundColor: selectedOption === "25%" ? "#333b47" : "transparent",
        }}
      >
        25%
      </button>
      <button
        className={`time-option-btn ${
          selectedOption === "50%" && "active"
        } px-[1.8vw]  w-full py-[6px] text-sm rounded border-[#333b47] border`}
        onClick={() => setSelectedOption("50%")}
        style={{
          backgroundColor: selectedOption === "50%" ? "#333b47" : "transparent",
        }}
      >
        50%
      </button>
      <button
        className={`time-option-btn ${
          selectedOption === "70%" && "active"
        } px-[1.8vw]  w-full py-[6px] text-sm rounded border-[#333b47] border`}
        onClick={() => setSelectedOption("70%")}
        style={{
          backgroundColor: selectedOption === "70%" ? "#333b47" : "transparent",
        }}
      >
        70%
      </button>
      <button
        className={`time-option-btn ${
          selectedOption === "100%" && "active"
        } px-[1.8vw]  w-full py-[6px] text-sm rounded border-[#333b47] border`}
        onClick={() => setSelectedOption("100%")}
        style={{
          backgroundColor:
            selectedOption === "100%" ? "#333b47" : "transparent",
        }}
      >
        100%
      </button>
    </div>
  );
}

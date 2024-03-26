import React from "react";

export default function LimitExpiry({ setSelectedOption, selectedOption }) {
  return (
    <div className="flex justify-between py-3 px-2 ">
                <p>Expiry</p>

      <div className=" flex  gap-1 rounded-2xl ">
        <button
          className={`time-option-btn ${
            selectedOption === "1day" && "active"
          } px-3  text-xs rounded-2xl border border-[#333b47]`}
          onClick={() => setSelectedOption("1day")}
          style={{
            backgroundColor:
              selectedOption === "1day" ? "#333b47" : "transparent",
          }}
        >
        1&nbsp; &nbsp;Day
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "1week" && "active"
          } px-3 text-xs rounded-2xl border-[#333b47] border`}
          onClick={() => setSelectedOption("1week")}
          style={{
            backgroundColor:
              selectedOption === "1week" ? "#333b47" : "transparent",
          }}
        >
          1&nbsp; &nbsp;Week
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "1month" && "active"
          } px-3 text-xs rounded-2xl border-[#333b47] border`}
          onClick={() => setSelectedOption("1month")}
          style={{
            backgroundColor:
              selectedOption === "1month" ? "#333b47" : "transparent",
          }}
        >
          1&nbsp; &nbsp;Month
        </button>
        <button
          className={`time-option-btn ${
            selectedOption === "1year" && "active"
          }  px-3 text-xs rounded-2xl border-[#333b47] border`}
          onClick={() => setSelectedOption("1year")}
          style={{
            backgroundColor:
              selectedOption === "1year" ? "#333b47" : "transparent",
          }}
        >
          1&nbsp; &nbsp;Year
        </button>
        
      </div>
    </div>
  );
}

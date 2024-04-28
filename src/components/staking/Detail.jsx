import { info } from "@/svgs/commonSvgs";
import React from "react";

export default function Detail({ isSelected }) {
  return (
    <div className="flex flex-col gap-y-1 mt-2">
      {isSelected == "Stake" && (
        <div className="flex justify-between items-center px-2 text-sm">
          <p className="gap-1 flex items-center ">Lock time:{info}</p>
          <span>2 years</span>
        </div>
      )}
      <div className="flex justify-between items-center px-2 text-sm">
        <span>Stake: </span>
        <span>0 1INCH</span>
      </div>
      {isSelected == "Stake" && (
        <div className="flex justify-between items-center px-2 text-sm">
          <span>Locked till:</span>
          <span>28 Apr 2026</span>
        </div>
      )}
      <div className="flex justify-between items-center px-2 text-sm">
        <p className="flex items-center gap-1 ">Network Fee:{info}</p>
        <span>Market~$4.52423</span>
      </div>
    </div>
  );
}

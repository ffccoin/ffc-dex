"use client";

import React from "react";
import { useSelector } from "react-redux";

export default function Proposals() {
  const proposals = useSelector((state) => state.proposals.list);
  return (
    <div className="flex flex-col mt-3">
      <div className="flex  sm:flex-row flex-col justify-between">
        <div className="flex text-3xl font-bold text-white">Proposals</div>
      </div>

      <div className="flex flex-col md:mt-10 mt-6 gap-y-4">
        {proposals.map((proposal, index) => (
          <div
            className="bg-gray22 px-5 py-[17px] relative rounded-2xl"
            key={index}
          >
            <div className="text-xs flex gap-1 ">
              <p className=" text-gray12">End&nbsp;Date:</p>
              <p>{proposal.endDate}</p>
            </div>
            <div className="flex justify-between  items-center">
              <p className=" font-bold text-xl text-white">{proposal.title}</p>
              <button
                className={`${
                  proposal.status === "Pending"
                    ? "bg-[#07652B]"
                    : "bg-[#015667]"
                } absolute right-3 top-6 text-white px-2 py-[6px] text-center font-semibold rounded-3xl`}
              >
                {proposal.status}
              </button>
            </div>
            <p className="mt-2 text-gray12">{proposal.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

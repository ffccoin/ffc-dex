"use client";

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const VotePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Proposal");
  const proposals = useSelector((state) => state.proposals.list);
  const toggleFlash = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex justify-center px-4 overflow-x-hidden">
      <LinkedParticlesAnimation />
      <div className="w-full h-full max-h-[76vh] flex flex-col md:flex-row gap-10 mt-[80px] max-w-7xl">
        {/* TAB SELECTOR */}
        <div className="flex order-1 flex-col md:w-[23vw] 2xl:w-[14vw] w-full min-w-[250px] h-fit">
          <div className="flex text-2xl text-white ">Dashboard</div>
          <div
            onClick={() => {
              setSelectedTab("Proposal");
            }}
            className={`flex text-lg py-2 pl-2 w-full items-start text-white font-medium gap-2 mt-5 ${
              selectedTab === "Proposal" ? " bg-gray22/80 " : "bg-transparent"
            }  items-center `}
          >
            {doc} Proposal{" "}
          </div>
          <div
            onClick={() => {
              setSelectedTab("Requests");
            }}
            className={`flex  ${
              selectedTab === "Requests" ? "bg-gray22/80" : "bg-transparent"
            } text-lg py-2 pl-2 w-full mt-3 text-white font-medium gap-2  items-center "`}
          >
            <Image src={"./home/mail.svg"} width={20} height={20} /> Requests{" "}
          </div>
        </div>
        {/* Proposals */}
        <div className="flex order-3 md:order-2 flex-col mt-3 max-h-[75vh]">
          <div className="flex  md:flex-row flex-col justify-between">
            <div className="flex text-3xl font-bold text-white">Proposals</div>
          </div>
          <div className="flex flex-col md:mt-10 mt-6 gap-y-4 overflow-auto scrollbar-hidden">
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
                  <p className=" font-bold text-xl text-white w-[68%]">
                    {proposal.title}
                  </p>
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
        {/* Add Proposal */}
        <button
          onClick={() => toggleFlash()}
          className="rounded-full order-2 md:order-3 md:mt-0 h-fit md:self-start self-end w-fit px-4 py-2 text-sm font-bold bg-primary1 text-black"
        >
          Add&#160;new&#160;Proposal
        </button>
      </div>
    </div>
  );
};

const doc = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="20"
    height="20"
    viewBox="0,0,256,256"
  >
    <g
      fill="#ffffff"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
    >
      <g transform="scale(5.33333,5.33333)">
        <path d="M12.5,4c-2.4675,0 -4.5,2.0325 -4.5,4.5v31c0,2.4675 2.0325,4.5 4.5,4.5h23c2.4675,0 4.5,-2.0325 4.5,-4.5v-21c-0.00008,-0.3978 -0.15815,-0.77928 -0.43945,-1.06055l-0.01562,-0.01562l-12.98437,-12.98437c-0.28127,-0.2813 -0.66275,-0.43938 -1.06055,-0.43945zM12.5,7h11.5v8.5c0,2.4675 2.0325,4.5 4.5,4.5h8.5v19.5c0,0.8465 -0.6535,1.5 -1.5,1.5h-23c-0.8465,0 -1.5,-0.6535 -1.5,-1.5v-31c0,-0.8465 0.6535,-1.5 1.5,-1.5zM27,9.12109l7.87891,7.87891h-6.37891c-0.8465,0 -1.5,-0.6535 -1.5,-1.5zM17.5,25c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h13c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381zM17.5,32c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h9c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381z"></path>
      </g>
    </g>
  </svg>
);

export default VotePage;

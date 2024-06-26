"use client";

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProposalDetailsPage = ({ params }) => {
  const proposals = useSelector((state) => state.proposals.list);
  const proposal = proposals.find((p) => p.id == params.proposalId);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  return (
    <div className="w-full min-h-screen flex flex-col gap-3 rounded-xl bg-gray22/50 max-w-[87rem] p-5">
      {showVoteModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
          <div className="bg-gray22/90 p-5 rounded-xl max-w-[512px] w-full flex flex-col gap-3">
            <h1 className="text-3xl">Cast your vote</h1>
            <div className="flex gap-3 justify-center pt-10">
              <button
                onClick={() => setSelectedVote("yes")}
                className={`${
                  selectedVote === "yes"
                    ? "bg-primary1 text-black"
                    : "bg-transparent border-white border-2"
                } text-sm hover:bg-primary1 w-full hover:text-black hover:border-0 px-10 py-2 rounded-full`}
              >
                Yes
              </button>
              <button
                onClick={() => setSelectedVote("no")}
                className={`${
                  selectedVote === "no"
                    ? "bg-primary1 text-black"
                    : "bg-transparent border-white border-2"
                } text-sm hover:bg-primary1 w-full hover:text-black hover:border-0 px-10 py-2 rounded-full`}
              >
                No
              </button>
            </div>
            <button
              onClick={() => setShowVoteModal(false)}
              className="bg-gray10 text-black text-sm hover:bg-gray8 px-10 py-2 rounded-full"
            >
              Vote
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between w-full gap-10">
        <Link href="/vote">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="mt-1">{backIcon}</span>
            <p className="font-light">Back</p>
          </div>
        </Link>
        <button
          onClick={() => setShowVoteModal(true)}
          className="bg-primary1/90 text-black text-sm hover:bg-primary1 px-10 py-2 rounded-full"
        >
          Vote
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">{proposal?.title}</h1>
          <div className="bg-gray24 px-3 pt-1.5 pb-2 w-fit rounded-full">
            {proposal?.status}
          </div>
          <p className="font-light">{proposal?.desc}</p>
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="bg-gray24 rounded-xl flex flex-col gap-2 p-5">
              <h1 className="text-xl">Information</h1>
              <div className="flex justify-between">
                <span className="text-gray10">Voting System:</span>
                <span className="font-bold">Single Choice</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray10">Start date:</span>
                <span className="font-bold">{proposal.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray10">End date:</span>
                <span className="font-bold">{proposal.endDate}</span>
              </div>
            </div>
            <div className="bg-gray24 rounded-xl flex flex-col gap-2 p-5">
              <h1 className="text-xl">Current results</h1>
              <div className="flex justify-between">
                <span className="text-gray10">Agree:</span>
                <span className="font-bold">200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray10">Disagree:</span>
                <span className="font-bold">150</span>
              </div>
              <div className="w-full bg-gray12/75 h-3 rounded-full mt-5">
                <div className={`w-[60%] bg-primary1 rounded-full h-full`}></div>
              </div>
            </div>
          </div>
          <h2 className="text-xl">Liquidity</h2>
          <p className="font-light">{proposal?.liquidity}</p>
          <h2 className="text-xl">Exposure</h2>
          <p className="font-light">{proposal?.exposure}</p>
          <h2 className="text-xl">Credibility</h2>
          <p className="font-light">{proposal?.credibility}</p>
          <h2 className="text-xl">Accessibility</h2>
          <p className="font-light">{proposal?.accesibility}</p>
          <h2 className="text-xl">Application</h2>
          <p className="font-light">{proposal?.application}</p>
          <h2 className="text-xl">Diligence</h2>
          <p className="font-light">{proposal?.dilligence}</p>
          <h2 className="text-xl">Fees</h2>
          <p className="font-light">{proposal?.fees}</p>
          <h2 className="text-xl">Marketing</h2>
          <p className="font-light">{proposal?.marketing}</p>
        </div>
      </div>
    </div>
  );
};

const backIcon = (
  <svg
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.1775 4.94751L2.625 9.50001L7.1775 14.0525"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3749 9.5H2.75244"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProposalDetailsPage;

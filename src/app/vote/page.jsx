"use client";

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import AddProposal from "@/components/vote/AddProposal";
import Dashboard from "@/components/vote/Dashboard";
import Proposals from "@/components/vote/Proposals";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const VotePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFlash = () => {
    setIsOpen(!isOpen);
  };
  return (
    <main className="overflow-y-auto h-screen flex justify-center w-full px-4 relative">
      <LinkedParticlesAnimation />
      <div className=" w-[87rem] relative overflow-y-auto">
        <AnimatePresence>
          {isOpen && <AddProposal toggleFlash={toggleFlash} />}
        </AnimatePresence>
        <div className="relative overflow-y-auto min-h-screen top-[5.25rem] 2xl:w-full items-start gap-2 2xl:gap-[7rem] md:justify-between   py-4 px-2 flex md:flex-row flex-col">
          <Dashboard className="order-1" />
          <Proposals className="md:order-2 order-3" />
          <button
            onClick={() => toggleFlash()}
            className="rounded-xl mb-16 md:w-fit w-full md:order-3 order-2 px-3 py-3 md:text-xs  xl:text-lg font-bold  bg-primary1 text-black"
          >
            Add new Proposal
          </button>
        </div>
      </div>
    </main>
  );
};

export default VotePage;

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import Section1 from "@/components/staking/Section1";
import Staking from "@/components/staking/Staking";
import React from "react";

export default function page() {
  return (
    <main className="overflow-y-auto h-screen flex items-center justify-center px-4 relative">
      <LinkedParticlesAnimation />
      <div className=" absolute  md:relative md:top-0 top-[5.25rem] z-50 py-4 px-4 rounded-2xl flex  md:flex-row flex-col-reverse gap-x-[3vw] items-center md:justify-center  ">
        <Section1 />
        <Staking />
      </div>
    </main>
  );
}

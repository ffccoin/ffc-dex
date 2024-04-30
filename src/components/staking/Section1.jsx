import React from "react";

export default function Section1() {
  return (
    <div className="mt-7 md:mt-0 md:mb-0 mb-16">
      <h1 className="text-[32px] font-bold">Staking</h1>
      <div className="flex flex-col mt-8">
        <div className="flex ">
          <div className="w-8 flex-shrink-0 h-8 bg-slate-800 rounded-full flex items-center justify-center">
            1
          </div>
          <div className="ml-5">
            <p className="text-[20px] font-medium leading-7">Stake</p>
            <p className="text-gray12 leading-7">
            Stake your FFC token and earn passive income, without active trading or engagement.
            </p>
          </div>
        </div>
        <div className="border border-gray12  ml-4 h-12 w-[1px] -mt-6"></div>
        <div className="flex items-center -mt-6">
          <div className="w-8 h-8 flex-shrink-0  bg-slate-800 rounded-full flex items-center justify-center">
            2
          </div>
          <div className="ml-5 mt-6">
            <p className="text-[20px] font-medium leading-7">Delegate</p>
            <p className="text-gray12 leading-7">
            Unstaking $FFC lets you earn rewards while trusting experienced validators with the staking process.            </p>
          </div>
        </div>
        <div></div>
      </div>
      <h1 className="text-2xl font-bold mt-10">FFC governance</h1>
      <p className="font-semibold mt-5">
        Participate in FFC Network improvements
      </p>
      <p className="text-gray12 max-w-2xl">
        Independently from delegating to resolvers, you can participate in DAO
        activities. Create proposals, vote for them or delegate your voting
        power to a trusted delegate on our Snapshot and participate in the
        governance forum.
      </p>
    </div>
  );
}

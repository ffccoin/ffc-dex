import LimitGraph from "@/components/home/limit/LimitGraph";
import HomeHeader from "@/components/headers/HomeHeader";
import React from "react";

const LimitPage = () => {
  return (
    <div className="overflow-hidden h-full flex flex-col items-center justify-center mt-20">
      <HomeHeader noSettings />
      <LimitGraph />
    </div>
  );
};

export default LimitPage;

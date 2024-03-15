import React from "react";
import { useChainId, useEstimateFeesPerGas } from "wagmi";

const SwapDetails = ({ tokenTwoAmount, slippage }) => {
  const chainId = useChainId();
  const gasFee = useEstimateFeesPerGas({
    chainId: chainId,
  });
  return (
    <div className="flex flex-col gap-y-1 mt-4">
      <div className="flex justify-between items-center px-2 text-sm">
        <span>Slippage Tolerance:</span>
        <span>{slippage}%</span>
      </div>
      <div className="flex justify-between items-center px-2 text-sm">
        <span>Minimum Receive: </span>
        <span>{tokenTwoAmount - slippage / tokenTwoAmount}</span>
      </div>
      <div className="flex justify-between items-center px-2 text-sm">
        <span>Network Fee:</span>
        <span>{"$ " + gasFee.data?.formatted.maxFeePerGas}</span>
      </div>
    </div>
  );
};

export default SwapDetails;

import React from "react";
import { useChainId, useEstimateFeesPerGas } from "wagmi";

const SwapDetails = ({ tokenOneAmount, tokenTwoAmount, slippage }) => {
  const chainId = useChainId();
  const gasFee = useEstimateFeesPerGas({
    chainId: chainId,
  });

  return tokenOneAmount && tokenTwoAmount ? (
    <div className="flex flex-col gap-y-1 mt-2">
      <div className="flex justify-between items-center px-2 text-sm">
        <span>Slippage Tolerance:</span>
        <span>{slippage}%</span>
      </div>
      <div className="flex justify-between items-center px-2 text-sm">
        <span>Minimum Receive: </span>
        <span>
          {"$" + (tokenTwoAmount - slippage / tokenTwoAmount).toFixed(4)}
        </span>
      </div>
      <div className="flex justify-between items-center px-2 text-sm">
        <span>Network Fee:</span>
        {/* only 4 decimals and to integer */}
        <span>
          {"$ " + parseFloat(gasFee.data?.formatted.maxFeePerGas).toFixed(4)}
        </span>
      </div>
    </div>
  ) : null;
};

export default SwapDetails;

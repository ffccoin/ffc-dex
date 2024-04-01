import React from "react";
import { setBalance } from "viem/actions";
import { useBalance } from "wagmi";

export default function SwapBalance({ address, token }) {
  const result = useBalance({
    address: address,
    token: token,
  });

  return (
    <div className="flex flex-row gap-x-2">
      <p className="text-sm font-normal">Balance :</p>
      <p className="text-sm font-normal"> {result.data?.formatted}</p>
    </div>
  );
}

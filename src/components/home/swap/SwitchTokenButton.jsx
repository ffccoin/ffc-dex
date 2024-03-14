import Image from "next/image";
import React from "react";

const SwitchTokenButton = ({ switchTokens }) => {
  return (
    <button onClick={switchTokens} className="self-center cursor-pointer mt-2">
      <Image src="/home/doubleArrow.svg" alt="setting" width={32} height={32} />
    </button>
  );
};

export default SwitchTokenButton;

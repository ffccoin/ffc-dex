import Image from "next/image";
import React from "react";

const SwitchTokenButton = ({ switchTokens }) => {
  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={switchTokens}
        className="absolute cursor-pointer mt-2 bg-gray21/70 rounded-lg p-1"
      >
        <Image
          src="/home/doubleArrow.svg"
          alt="setting"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default SwitchTokenButton;

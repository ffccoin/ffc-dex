"use client";

import { usePathname, useRouter } from "next/navigation";
import SettingsModal from "../models/SettingsModal";

const HomeHeader = ({
  selectedSlippage = null,
  setSelectedSlippage = null,
  noSettings = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex flex-row w-full px-2 justify-between max-w-[512px]">
      <div className="flex items-center gap-x-2">
        <button
          className={`font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full
              ${pathname === "/" && "bg-primary1 text-black"}
            `}
          onClick={() => router.push("/")}
        >
          Swap
        </button>
        <button
          className={`font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full
            ${pathname === "/limit" && "bg-primary1 text-black"}
          `}
          onClick={() => router.push("/limit")}
        >
          Limit
        </button>
        <button
          className={`font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full
            ${pathname === "/send" && "bg-primary1 text-black"}
          `}
          onClick={() => router.push("/send")}
        >
          Send
        </button>
        <button
          className={`font-apfel-grotezk font-light px-4 flex items-center justify-center h-fit pt-1 pb-2 rounded-full
            ${pathname === "/buy" && "bg-primary1 text-black"}
          `}
          onClick={() => router.push("/buy")}
        >
          Buy
        </button>
      </div>
      {!noSettings && (
        <SettingsModal
          selectedSlippage={selectedSlippage}
          setSelectedSlippage={setSelectedSlippage}
        />
      )}
    </div>
  );
};

export default HomeHeader;

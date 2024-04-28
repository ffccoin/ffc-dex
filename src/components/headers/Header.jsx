"use client";

import Image from "next/image";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useAccount, useChainId } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Header = () => {
  const { open, close } = useWeb3Modal();
  const chainId = useChainId();

  const pathname = usePathname();
  const router = useRouter();
  const { isDisconnected } = useAccount();
  return (
    <header className="grid place-items-center w-full h-[72px] py-2 fixed bg-gray24 z-[9999999]">
      <div className="max-w-[1440px] w-full flex justify-between items-center h-[72px] px-5 sm:px-8">
        <div className="flex items-end gap-x-2">
          <Image src="/logos/logo.svg" width={32} height={32} alt="logo" />
          <h2 className="font-neue-machina-bold text-xl hidden sm:block md:hidden lg:block">
            Force Finance
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-x-5">
          <button
            onClick={() => router.push("/")}
            className={`py-2.5 ${
              pathname === "/"
                ? "border-b border-primary1"
                : "hover:text-primary1 hover:border-b hover:border-primary1"
            } `}
          >
            Swap
          </button>
          <button
            onClick={() => router.push("/staking")}
            className={`py-2.5 ${
              pathname === "/staking"
                ? "border-b border-primary1"
                : "hover:text-primary1 hover:border-b hover:border-primary1"
            } `}
          >
            Staking
          </button>
          <button
            onClick={() => router.push("/tokens")}
            className={`py-2.5 ${
              pathname === "/tokens"
                ? "border-b border-primary1"
                : "hover:text-primary1 hover:border-b hover:border-primary1"
            } `}
          >
            Tokens
          </button>
          <button
            onClick={() => router.push("/vote")}
            className={`py-2.5 ${
              pathname === "/vote"
                ? "border-b border-primary1"
                : "hover:text-primary1 hover:border-b hover:border-primary1"
            } `}
          >
            Vote
          </button>
        </div>
        <div className="flex gap-x-2 items-center">
          {/* <button className="bg-gray22 text-white rounded-full px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-3 hidden md:block"> */}
          {/* <w3m-network-button  balance="show" />   */}
          <div className="flex sm:hidden">
            {chainId === 1 ? (
              <button
                onClick={() => open({ view: "Networks" })}
                className="bg-gray22 p-2 rounded-full"
              >
                <Image
                  src="/header/ethereum.svg"
                  width={20}
                  height={20}
                  alt="ethereum"
                />
              </button>
            ) : chainId === 56 ? (
              <button
                onClick={() => open({ view: "Networks" })}
                className="bg-gray22 p-2 rounded-full"
              >
                <Image
                  src="/header/binance.png"
                  width={20}
                  height={20}
                  alt="binance"
                />
              </button>
            ) : (
              <p></p>
            )}
          </div>

          {isDisconnected ? (
            // <w3m-button label="Connect" balance="hide" />
            <button
              className="bg-gray22 text-white rounded-full px-4 py-2 text-sm sm:text-base sm:px-4 sm:py-[0.5rem]"
              onClick={() => open({ view: "Connect" })}
            >
              Connect to Wallet
            </button>
          ) : (
            <w3m-account-button balance="show" size="md" />
          )}
        </div>
      </div>
    </header>
  );
};

const threeDots = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5027 12.0001C18.5027 12.2764 18.2788 12.5003 18.0025 12.5003C17.7263 12.5003 17.5023 12.2764 17.5023 12.0001C17.5023 11.7239 17.7263 11.4999 18.0025 11.4999C18.2788 11.4999 18.5027 11.7239 18.5027 12.0001"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5002 12.0001C12.5002 12.2764 12.2762 12.5003 12 12.5003C11.7237 12.5003 11.4998 12.2764 11.4998 12.0001C11.4998 11.7239 11.7237 11.4999 12 11.4999C12.2762 11.4999 12.5002 11.7239 12.5002 12.0001"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.49773 12.0001C6.49773 12.2764 6.27378 12.5003 5.99752 12.5003C5.72127 12.5003 5.49731 12.2764 5.49731 12.0001C5.49731 11.7239 5.72127 11.4999 5.99752 11.4999C6.27378 11.4999 6.49773 11.7239 6.49773 12.0001"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Header;

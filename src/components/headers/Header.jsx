"use client";

import Image from "next/image";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="grid place-items-center w-full h-[72px] pt-2">
      <div className="max-w-[1440px] w-full flex justify-between items-center h-[72px] px-5 sm:px-8">
        <Image
          src="/header/logo.svg"
          className="hidden sm:block md:hidden lg:block"
          width={220}
          height={32}
          alt="logo"
        />
        <Image
          src="/header/logo-mobile.svg"
          width={39}
          height={32}
          alt="logo"
          className="sm:hidden md:block lg:hidden"
        />
        <div className="hidden md:flex items-center gap-x-5">
          <button
            onClick={() => router.push("/swap")}
            className={`py-2.5 ${
              pathname === "/swap"
                ? "border-b border-primary1"
                : "hover:text-primary1 hover:border-b hover:border-primary1"
            } `}
          >
            Swap
          </button>
          <button
            onClick={() => router.push("/pool")}
            className={`py-2.5 ${
              pathname === "/pool"
                ? "border-b border-primary1"
                : "hover:text-primary1 hover:border-b hover:border-primary1"
            } `}
          >
            Pool
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
          <button className="bg-primary1 text-black rounded-full px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-3">
            0 $FFC
          </button>
          {/* <button className="bg-gray22 text-white rounded-full px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-3 hidden md:block"> */}
          <w3m-button label="Connect" />          
          {/* </button> */}
          
          <button className="bg-gray22 text-white rounded-full px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-3 hidden md:block">
            {darkMode}
          </button>
          <button className="bg-gray22 text-white rounded-full px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-3 hidden md:block">
            {threeDots}
          </button>
        </div>
      </div>
    </header>
  );
};

const darkMode = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.536 8.46394C16.4738 9.40175 17.0006 10.6736 17.0006 11.9999C17.0006 13.3262 16.4738 14.5981 15.536 15.5359C14.5981 16.4737 13.3262 17.0006 12 17.0006C10.6737 17.0006 9.40176 16.4737 8.46395 15.5359C7.52615 14.5982 6.99924 13.3264 6.99915 12.0003C6.9991 11.3436 7.12839 10.6934 7.37964 10.0867C7.63088 9.48005 7.99916 8.9288 8.46345 8.46444C8.92774 8.00009 9.47894 7.63173 10.0856 7.3804C10.6922 7.12906 11.3424 6.99968 11.9991 6.99963C13.3253 6.99954 14.5971 7.52627 15.535 8.46394"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 4V2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.36 5.64005L19.07 4.93005"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.93005 19.07L5.64005 18.36"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 12H22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12H4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.36 18.36L19.07 19.07"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.93005 4.93005L5.64005 5.64005"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

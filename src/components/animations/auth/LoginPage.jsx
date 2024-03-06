"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-5 sm:min-w-[464px]">
        <h2 className="text-center text-3xl sm:text-5xl text-white">
          Welcome Back!
        </h2>
        <span className="text-gray9 text-xl font-light text-center">
          The decentralized web awaits
        </span>

        <div className="flex items-center mt-16">
          <div className="flex rounded-xl max-h-[64px] w-full px-4 py-5 border border-gray22">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="focus:outline-none outline-none bg-transparent w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPass(!showPass)}>{eyeIcon}</button>
          </div>
          <button className="py-4 pl-4" onClick={() => router.push("/qr-scan")}>
            {qrScanIcon}
          </button>
        </div>
        <button
          className="bg-primary1 text-black disabled:bg-gray23 disabled:text-gray18 p-4 rounded-full mt-5"
          disabled={password.length === 0}
          onClick={() => router.push("/swap")}
        >
          Unlock
        </button>
        <p className="mt-3 text-sm">
          Restore account?{" "}
          <span className="text-primary1 hover:underline cursor-pointer">
            Import using account seed phrase
          </span>
        </p>
      </div>
    </div>
  );
};

const qrScanIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6V3C19 1.895 18.105 1 17 1H14"
      stroke="#CBFB45"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 1H3C1.895 1 1 1.895 1 3V6"
      stroke="#CBFB45"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 14V17C1 18.105 1.895 19 3 19H6"
      stroke="#CBFB45"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 19H17C18.105 19 19 18.105 19 17V14"
      stroke="#CBFB45"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 10H19"
      stroke="#CBFB45"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const eyeIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.11798 12.467C3.0407 12.3233 3.00024 12.1627 3.00024 11.9995C3.00024 11.8363 3.0407 11.6757 3.11798 11.532C5.00998 8.033 8.50498 5 12 5C15.495 5 18.99 8.033 20.882 11.533C20.9593 11.6767 20.9997 11.8373 20.9997 12.0005C20.9997 12.1637 20.9593 12.3243 20.882 12.468C18.99 15.967 15.495 19 12 19C8.50498 19 5.00998 15.967 3.11798 12.467V12.467Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1211 9.879C14.4124 10.1545 14.6456 10.4857 14.8067 10.8529C14.9678 11.2201 15.0537 11.6158 15.0593 12.0168C15.0649 12.4177 14.99 12.8157 14.8392 13.1872C14.6883 13.5588 14.4645 13.8963 14.1809 14.1798C13.8974 14.4633 13.5599 14.6872 13.1884 14.838C12.8168 14.9889 12.4188 15.0638 12.0179 15.0582C11.6169 15.0526 11.2212 14.9667 10.854 14.8056C10.4868 14.6444 10.1557 14.4113 9.88012 14.12C9.3502 13.5513 9.06171 12.7991 9.07542 12.0219C9.08913 11.2447 9.40398 10.5032 9.95363 9.95351C10.5033 9.40386 11.2448 9.08901 12.022 9.0753C12.7992 9.06158 13.5514 9.35008 14.1201 9.88"
      stroke="white"
      strokeWidth="1.429"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LoginPage;

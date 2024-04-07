"use client";

import { Menu, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

const BottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-full fixed p-2 bottom-1 md:hidden flex items-center justify-center bg-black">
      <div className="flex items-center justify-between w-full max-w-[512px] gap-x-1 border border-gray20 rounded-2xl px-1">
        <div className="w-full grid place-items-center">
          <button
            onClick={() => router.push("/swap")}
            className={`py-2.5 text-center px-1 font-apfel-grotezk ${
              pathname === "/"
                ? "border-b border-primary1"
                : "text-gray10 hover:text-white hover:border-b hover:border-primary1"
            }`}
          >
            Swap
          </button>
        </div>
        <div className="w-full grid place-items-center">
          <button
            onClick={() => router.push("/pool")}
            className={`py-2.5 text-center px-1 font-apfel-grotezk ${
              pathname === "/pool"
                ? "border-b border-primary1"
                : "text-gray10 hover:text-white hover:border-b hover:border-primary1"
            }`}
          >
            Pool
          </button>
        </div>
        <div className="w-full grid place-items-center">
          <button
            onClick={() => router.push("/tokens")}
            className={`py-2.5 text-center px-1 font-apfel-grotezk ${
              pathname === "/tokens"
                ? "border-b border-primary1"
                : "text-gray10 hover:text-white hover:border-b hover:border-primary1"
            }`}
          >
            Tokens
          </button>
        </div>
        <div className="w-full grid place-items-center">
          <button
            onClick={() => router.push("/vote")}
            className={`py-2.5 text-center px-1 font-apfel-grotezk ${
              pathname === "/vote"
                ? "border-b border-primary1"
                : "text-gray10 hover:text-white hover:border-b hover:border-primary1"
            }`}
          >
            Vote
          </button>
        </div>
        <Menu as="div" className="relative h-full">
          {({ open }) => (
            <>
              <Menu.Button
                className={`py-2.5 text-center h-8 w-12 flex items-center justify-center px-3.5 rounded-xl text-gray10 ${
                  open && "bg-gray10/10"
                }`}
              >
                <div
                  className={` transition-all ease-in-out duration-300 ${
                    open && "rotate-180"
                  }`}
                >
                  {chevronUp}
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute bottom-11 rounded-xl right-0 px-4 py-3 min-w-[250px] bg-gray23 border border-gray19">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${active && "bg-blue-500"}`}
                        href="/account-settings"
                      >
                        Account settings
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

const chevronUp = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 5L5 0.99997L1 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BottomBar;

"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

const BottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-full fixed p-2 z-[51] bottom-1 md:hidden flex items-center justify-center bg-black">
      <div className="flex items-center justify-between w-full max-w-[512px] gap-x-1 border border-gray20 rounded-2xl px-1">
        <div className="w-full grid place-items-center">
          <button
            onClick={() => router.push("/")}
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
            onClick={() => router.push("/staking")}
            className={`py-2.5 text-center px-1 font-apfel-grotezk ${
              pathname === "/staking"
                ? "border-b border-primary1"
                : "text-gray10 hover:text-white hover:border-b hover:border-primary1"
            }`}
          >
            Staking
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
                <Menu.Items className="absolute bottom-11 flex flex-col rounded-xl right-0 px-4 py-3 min-w-[250px] h-[17.5rem] bg-gray23 border border-gray19">
                  <Menu.Item>
                    {() => (
                      <div className={` font-medium px-0.5 py-1.5 `}>
                        Protocol
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`text-gray12  px-0.5 py-1.5 ${
                          active && "bg-gray22/60"
                        }`}
                        href="/vote"
                      >
                        Governance
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`text-gray12  px-0.5 py-1.5 ${
                          active && "bg-gray22/60"
                        }`}
                        href="https://github.com/ffccoin/ffc-dex"
                      >
                        Developers
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {() => (
                      <div className={`mt-1 px-0.5 py-1.5 `}>
                        Need&nbsp;Help?
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`text-gray12 px-0.5 py-1.5 ${
                          active && "bg-gray22/60"
                        }`}
                        href="https://www.forcefinancecoin.com/contact-us"
                      >
                        Contact&nbsp;us
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`text-gray12  px-0.5 py-1.5 ${
                          active && "bg-gray22/60"
                        }`}
                        href="https://www.forcefinancecoin.com/faqs"
                      >
                        Help&nbsp;Center
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`text-gray12  items-center mt-3 flex gap-4 `}
                      >
                        <Link href="https://discord.gg/nwj93PTAns">
                          {discordIcon}
                        </Link>
                        <Link href="https://twitter.com/forcefinance_">
                          {twitterIcon}
                        </Link>
                        <Link href="https://github.com/ffccoin/ffc-dex">
                          {githubIcon}
                        </Link>
                      </div>
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

const discordIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.28125 7.625C9.28125 7.125 8.90625 6.71875 8.46875 6.71875C8 6.71875 7.625 7.125 7.625 7.625C7.625 8.09375 8 8.5 8.46875 8.5C8.90625 8.5 9.28125 8.09375 9.28125 7.625ZM5.53125 6.71875C5.09375 6.71875 4.71875 7.125 4.71875 7.625C4.71875 8.09375 5.09375 8.5 5.53125 8.5C6 8.5 6.34375 8.09375 6.34375 7.625C6.375 7.125 6 6.71875 5.53125 6.71875ZM14 1.65625C14 0.75 13.25 0 12.3438 0H1.625C0.71875 0 0 0.75 0 1.65625V12.4688C0 13.4062 0.71875 14.125 1.625 14.125H10.6875L10.2812 12.6562C12.625 14.8125 11.9688 14.25 14 16V1.65625ZM11.7188 9.25C11.7188 9.25 11.0312 10.4062 9.25 10.4688C9.25 10.4688 8.96875 10.125 8.71875 9.8125C9.78125 9.53125 10.1875 8.875 10.1875 8.875C9.84375 9.09375 9.53125 9.21875 9.25 9.34375C7.53125 10.0625 5.625 9.8125 4.25 9.0625C4.25 9.03125 4.0625 8.9375 3.9375 8.84375C3.9375 8.84375 4.3125 9.5 5.34375 9.8125C5.09375 10.0938 4.8125 10.4688 4.8125 10.4688C3.03125 10.4062 2.375 9.25 2.375 9.25C2.375 6.65625 3.5 4.59375 3.5 4.59375C4.65625 3.71875 5.75 3.75 5.75 3.75L5.84375 3.84375C4.40625 4.25 3.75 4.875 3.75 4.875C3.75 4.875 3.90625 4.78125 4.21875 4.65625C6.0625 3.84375 8.28125 3.84375 10.1875 4.875C10.1875 4.875 9.5625 4.28125 8.1875 3.875L8.3125 3.75C8.3125 3.75 9.40625 3.71875 10.5625 4.59375C10.5625 4.59375 11.7188 6.65625 11.7188 9.25Z"
      fill="currentColor"
    />
  </svg>
);
const twitterIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.3438 3.75C14.9688 3.28125 15.5312 2.71875 15.9688 2.0625C15.4062 2.3125 14.75 2.5 14.0938 2.5625C14.7812 2.15625 15.2812 1.53125 15.5312 0.75C14.9062 1.125 14.1875 1.40625 13.4688 1.5625C12.8438 0.90625 12 0.53125 11.0625 0.53125C9.25 0.53125 7.78125 2 7.78125 3.8125C7.78125 4.0625 7.8125 4.3125 7.875 4.5625C5.15625 4.40625 2.71875 3.09375 1.09375 1.125C0.8125 1.59375 0.65625 2.15625 0.65625 2.78125C0.65625 3.90625 1.21875 4.90625 2.125 5.5C1.59375 5.46875 1.0625 5.34375 0.625 5.09375V5.125C0.625 6.71875 1.75 8.03125 3.25 8.34375C3 8.40625 2.6875 8.46875 2.40625 8.46875C2.1875 8.46875 2 8.4375 1.78125 8.40625C2.1875 9.71875 3.40625 10.6562 4.84375 10.6875C3.71875 11.5625 2.3125 12.0938 0.78125 12.0938C0.5 12.0938 0.25 12.0625 0 12.0312C1.4375 12.9688 3.15625 13.5 5.03125 13.5C11.0625 13.5 14.3438 8.53125 14.3438 4.1875C14.3438 4.03125 14.3438 3.90625 14.3438 3.75Z"
      fill="currentColor"
    />
  </svg>
);
const githubIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="20"
    height="20"
    viewBox="0,0,256,256"
  >
    <g
      fill="currentColor"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
    >
      <g transform="scale(10.66667,10.66667)">
        <path d="M10.9,2.1c-4.6,0.5 -8.3,4.2 -8.8,8.7c-0.5,4.7 2.2,8.9 6.3,10.5c0.3,0.1 0.6,-0.1 0.6,-0.5v-1.6c0,0 -0.4,0.1 -0.9,0.1c-1.4,0 -2,-1.2 -2.1,-1.9c-0.1,-0.4 -0.3,-0.7 -0.6,-1c-0.3,-0.1 -0.4,-0.1 -0.4,-0.2c0,-0.2 0.3,-0.2 0.4,-0.2c0.6,0 1.1,0.7 1.3,1c0.5,0.8 1.1,1 1.4,1c0.4,0 0.7,-0.1 0.9,-0.2c0.1,-0.7 0.4,-1.4 1,-1.8c-2.3,-0.5 -4,-1.8 -4,-4c0,-1.1 0.5,-2.2 1.2,-3c-0.1,-0.2 -0.2,-0.7 -0.2,-1.4c0,-0.4 0,-1 0.3,-1.6c0,0 1.4,0 2.8,1.3c0.5,-0.2 1.2,-0.3 1.9,-0.3c0.7,0 1.4,0.1 2,0.3c1.3,-1.3 2.8,-1.3 2.8,-1.3c0.2,0.6 0.2,1.2 0.2,1.6c0,0.8 -0.1,1.2 -0.2,1.4c0.7,0.8 1.2,1.8 1.2,3c0,2.2 -1.7,3.5 -4,4c0.6,0.5 1,1.4 1,2.3v2.6c0,0.3 0.3,0.6 0.7,0.5c3.7,-1.5 6.3,-5.1 6.3,-9.3c0,-6 -5.1,-10.7 -11.1,-10z"></path>
      </g>
    </g>
  </svg>
);

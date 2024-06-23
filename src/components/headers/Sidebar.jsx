"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleImageClick = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  const chevronDown = (
    <svg
      className={`transform transition-transform ${
        subMenuOpen ? "rotate-180" : "rotate-0"
      }`}
      width="34"
      height="34"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10L12 15L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-x-3">
        <button className="bg-primary1 text-black rounded-full px-5 py-3 text-sm">
          0 $FFC
        </button>
        <button className="bg-neutral rounded-full px-5 py-4 text-sm">
          Connect wallet
        </button>
        <button className="pl-2" onClick={handleImageClick}>
          <Image
            className="w-[100%] cursor-pointer"
            src="/header/hamburger.svg"
            width={40}
            height={32}
            alt="sidebar"
          />
        </button>
      </div>
      <AnimatePresence>
        {isSidebarVisible && (
          <motion.div
            key="background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.75)] backdrop-brightness-200"
            onClick={handleImageClick}
          ></motion.div>
        )}
        {isSidebarVisible && (
          <motion.div
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 top-0 z-50 w-[85%] border-r-2 border-zinc-800 bg-zinc-900"
            aria-label="Sidebar"
          >
            <div className="mt-16 flex items-center justify-between pl-1 pr-4 sm:px-8 ">
              <Image
                className="pl-4"
                src="/header/logo.svg"
                width={250}
                height={32}
                alt="logo"
              />
              <button onClick={handleImageClick}>
                <Image
                  src="/header/cross.svg"
                  className=""
                  width={20}
                  height={20}
                  alt="cross"
                />
              </button>
            </div>
            <ul>
              <motion.div
                key="submenu"
                initial={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ duration: 1 }}
                className="mb-6 w-full pl-10 pr-4 sm:pl-16 sm:pr-5"
              >
                <div className=" mt-11 select-none justify-between hover:text-primary1 ">
                  <a href="#" className=" ">
                    Swap
                  </a>
                </div>
                <div className="mt-4  hover:text-primary1">
                  <a href="/about-us" className=" ">
                    Pool
                  </a>
                </div>
                <div className="mt-4  hover:text-primary1 ">
                  <a href="/our-services" className=" ">
                    Tokens
                  </a>
                </div>
                <div className="mt-4  hover:text-primary1 ">
                  <a href="/bridge" className=" ">
                    Bridge
                  </a>
                </div>
                <div className="mt-4 hover:text-primary1 ">
                  <a href="/vote" className=" ">
                    Vote
                  </a>
                </div>
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;

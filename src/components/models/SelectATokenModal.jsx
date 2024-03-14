"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import tokenList1 from "../../lists/tokenList.json";
import tokenList56 from "../../lists/chain56.json";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import Image from "next/image";

const SelectATokenModal = ({
  isOpen,
  setIsOpen,
  tokenOne,
  setTokenOne,
  tokenTwo,
  setTokenTwo,
  tokenOneAmount,
  setTokenOneAmount,
  tokenTwoAmount,
  setTokenTwoAmount,
  changeToken,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const { selectedNetworkId } = useWeb3ModalState();
  const filteredTokenList = tokenList.filter((token) => {
    const tokenName = token.symbol.toLowerCase();
    const tokenAddress = token.address.toLowerCase();
    const search = searchQuery.trim().toLowerCase();
    return tokenName.includes(search) || tokenAddress.includes(search);
  });

  useEffect(() => {
    setTokenOne(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    setTokenTwo(null);
    if (selectedNetworkId == 56) {
      setTokenList(tokenList56);
    } else {
      setTokenList(tokenList1);
    }
  }, [selectedNetworkId]);
  function modifyToken(i) {
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(filteredTokenList[i]);
    } else {
      setTokenTwo(filteredTokenList[i]);
    }
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-10">
        <Dialog.Panel className="flex bg-gray23 rounded-3xl w-full max-w-[32rem] h-[95%] px-7 py-5">
          <div className="flex flex-col w-full">
            <div className="flex mt-4 items-center justify-between">
              <div className="flex-grow text-center">
                <p className="text-2xl font-light">Select a Token</p>
              </div>
              <Image
                alt="close"
                src="/home/cross.svg"
                className="justify-self-end cursor-pointer"
                width={24}
                height={24}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <input
              type="text"
              placeholder="Search name or paste address"
              className="w-full p-2 mt-6 mb-2 border h-14 outline-none rounded-2xl border-gray22 text-neutralLight bg-gray23"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="overflow-y-auto h-full px-2 scrollbar-hidden">
              {filteredTokenList.map((e, i) => {
                return (
                  <Dialog.Description className="mt-4" key={i}>
                    <div
                      className="flex gap-9 items-center justify-between cursor-pointer"
                      onClick={() => modifyToken(i)}
                    >
                      <div className="flex gap-5 items-center">
                        <img
                          src={e.logoURI}
                          alt={e.symbol}
                          width={33}
                          height={33}
                          quality={100}
                        />
                        <div className="flex flex-col">
                          <div className="text-base uppercase font-neue-machina">
                            {e.symbol}
                          </div>
                          <div className="text-sm mt-1 text-neutralLight">
                            {e.name}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-neutralLight">
                        {e.decimals}
                      </div>
                    </div>
                  </Dialog.Description>
                );
              })}
            </div>
            <div className="flex justify-center gap-3 py-2">
              <Image
                alt="manage"
                src="/home/manage.svg"
                width={24}
                height={24}
              />
              <p className="text-primary1">Manage</p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SelectATokenModal;

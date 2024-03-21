"use client";
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import TransactionSuccessModal from "../../models/TransactionSuccessModal";
import SelectATokenModal from "../../models/SelectATokenModal";
import { tokenList1 } from "@/lists/tokenList1";
import {
  useSendTransaction,
  useAccount,
  useConnect,
  useConnectorClient,
} from "wagmi";
import { tokenList56 } from "@/lists/tokenList56";
import SwitchTokenButton from "../swap/SwitchTokenButton";
import SwapBalance from "../swap/SwapBalance";
import PerTokenPrice from "../swap/PerTokenPrice";
import Web3 from "web3";
const ethers = require( "ethers");

import LimitButton from "./LimitButton";
import {
  ChainId,
  Erc20Facade,
  LimitOrderBuilder,
  LimitOrderProtocolFacade,
  LimitOrderPredicateBuilder,
  NonceSeriesV2,
  SeriesNonceManagerFacade,
  SeriesNonceManagerPredicateBuilder,
  Web3ProviderConnector,
} from "@1inch/limit-order-protocol-utils";
import { useClient } from "wagmi";
import { clientToWeb3js, useWeb3jsSigner } from "@/components/web3/useWeb3";
const ethers = require("ethers");

export default function Limit({
  slippage,
  networkId,
  apiUrl,
  tokenOne,
  tokenTwo,
  setTokenOne,
  setTokenTwo,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Enter an amount");
  const [tokenList, setTokenList] = useState([]);
  const [changeToken, setChangeToken] = useState(1);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [successfulTransaction, setSuccessfulTransaction] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const chainId = ChainId.ethereumMainnet;
  const { data: client } = useConnectorClient({ chainId: 1 });

  const [loadingValue, setLoadingValue] = useState(false);

  useEffect(() => {
    setTokenOne(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    setTokenTwo(null);
    if (networkId == 56) {
      setTokenList(tokenList56);
    } else {
      setTokenList(tokenList1);
    }
  }, [networkId]);

  useEffect(() => {
    if (tokenOne && tokenTwo) {
      setLoadingValue(true);
      setButtonLabel("Swap");
      fetchPrices().then(() => setLoadingValue(false));
    }
  }, [tokenOneAmount]);

  const filteredTokenList = tokenList.filter((token) => {
    const tokenName = token.symbol.toLowerCase();
    const tokenAddress = token.address.toLowerCase();
    const search = searchQuery.trim().toLowerCase();

    return tokenName.includes(search) || tokenAddress.includes(search);
  });

  async function changeAmount(e) {
    setTokenOneAmount(e.target.value);
  }
  function checkDisabled(tokenOne, tokenTwo) {
    return tokenOne === null || tokenTwo === null;
  }

  function switchTokens() {
    const amount = tokenTwoAmount;
    setTokenOneAmount(amount);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    if (tokenTwo != null && tokenOne != null) {
      fetchPrices();
    }
  }

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

  async function fetchPrices() {
    if (!tokenOneAmount || tokenOneAmount === null || tokenOneAmount === 0) {
      setTokenTwoAmount(0);
      setButtonLabel("Enter an amount");
      return; // Exit early if tokenOneAmount is invalid
    }

    const tokenOneAmountNum = parseFloat(tokenOneAmount);
    const amount = tokenOneAmountNum * Math.pow(10, tokenOne.decimals);
    const params = {
      sellToken: tokenOne.address,
      buyToken: tokenTwo.address,
      sellAmount: amount,
      slippagePercentage: slippage,
    };

    const headers = {
      "0x-api-key": process.env.NEXT_PUBLIC_0X_API_KEY,
    };

    try {
      const response = await fetch(`${apiUrl}?${qs.stringify(params)}`, {
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch price: ${response.status}`);
      }
      const swapPriceJSON = await response.json();
      setTokenTwoAmount(swapPriceJSON.buyAmount / 10 ** tokenTwo.decimals);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  }

  function limit() {
    const chainId = 1;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const connector = new Web3ProviderConnector(provider);
    const walletAddress = address;
    const contractAddress = "0x7643b8c2457c1f36dc6e3b8f8e112fdf6da7698a";
    const limitOrderBuilder = new LimitOrderBuilder(
      contractAddress,
      chainId,
      connector
    );
    console.log(connector)
    const limitOrder = limitOrderBuilder.buildLimitOrder({
      makerAssetAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      takerAssetAddress: "0x111111111117dc0aa78b770fa6a738034120c302",
      makerAddress: "0xfb3c7ebccccAA12B5A884d612393969Adddddddd",
      makingAmount: "100",
      salt: salt,
      takingAmount: "200",
      // predicate = '0x',
      // permit = '0x',
      // receiver = ZERO_ADDRESS,
      // allowedSender = ZERO_ADDRESS,
      // getMakingAmount = ZERO_ADDRESS,
      // getTakingAmount = ZERO_ADDRESS,
      // preInteraction  = '0x',
      // postInteraction = '0x',
    });
    const limitOrderTypedData =
      limitOrderBuilder.buildLimitOrderTypedData(limitOrder);

    console.log(limitOrderTypedData);

    const limitOrderSignature = limitOrderBuilder.buildOrderSignature(
      walletAddress,
      limitOrderTypedData
    );
    const limitOrderHash =
      limitOrderBuilder.buildLimitOrderHash(limitOrderTypedData);
    console.log(limitOrderHash);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  return (
    <div className="grid place-items-center">
      <SelectATokenModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        tokenOne={tokenOne}
        setTokenOne={setTokenOne}
        tokenTwo={tokenTwo}
        setTokenTwo={setTokenTwo}
        tokenOneAmount={tokenOneAmount}
        setTokenOneAmount={setTokenOneAmount}
        tokenTwoAmount={tokenTwoAmount}
        setTokenTwoAmount={setTokenTwoAmount}
        modifyToken={modifyToken}
        changeToken={changeToken}
      />
      <TransactionSuccessModal
        isOpen={successfulTransaction}
        onClose={() => setSuccessfulTransaction(false)}
      />
      <div className="max-w-[512px] px-3 sm:px-1 flex-col flex items-start">
        <div className="mt-3 flex rounded-2xl flex-col">
          <div className="w-full border flex items-center border-gray22 bg-gray22/75 focus-within:bg-gray24 focus-within:border-gray24 rounded-2xl px-4 py-5">
            <div className="sm:w-full w-[50%] flex flex-col gap-y-1">
              <p className="text-sm font-semibold text-neutralLight">You Pay</p>
              <input
                placeholder="0"
                value={tokenOneAmount || ""}
                onChange={changeAmount}
                disabled={checkDisabled(tokenOne, tokenTwo)}
                className=" w-full text-[34px] caret-gray12  placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none"
              />
              {tokenOne && address ? (
                <SwapBalance address={address} token={tokenOne.address} />
              ) : (
                <span className="text-neutralLight">Balance: 0.0</span>
              )}
            </div>
            {tokenOne ? (
              <div className="flex items-center gap-x-2">
                <p className="text-[#CBFB45] mx-4 font-semibold">Max</p>
                <button
                  className="w-28 flex gap-x-1 items-center justify-between p-3 border border-gray22 rounded-2xl h-[64px] min-w-[136px]"
                  onClick={() => openModal(1)}
                >
                  <img
                    src={tokenOne.logoURI}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={32}
                    height={32}
                    quality={100}
                  />
                  <span className="text-sm font-semibold">
                    {tokenOne.symbol}
                  </span>
                  {chevronDown}
                </button>
              </div>
            ) : (
              <div className="w-[50%] grid " onClick={() => openModal(1)}>
                <button className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit">
                  Select a token
                </button>
              </div>
            )}
          </div>
          <SwitchTokenButton switchTokens={switchTokens} />
          <div className="w-full border mt-2 flex items-center border-gray22 bg-gray22/75 rounded-2xl px-4 py-5">
            <div className="sm:w-full w-[50%] flex flex-col gap-y-1">
              <p className="text-sm font-semibold text-neutralLight">
                You Recieve
              </p>
              {loadingValue ? (
                <DNA
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              ) : (
                <input
                  placeholder="0"
                  value={
                    loadingValue
                      ? "Loading..."
                      : isNaN(tokenTwoAmount)
                      ? "Can't fetch value"
                      : tokenTwoAmount
                      ? tokenTwoAmount?.toFixed(6)
                      : ""
                  }
                  disabled={true}
                  className={`w-full text-[34px] ${
                    tokenTwoAmount === 0 && "text-gray12"
                  } caret-gray12 placeholder-gray12 leading-[42px] border-transparent bg-transparent outline-none`}
                />
              )}
              {tokenTwo && address ? (
                <SwapBalance address={address} token={tokenTwo.address} />
              ) : (
                <span className="text-neutralLight"> Balance: 0.0</span>
              )}
            </div>
            {tokenTwo ? (
              <div className="flex items-center gap-x-2">
                <p className="text-[#11130e] mx-4 font-semibold">Max</p>
                <button
                  className="w-28 flex gap-x-1 items-center justify-between p-3 border border-gray22 rounded-2xl h-[64px] min-w-[136px]"
                  onClick={() => openModal(2)}
                >
                  <img
                    src={tokenTwo.logoURI}
                    alt="assetOneLogo"
                    className="assetLogo"
                    width={32}
                    height={32}
                    quality={100}
                  />
                  <span className="text-sm font-semibold">
                    {tokenTwo.symbol}
                  </span>
                  {chevronDown}
                </button>
              </div>
            ) : (
              <div className="w-[50%] grid " onClick={() => openModal(2)}>
                <button className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit">
                  Select a token
                </button>
              </div>
            )}
          </div>
          {tokenOne && tokenTwo && (
            <div className="bg-gray24 my-2 px-2 py-3 rounded-2xl">
              <PerTokenPrice
                tokenOne={tokenOne}
                tokenTwo={tokenTwo}
                apiUrl={apiUrl}
              />
            </div>
          )}
          <button
            className="w-full bg-primary1 text-black rounded-full py-3"
            onClick={() => limit()}
          >
            Limit
          </button>
          {/* <LimitButton
            tokenOneAmount={tokenOneAmount}
            isLoading={isLoading}
            Limit={limit}
            buttonLabel={buttonLabel}
          /> */}
        </div>
      </div>
    </div>
  );
}

const chevronDown = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 9.99997L12 14L16 9.99997"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

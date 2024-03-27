"use client";
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DNA } from "react-loader-spinner";
import TransactionSuccessModal from "../../models/TransactionSuccessModal";
import SelectATokenModal from "../../models/SelectATokenModal";
import { tokenList1 } from "@/lists/tokenList1";
import {
  useSendTransaction,
  useAccount,
  useConnect,
  useConnectorClient,
  useSignMessage,
  useSignTypedData,
} from "wagmi";
import { tokenList56 } from "@/lists/tokenList56";
import SwitchTokenButton from "../swap/SwitchTokenButton";
import SwapBalance from "../swap/SwapBalance";
import PerTokenPrice from "../swap/PerTokenPrice";
// import Web3 from "web3";
// const ethers=require("ethers");
import { LimitOrder, MakerTraits, Address } from "@1inch/limit-order-sdk";
// import { Wallet } from "ethers";
import { Api, getLimitOrderV4Domain } from "@1inch/limit-order-sdk";
// const { AxiosProviderConnector }=require("@1inch/limit-order-sdk/axios");
import LimitButton from "./LimitButton";
import { useWalletClient } from "wagmi";
import { useVerifyTypedData } from "wagmi";
import { useAppDispatch } from "@/lib/hooks";
import { setOrder } from "@/lib/features/limit/orderSlice";
import LimitExpiry from "./LimitExpiry";

import { Wallet, JsonRpcProvider, Contract } from 'ethers'
import { AxiosProviderConnector } from '@1inch/limit-order-sdk/axios';

export default function Limit({
  slippage,
  networkId,
  apiUrl,
  tokenOne,
  tokenTwo,
  setTokenOne,
  setTokenTwo,
}) {
  const account = useAccount();
  const [selectedOption, setSelectedOption] = useState("1day");
  const { signTypedDataAsync } = useSignTypedData();
  const dispatch = useAppDispatch();
  // const {  data: SignTypedDataData,signTypedData } = useSignTypedData();
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
  // const chainId = ChainId.ethereumMainnet;
  // const { data: client } = useConnectorClient({ chainId: 1 });

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

  const limit = async () => {
    const expiresIn = 120n; // 2m
    const chainId = 1;
    const expiration = BigInt(Math.floor(Date.now() / 1000)) + expiresIn;
    // see MakerTraits.ts
    const makerTraits = MakerTraits.default()
      .withExpiration(expiration)
      .enablePermit2()
      .allowPartialFills() // If you wish to allow partial fills
      .allowMultipleFills(); // And assuming multiple fills are also okay
    const order = new LimitOrder(
      {
        makerAsset: new Address("0x55d398326f99059fF775485246999027B3197955"), //BUSD
        takerAsset: new Address("0x111111111117dc0aa78b770fa6a738034120c302"), //1INCH
        makingAmount: 1_000000n, // 1 USDT
        takingAmount: 1_00000000000000000n, // 10 1INCH
        maker: new Address(address),
        salt: BigInt(Math.floor(Math.random() * 100000000)),
        receiver: new Address(address),
      },
      makerTraits
    );
    dispatch(setOrder(order));
    const domain = getLimitOrderV4Domain(chainId);
    const typedData = order.getTypedData(domain);

    const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; //String(process.env.PRIVATE_KEY)
    const maker = new Wallet(privKey)
    
//  const provider = new JsonRpcProvider("https://eth.meowrpc.com");
//     const makerWallet = maker.connect(provider);


    const converted = {...typedData.domain, chainId: '1'} // convert chainId to string, because ethers wants a bignumberish value
    const signature = await maker.signTypedData(
        converted,
        { Order: typedData.types.Order },
        typedData.message
    )

    // const signature = await signTypedDataAsync({
    //   domain: typedData.domain,
    //   types: {
    //     EIP712Domain: [
    //       { name: "name", type: "string" },
    //       { name: "version", type: "string" },
    //       { name: "chainId", type: "uint256" },
    //       { name: "verifyingContract", type: "address" },
    //     ],
    //     Order: [
    //       { name: "salt", type: "uint256" },
    //       { name: "maker", type: "address" },
    //       { name: "receiver", type: "address" },
    //       { name: "makerAsset", type: "address" },
    //       { name: "takerAsset", type: "address" },
    //       { name: "makingAmount", type: "uint256" },
    //       { name: "takingAmount", type: "uint256" },
    //       { name: "makerTraits", type: "uint256" },
    //     ],
    //   },
    //   primaryType: "Order",
    //   message: typedData.message,
    // });


    const api = new Api({
      networkId: chainId, // ethereum
      authKey: String(process.env.NEXT_PUBLIC_ONE_INCH_API_KEY), // get it at https://portal.1inch.dev/
      httpConnector: new AxiosProviderConnector(),
    });
    console.log("API:", api);
    try {
      // @1inch/limit-order-sdk/dist/api/api.js, must edit the `submitOrder` method to return the promise
      let result = await api.submitOrder(order, signature);
      console.log("result", result);
    } catch (e) {
      console.log(e);
    }
    // const res = await axios.get("/api/limit");
    // console.log(res);
  };

  // ERC20 Token standard ABI for the approve function
const erc20AbiFragment = [
  "function approve(address spender, uint256 amount) external returns (bool)"
];

  const APICall = async () => {

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Use a CORS proxy service
    const apiUrl = 'https://api.1inch.dev/orderbook/v4.0/1/';

    // it is a well-known test private key, do not use it in production
    const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; //String(process.env.PRIVATE_KEY);
    const chainId = 1;

    const maker = new Wallet(privKey)
    const expiresIn = 120n // 2m
    const expiration = BigInt(Math.floor(Date.now() / 1000)) + expiresIn

    const makerAsset = "0x55d398326f99059fF775485246999027B3197955"; // BUSD
    const makingAmount = 1_000000n; // 1 BUSD

    //Orders must call the approve function prior to being submitted
    // Initialize ethers provider
    const provider = new JsonRpcProvider("https://eth.meowrpc.com");
    const makerWallet = maker.connect(provider);

    // Approve the makerAsset contract to spend on behalf of the maker
    const makerAssetContract = new Contract(makerAsset, erc20AbiFragment, makerWallet);
    const domain = getLimitOrderV4Domain(chainId);

    // console.log('Approving makerAsset spend...', domain.verifyingContract, makerAsset);
    // try {
    //     const approveTx = await makerAssetContract.approve(domain.verifyingContract, makingAmount);
    //     await approveTx.wait(); // Wait for the transaction to be mined
    //     console.log('Approval successful');
    // } catch (error) {
    //     console.error('Error in approving makerAsset spend:', error);
    //     return { success: false, reason: "Failed to approve makerAsset spend." };
    // }

    // see MakerTraits.ts
    const makerTraits = MakerTraits.default()
        .withExpiration(expiration)
        .allowPartialFills() // If you wish to allow partial fills
        .allowMultipleFills(); // And assuming multiple fills are also okay

    const order = new LimitOrder({
        makerAsset: new Address('0x55d398326f99059fF775485246999027B3197955'), 
        takerAsset: new Address('0x111111111117dc0aa78b770fa6a738034120c302'), //1INCH
        makingAmount: 1_000000n, // 1 USDT
        takingAmount: 1_00000000000000000n, // 10 1INCH
        maker: new Address(maker.address),
        salt: BigInt(Math.floor(Math.random() * 100000000)),
        receiver: new Address(maker.address),
    }, makerTraits)

    const typedData = order.getTypedData(domain)
    const converted = {...typedData.domain, chainId: '1'} // convert chainId to string, because ethers wants a bignumberish value
    const signature = await maker.signTypedData(
        converted,
        { Order: typedData.types.Order },
        typedData.message
    )

    // const api = new Api({
    //     networkId: chainId, // ethereum
    //     authKey: String(process.env.NEXT_PUBLIC_ONE_INCH_API_KEY), // get it at https://portal.1inch.dev/
    //     httpConnector: new AxiosProviderConnector()
    // });

    const api = new Api({
      networkId: chainId,
      authKey: String(process.env.NEXT_PUBLIC_ONE_INCH_API_KEY),
      httpConnector: new AxiosProviderConnector({ baseUrl: proxyUrl }) // Use the proxy URL as the base URL
  });

    // submit order 
    try {
        // @1inch/limit-order-sdk/dist/api/api.js, must edit the `submitOrder` method to return the promise
        let result = await api.submitOrder(order, signature);
        console.log('result', result);
    } catch (e) {
        console.log(e);
    }
    
    // must wait at least 1.05 seconds after submitting the order to query it
    await new Promise(resolve => setTimeout(resolve, 1050));

    // get order by hash
    // const hash = order.getOrderHash(getLimitOrderV4Domain(chainId))
    // const orderInfo = await api.getOrderByHash(hash);
    // console.log('orderInfo', orderInfo);
}

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

 async function callFunction() {
      // await APICall();
      await limit();
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
          <LimitExpiry
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
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
            onClick={() => callFunction()}
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

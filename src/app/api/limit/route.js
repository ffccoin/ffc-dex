// Import necessary modules
import {
  Address,
  Api,
  LimitOrder,
  MakerTraits,
  getLimitOrderV4Domain,
} from "@1inch/limit-order-sdk";
const ethers = require("ethers");
const axios = require("axios"); // Import axios if not already imported
const { AxiosProviderConnector } = require("@1inch/limit-order-sdk/axios");
import { NextResponse } from "next/server";
const expiresIn = 300n; // 5 minutes in seconds
const chainId = 1;
const expiration = BigInt(Math.floor(Date.now() / 1000)) + expiresIn;
var order = null;
export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  // const makerAsset = searchParams.get("makerAsset");
  // const takerAsset = searchParams.get("takerAsset");
  // const makingAmount = searchParams.get("makingAmount");
  // const takingAmount = searchParams.get("takingAmount");
  const address = searchParams.get("address");
  const makerTraits = MakerTraits.default()
    .withExpiration(expiration)
    .enablePermit2()
    .allowPartialFills()
    .allowMultipleFills();
  order = new LimitOrder(
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
  const limitOrderV4Domain = getLimitOrderV4Domain(chainId);
  console.log("LimitOrderV4Domain", limitOrderV4Domain);
  const hash = order.getOrderHash(limitOrderV4Domain.verifyingContract);
  console.log("hash1", hash);
  const domain = getLimitOrderV4Domain(chainId);
  const typedData = order.getTypedData(domain);
  return NextResponse.json({
    domain: typedData.domain,
    message: typedData.message,
  });
}

// Define your named exports for the handlers
export async function POST(req, res) {
  const res1 = await req.json();
  const signature = res1.signature;
  console.log(signature);
  const limitOrderV4Domain = getLimitOrderV4Domain(chainId);
  console.log("LimitOrderV4Domain", limitOrderV4Domain);
  const hash = order.getOrderHash(limitOrderV4Domain.verifyingContract);
  console.log("hash2", hash);
  const api = new Api({
    networkId: chainId, // ethereum
    authKey: String(process.env.NEXT_PUBLIC_ONE_INCH_API_KEY), // get it at https://portal.1inch.dev/
    httpConnector: new AxiosProviderConnector(),
  });
  // submit order
  try {
    // @1inch/limit-order-sdk/dist/api/api.js, must edit the `submitOrder` method to return the promise
    let result = await api.submitOrder(order, signature).then(() => {
      console.log("done");
    });
    console.log("result", result);
  } catch (e) {
    console.log(e);
  }
  // // wait a 1.05 seconds after submitting the order to query it
  // await new Promise((resolve) => setTimeout(resolve, 1050));
  // const orderInfo = await api.getOrderByHash(hash);
  // console.log("orderInfo", orderInfo);
  return NextResponse.json("done");
}

// export async function POST(req, res) {
//   const ethereumProvider = new ethers.providers.JsonRpcProvider('YOUR_ETHEREUM_NODE_URL');

//   const expiresIn = 300n; // 5m
//   const chainId = 1;
//   const expiration = BigInt(Math.floor(Date.now() / 1000)) + expiresIn;
//   const address = "0x8744bf1060285DA8A0F49dcAb1b319657DB7aECF";
//   const makerTraits = MakerTraits.default()
//     .withExpiration(expiration)
//     .enablePermit2()
//     .allowPartialFills()
//     .allowMultipleFills();
//   var order = new LimitOrder(
//     {
//       makerAsset: new Address("0x55d398326f99059fF775485246999027B3197955"), //BUSD
//       takerAsset: new Address("0x111111111117dc0aa78b770fa6a738034120c302"), //1INCH
//       makingAmount: 1_000000n, // 1 USDT
//       takingAmount: 1_00000000000000000n, // 10 1INCH
//       maker: new Address(address),
//       salt: BigInt(Math.floor(Math.random() * 100000000)),
//       receiver: new Address(address),
//     },
//     makerTraits
//   );

//   const domain = getLimitOrderV4Domain(chainId);
//   const typedData = order.getTypedData(domain);
//   const api = new Api({
//     networkId: chainId, // ethereum
//     authKey: String(process.env.NEXT_PUBLIC_ONE_INCH_API_KEY), // get it at https://portal.1inch.dev/
//     httpConnector: new AxiosProviderConnector(),
//   });

//   // submit order
//   try {
//     // @1inch/limit-order-sdk/dist/api/api.js, must edit the `submitOrder` method to return the promise
//     let result = await api.submitOrder(order, signature).then((result) => {
//       console.log("result", result);
//     });
//   } catch (e) {
//     console.log(e);
//   }
//   // wait a 1.05 seconds after submitting the order to query it
//   // await new Promise((resolve) => setTimeout(resolve, 1050));
//   // const limitOrderV4Domain = getLimitOrderV4Domain(chainId);
//   // console.log("LimitOrderV4Domain", limitOrderV4Domain);
//   // const hash = order.getOrderHash(limitOrderV4Domain.verifyingContract);
//   // console.log("hash", hash);
//   // const orderInfo = await api.getOrderByHash(hash);
//   // console.log("orderInfo", orderInfo);
//   return NextResponse.json("done");

// }

// Define your named exports for the handlers

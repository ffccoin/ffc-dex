// Import necessary modules
import { Address, Api, LimitOrder, MakerTraits, getLimitOrderV4Domain } from "@1inch/limit-order-sdk";
import { NextResponse } from "next/server";
const ethers = require("ethers");
const axios = require("axios"); // Import axios if not already imported
const { AxiosProviderConnector } = require("@1inch/limit-order-sdk/axios");

// Define your named exports for the handlers
export async function getLimitOrder(req, res) {
  const { searchParams } = new URL(req.url);

  const privKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; //String(process.env.PRIVATE_KEY);
  const chainId = 1;
  
  const maker = new ethers.Wallet(privKey);
  const expiresIn = 120n; // 2m
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
    maker: new Address(maker.address),
    salt: BigInt(Math.floor(Math.random() * 100000000)),
    receiver: new Address(maker.address),
  },
  makerTraits
  );
  
  const domain = getLimitOrderV4Domain(chainId);
  const typedData = order.getTypedData(domain);
  const signature = await maker.signTypedData(
  typedData.domain,
  { Order: typedData.types.Order },
  typedData.message
  );
  
  const api = new Api({
  networkId: chainId, // ethereum
  authKey: String(process.env.NEXT_PUBLIC_ONE_INCH_API_KEY), // get it at https://portal.1inch.dev/
  httpConnector: new AxiosProviderConnector(),
  });
  // submit order
  try {
  // @1inch/limit-order-sdk/dist/api/api.js, must edit the `submitOrder` method to return the promise
  let result = await api.submitOrder(order, signature);
  console.log("result", result);
  } catch (e) {
  console.log(e);
  }
  // wait a 1.05 seconds after submitting the order to query it
  await new Promise((resolve) => setTimeout(resolve, 1050));
  
  // get order by hash
  const limitOrderV4Domain = getLimitOrderV4Domain(chainId);
  console.log("LimitOrderV4Domain", limitOrderV4Domain);
  const hash = order.getOrderHash(limitOrderV4Domain.chainId);
  console.log("hash", hash);
  const orderInfo = await api.getOrderByHash(hash);
  console.log("orderInfo", orderInfo);
  return NextResponse.json("done");
  
}
export { getLimitOrder as GET };


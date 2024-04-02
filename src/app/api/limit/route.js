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
const expiresIn = 100000000n; // 1666666 mins
const chainId = 1;
const expiration = BigInt(Math.floor(Date.now() / 1000)) + expiresIn;
var order = null;
var makerTraitsGlobal = null;
export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  // const makerAsset = searchParams.get("makerAsset");
  // const takerAsset = searchParams.get("takerAsset");
  // const makingAmount = searchParams.get("makingAmount");
  // const takingAmount = searchParams.get("takingAmount");
  const address = searchParams.get("address");
  console.log("Address in get = ", address);
  const makerTraits = MakerTraits.default()
    .withExpiration(expiration)
    .enablePermit2()
    .allowPartialFills()
    .allowMultipleFills();
  console.log("Maker Traits in get = ", makerTraits);
  makerTraitsGlobal = makerTraits;
  order = new LimitOrder(
    {
      makerAsset: new Address("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"), //BUSD
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
  // console.log("LimitOrderV4Domain", limitOrderV4Domain);
  // const hash = order.getOrderHash(limitOrderV4Domain.verifyingContract);
  // console.log("hash1", hash);
  const domain = getLimitOrderV4Domain(chainId);
  const typedData = order.getTypedData(domain);
  // console.log(typedData.domain)
  return NextResponse.json({
    domain: typedData.domain,
    message: typedData.message,
  });
}

// Define your named exports for the handlers
export async function POST(req, res) {
  const res1 = await req.json();
  const signature = res1.signature;
  console.log("Signature in post = ", signature);
  const limitOrderV4Domain = getLimitOrderV4Domain(chainId);
  console.log(
    "LimitOrderV4Domain in post = ",
    limitOrderV4Domain.verifyingContract
  );
  const hash = order.getOrderHash(limitOrderV4Domain.verifyingContract);
  console.log("hash in post", hash);
  const api = new Api({
    networkId: chainId, // ethereum
    authKey: String(process.env.NEXT_PUBLIC_ONE_INCH_API_KEY), // get it at https://portal.1inch.dev/
    httpConnector: new AxiosProviderConnector(),
  });
  // submit order
  // const result = await api.submitOrder(order, signature);

  // make a post request to submit order on https://api.1inch.dev/orderbook/v4.0/1
  const result = await axios.post("https://api.1inch.dev/orderbook/v4.0/1", {
    orderHash: hash,
    signature: signature,
    data: {
      makerAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      takerAsset: "0x111111111117dc0aa78b770fa6a738034120c302",
      maker: "0xfDA94c106913bB8a90ea3109944C083d991398e7",
      receiver: "0x0000000000000000000000000000000000000000",
      makingAmount: "100000",
      takingAmount: "100000000000000000",
      salt: "113397207885514340890390803446598239649986846239753457288039162889190521395695",
      extension: "0x",
      makerTraits: "29400335157912315244266070412362164103369334234598117288525914786373920882688",
    },
    headers: {
      "Authorization": "Bearer YWhnQLVh62MTNAcRWm19QrAyrTIC7qan"
    },
  },
  );

  console.log("Result = ", result);
  // try {
  //   // @1inch/limit-order-sdk/dist/api/api.js, must edit the submitOrder method to return the promise
  //   // Check if the result is defined and respond accordingly
  //   if (result) {
  //     console.log("Order submitted = ", result);
  //     return NextResponse.json(result);
  //   } else {
  //     throw new Error("The API call did not return a result.");
  //   }
  // } catch (error) {
  //   console.error("Error submitting order:", error.message);
  //   return NextResponse.json({ error: error.message });
  // }
  // // wait a 1.05 seconds after submitting the order to query it
  await new Promise((resolve) => setTimeout(resolve, 1050));
  const orderInfo = await api.getOrderByHash(hash);
  console.log("orderInfo", orderInfo);
  return NextResponse.json("done");
}
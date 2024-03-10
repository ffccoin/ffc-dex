// Import necessary modules
import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function getSwapData(req, res) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const dst = searchParams.get("dst");
  const amount = searchParams.get("amount");
  const from = searchParams.get("from");
  const slippage = searchParams.get("slippage");

  const url = "https://api.1inch.dev/swap/v6.0/1/swap";
  const config = {
    headers: {
      Authorization: "Bearer JJdEhrKq5Co25lD2iYcnLA6jKjl4BaDQ",
    },
    params: {
      src: src,
      dst: dst,
      amount: amount,
      from: from,
      slippage: "1",
    },
  };

  try {
    const response = await axios.get(url, config);
    console.log(response.data);
    return NextResponse.json({ message: "helo", data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error });
  }

  // const { query } = await req;
  // console.log(src);

  // try {
  //   const responseOne = await Moralis.EvmApi.token.getTokenPrice({
  //     address: addressOne,
  //   });

  //   const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
  //     address: addressTwo,
  //   });

  //   const usdPrices = {
  //     tokenOne: responseOne.raw.usdPrice,
  //     tokenTwo: responseTwo.raw.usdPrice,
  //     ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
  //   };
  //   console.log(usdPrices);
  //   return NextResponse.json(usdPrices);
  // } catch (error) {
  //   console.error("Error:", error);
  //   return NextResponse.json({ message: "nope" });
  // }
}

// Export the named handlers for the HTTP methods
export { getSwapData as GET };

// const url = "https://api.1inch.dev/swap/v6.0/1/swap";

//     let tokenOneAmountNum = parseFloat(tokenOneAmount);
//     let amount = tokenOneAmountNum * Math.pow(10, tokenOne.decimals);
//     const config = {
//       headers: {
//         Authorization: "Bearer JJdEhrKq5Co25lD2iYcnLA6jKjl4BaDQ",
//       },
//       params: {
//         src: tokenOne.address,
//         dst: tokenTwo.address,
//         amount: amount,
//         from: address,
//         slippage: selectedSlippage,
//       },
//     };

//     try {
//       const response = await axios.get(url, config);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }

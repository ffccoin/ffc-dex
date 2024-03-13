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
  const selectedNetworkId = searchParams.get("selectedNetworkId");


  const url = `https://api.1inch.dev/swap/v6.0/${selectedNetworkId}/swap`;
  const config = {
    headers: {
      Authorization: "Bearer YWhnQLVh62MTNAcRWm19QrAyrTIC7qan",
    },
    params: {
      "src": src,
      "dst": dst,
      "amount": amount,
      "from": from,
      "slippage": "0"
    },
  };

  try {
    const response = await axios.get(url, config);
    console.log(response.data);
    return NextResponse.json( response.data.tx );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error });
  }
}
export { getSwapData as GET };


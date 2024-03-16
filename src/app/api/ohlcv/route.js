

import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function getOhlcv(req, res) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const dst = searchParams.get("dst");
  const amount = searchParams.get("amount");

  const url = `https://api.1inch.dev/swap/v6.0/${selectedNetworkId}/swap`;
 

  try {
    const response = await axios.get(url);
    console.log(response.data);
    return NextResponse.json( response.data.tx );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error });
  }
};

export { getOhlcv as GET };


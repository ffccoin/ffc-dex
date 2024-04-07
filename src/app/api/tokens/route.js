// Import necessary modules
import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function getTokenData(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY;
  const baseUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
  const headers = {
    "X-CMC_PRO_API_KEY": apiKey,
  };
  const response = await axios.get(baseUrl, { headers });
  const data = response.data;
  return NextResponse.json(data.data);
}
export { getTokenData as GET };

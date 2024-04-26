// Import necessary modules
import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function POST(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY;
  const coin = "BTC"; // Replace with the token symbol you want to fetch
  const timeStart = "2023-01-01"; // Start date for historical data
  const timeEnd = "2023-01-02"; // End date for historical data
  const params = await req.json();
  const id = params.id;
    console.log(id)
const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?id=${id}&count=30&interval=1h`;
  const headers = {
    "X-CMC_PRO_API_KEY": apiKey,
  };

  try {
    const response = await axios.get(url, { headers });
    const data = response.data;
    console.log(response);
    return NextResponse.json(data);
  } catch (err) {
    console.log(err)
    return NextResponse.json(err);
  }
}

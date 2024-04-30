// Import necessary modules
import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function getTokenData(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY;
  const baseUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100`;
  const headers = {
    "X-CMC_PRO_API_KEY": apiKey,
  };
  try {
    const response = await axios.get(baseUrl, { headers });
    const data = response.data.data;
    const detailedTokenData = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
      {
        params: {
          id: data.map((token) => token.id).join(","), // Comma-separated list of token IDs
        },
        headers,
      }
    );

    const detailedDataMap = detailedTokenData.data.data;

    // Append logo URLs to existing data
    const updatedData = data.map((token) => ({
      ...token,
      logoUrl: detailedDataMap[token.id]?.logo,
    }));
    return NextResponse.json(updatedData);
  } catch (err) {
    return NextResponse.json(err);
  }
}
export { getTokenData as GET };

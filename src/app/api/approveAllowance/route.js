// Import necessary modules
import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported


// Define your named exports for the handlers
export async function getSwapData(req, res) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const selectedNetworkId = searchParams.get("selectedNetworkId");
  const url = `https://api.1inch.dev/swap/v6.0/${selectedNetworkId}/approve/transaction`;
  const config = {
    headers: {
      Authorization: "Bearer JJdEhrKq5Co25lD2iYcnLA6jKjl4BaDQ",
    },
    params: {
        "tokenAddress": src,
      },
  };

  try {
    const response = await axios.get(url, config);
    return NextResponse.json(response.data );
  } catch (error) {
    return NextResponse.json({ message:error });
  }
}
export { getSwapData as GET };

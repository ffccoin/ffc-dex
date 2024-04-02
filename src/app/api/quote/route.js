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
  const url = "https://api.1inch.dev/swap/v6.0/1/quote";

  const config = {
    headers: {
      Authorization: "Bearer JJdEhrKq5Co25lD2iYcnLA6jKjl4BaDQ",
    },
    params: {
      src: src,
      dst: dst,
      amount: amount,
    },
  };

  try {
    const response = await axios.get(url, config);
    return NextResponse.json({ message: "helo", data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "nope" });
  }
}
export { getSwapData as GET };

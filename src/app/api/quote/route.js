// Import necessary modules
import Moralis from "moralis";
import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

await Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjljMzlkZGI5LTk1M2MtNDc0Yy04MGEwLWRlYTViNjU2OTk2NCIsIm9yZ0lkIjoiMzgxMjUyIiwidXNlcklkIjoiMzkxNzQ4IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiI1Yzk4ZWIyMi0xNTFlLTRiY2QtODhmMS1hNGEyOGU3NmFjMjEiLCJpYXQiOjE3MDk1ODE3NzgsImV4cCI6NDg2NTM0MTc3OH0.gb_9H1GEkW2TbaDl3SoYa6By7K4GdsOeYF09100aEYs",
});

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
    console.log(response.data);
    return NextResponse.json({ message: "helo", data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "nope" });
  }
}
export { getSwapData as GET };

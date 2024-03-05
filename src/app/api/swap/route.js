// Import necessary modules
import Moralis from "moralis";
import { NextResponse } from "next/server";

await Moralis.start({ apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjljMzlkZGI5LTk1M2MtNDc0Yy04MGEwLWRlYTViNjU2OTk2NCIsIm9yZ0lkIjoiMzgxMjUyIiwidXNlcklkIjoiMzkxNzQ4IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiI1Yzk4ZWIyMi0xNTFlLTRiY2QtODhmMS1hNGEyOGU3NmFjMjEiLCJpYXQiOjE3MDk1ODE3NzgsImV4cCI6NDg2NTM0MTc3OH0.gb_9H1GEkW2TbaDl3SoYa6By7K4GdsOeYF09100aEYs" });


// Define your named exports for the handlers
export async function getSwapData(req, res) {
   
    const { searchParams } = new URL(req.url);
    const addressOne = searchParams.get('addressOne');
  const addressTwo = searchParams.get('addressTwo');


  const { query } =await req;
//   console.log(req);
  try {
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
      address: addressOne,
    });

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address:addressTwo,
    });

    const usdPrices = {
      tokenOne: responseOne.raw.usdPrice,
      tokenTwo: responseTwo.raw.usdPrice,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };
    console.log(usdPrices)
    return NextResponse.json(usdPrices);
  }catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "nope" });
  }
}

// Export the named handlers for the HTTP methods
export { getSwapData as GET };

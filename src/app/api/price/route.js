import { NextResponse } from "next/server";
import qs from "qs";

export async function getPriceData(req, res) {
  const { searchParams } = new URL(req.url);
  const query = qs.stringify(req.query);
  try {
    const response = await fetch(`https://api.0x.org/swap/v1/price?${query}`, {
      headers: {
        "0x-api-key": "9a827917-91ba-4739-87f9-23451d511ea6", // process.env.NEXT_PUBLIC_0X_API_KEY,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error });
  }
}

export { getPriceData as GET };

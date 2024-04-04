import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const params = await req.json();
  const signature = params.signature;
  const orderHash = params.orderHash;
  const order = params.order;
  const networkId=params.networkId;

  console.log("order hash", orderHash);
  console.log("signature", signature);

  console.log("order", order);
  const result = await axios.post(
    `https://limit-orders.1inch.io/v4.0/${networkId}`, // post to this for now.
    // "https://api.1inch.dev/orderbook/v4.0/1",
    {
      orderHash: orderHash,
      signature: signature,
      data: order,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONE_INCH_API_KEY}`,
      },
    }
  );
  console.log("RESULT:::", result);
  return NextResponse.json(result.data);
}

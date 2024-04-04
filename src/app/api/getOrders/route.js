import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const params = await req.json();
  const address = params.address;
  console.log("address ",address );
  const url =
    `https://api.1inch.dev/orderbook/v4.0/1/address/${address}`;

  const config = {
    headers: {
      Authorization: "Bearer JJdEhrKq5Co25lD2iYcnLA6jKjl4BaDQ",
    },
    params: {
      "limit": 60,
      "statuses": "1,2,3",
      "sortBy": "createDateTime"
    },
  };
  try {
    const response = await axios.get(url, config);
    console.log("RESULT:::", response);
    return NextResponse.json(response.data);
  } catch(err) {
    console.log(err)
    return NextResponse.json(err);

  }

}

import axios from "axios";

export async function POST(req, res) {
  const params = await req.json();
  console.log("RES:::", params);
  const signature = params.signature;
  const address = params.address;
  const salt = params.salt;
  const orderHash = params.orderHash;
  const makerTraits = params.makerTraits;

  console.log("order hash", orderHash);

  const result = await axios.post(
    "https://api.1inch.dev/orderbook/v4.0/1",
    {
      orderHash:
        "0x7f8641eba20826d879ef931047918cd7fe684dc8e1f2d9f3cb03221d6e4c3572",
      signature: signature,
      data: {
        makerAsset: "0x55d398326f99059fF775485246999027B3197955",
        takerAsset: "0x111111111117dc0aa78b770fa6a738034120c302",
        maker: address,
        receiver: address,
        makingAmount: "100000",
        takingAmount: "100000000000000000",
        salt: salt,
        extension: "0x",
        makerTraits: makerTraits,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONE_INCH_API_KEY}`,
      },
    }
  );
}

import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function getOhlcv(req, res) {
  // const { searchParams } = new URL(req.url);
  // const src = searchParams.get("src");
  // const dst = searchParams.get("dst");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-API-KEY", "BQY63fpUCtaKamOy6vrv3cwMISFbOABY");
myHeaders.append("Authorization", "Bearer ory_at_U3Cn05wO9X7qO1j2KsNbHcM19hUjFZDz2Zsip-fHhwY.IKVq8VeZAP5TiX1Yg2DTI_kbnlxYaWh3BF4j2dMAV-c");


 
const raw = JSON.stringify({
  "query": "query MyQuery {\n    EVM(dataset: archive) {\n      DEXTradeByTokens(\n        orderBy: {descending: Block_Date}\n        where: {Trade: {Currency: {SmartContract: {is: \"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\"}},\n          Side: {Currency: {SmartContract: {is: \"0xdac17f958d2ee523a2206206994597c13d831ec7\"}}},\n          Dex: {SmartContract: {is: \"0x4e68ccd3e89f51c3074ca5072bbac773960dfa36\"}}}}\n        limit: {count: 50}\n      ) {\n        Block {\n          Date(interval: {in: days, count: 1})\n        }\n        volume: sum(of: Trade_Amount)\n        Trade {\n          high: Price(maximum: Trade_Price)\n          low: Price(minimum: Trade_Price)\n          open: Price(minimum: Block_Number)\n          close: Price(maximum: Block_Number)\n        }\n      }\n    }\n  }",
  "variables": "{}"
});
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://streaming.bitquery.io/graphql",
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message });
  }
}

export { getOhlcv as GET };

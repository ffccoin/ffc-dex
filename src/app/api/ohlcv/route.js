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
  myHeaders.append(
    "Authorization",
    "Bearer ory_at_mlklmU3-6EvbOHqkVtBj-A8qMfwcsfTvLFyr_4OAWmA.lLnd0PAwDGgMIEeNf2GhB3zfxc1acs7GI2Uz1iBFTBM"
  );
  // const raw = JSON.stringify({
  //   query:
  //     'query MyQuery {\n  EVM(dataset: archive) {\n    DEXTradeByTokens(\n      orderBy: {descending: Block_Date}\n      where: {Trade: {Side: {Currency: {SmartContract: {is: "0xdac17f958d2ee523a2206206994597c13d831ec7"}}}, Currency: {SmartContract: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}}}}\n      limit: {count: 400 }\n    ) {\n      Block {\n        Date(interval: {in: years, count: 1})\n      }\n      volume: sum(of: Trade_Amount)\n      count\n      Trade {\n        high: Price(maximum: Trade_Price)\n        low: Price(minimum: Trade_Price)\n        open: Price(minimum: Block_Number)\n        close: Price(maximum: Block_Number)\n        Currency {\n          Name(selectWhere: {})\n        }\n        Dex {\n          ProtocolName\n          SmartContract\n        }\n        Side {\n          Currency {\n            Name\n            SmartContract\n          }\n        }\n      }\n    }\n  }\n}\n',
  //   variables: "{}",
  // });
  // const raw = JSON.stringify({
  //   query:
  //     'query MyQuery {\n  EVM(dataset: archive) {\n    DEXTradeByTokens(\n      orderBy: {ascending: Block_Date}\n      where: {Trade: {Side: {Currency: {SmartContract: {is: "0xdac17f958d2ee523a2206206994597c13d831ec7"}}}, Currency: {SmartContract: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}}}, Block: {Date: {after: "2023-01-01", before: "2020-2-1"}}}\n      limit: {count:500}\n    ) {\n      Block {\n        Date(interval: {in: months, count:1})\n      }\n      volume: sum(of: Trade_Amount)\n      count\n      Trade {\n        high: Price(maximum: Trade_Price)\n        low: Price(minimum: Trade_Price)\n        open: Price(minimum: Block_Number)\n        close: Price(maximum: Block_Number)\n        Currency {\n          Name(selectWhere: {})\n        }\n        Dex {\n          ProtocolName\n          SmartContract\n        }\n        Side {\n          Currency {\n            Name\n            SmartContract\n          }\n        }\n      }\n    }\n  }\n}\n',
  //   variables: "{}",
  // });

  const raw = JSON.stringify({
    "query": "query MyQuery {\n  EVM(dataset: archive) {\n    DEXTradeByTokens(\n      orderBy: {}\n      where: {Trade: {Side: {Currency: {SmartContract: {is: \"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\"}}}, Currency: {SmartContract: {is: \"0xdac17f958d2ee523a2206206994597c13d831ec7\"}}}, Block: {Date: {after: \"2022-01-01\", before: \"2024-12-31\"}}}\n      limit: {count:80}\n    ) {\n      Block {\n        Date(interval: {in: months, count: 1})\n      }\n      volume: sum(of: Trade_Amount)\n      count\n      Trade {\n        high: Price(maximum: Trade_Price)\n        low: Price(minimum: Trade_Price)\n        open: Price(minimum: Block_Number)\n        close: Price(maximum: Block_Number)\n        Currency {\n          Name(selectWhere: {})\n        }\n        Dex {\n          ProtocolName\n          SmartContract\n        }\n        Side {\n          Currency {\n            Name\n            SmartContract\n          }\n        }\n      }\n    }\n  }\n}\n",
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

import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function getOhlcv(req, res) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const dst = searchParams.get("dst");
  console.log(src);
  console.log(dst);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-API-KEY", "BQY63fpUCtaKamOy6vrv3cwMISFbOABY");
  myHeaders.append(
    "Authorization",
    
    "Bearer ory_at_0KvdmVYNO9uUtT8lX7Sxit6rUBcYTMBHaM3ofiaRKKk.6fr72IvXCSNfF6ewXqc1Ke70Bg1SlR3WZXohAockkvY	"
  );

  // const raw = JSON.stringify({
  //   query:
  //     '{\n  EVM(dataset: realtime) {\n    DEXTradeByTokens(\n      orderBy: {ascendingByField: "Block_Time"}\n      where: {Trade: {Side: {Currency: {SmartContract: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}}}, Currency: {SmartContract: {is: "0xdac17f958d2ee523a2206206994597c13d831ec7"}}}}\n    ) {\n      Block {\n        Time(interval: {in: minutes, count: 10})\n        lastTradeTime: Time(maximum: Block_Time)\n        FirstTradeTime: Time(minimum: Block_Time)\n        LastTradeBlock: Number(maximum: Block_Number)\n        FirstTradeBlock: Number(minimum: Block_Number)\n      }\n      volume: sum(of: Trade_Amount)\n      Trade {\n        Buyer\n        Amount\n        Currency {\n          Name\n          Symbol\n        }\n        Dex {\n          Pair {\n            SmartContract\n          }\n          OwnerAddress\n          ProtocolName\n          SmartContract\n        }\n        Seller\n        Price\n        Sender\n        Side {\n          Currency {\n            Name\n            Symbol\n          }\n          Amount\n        }\n        high: Price(maximum: Trade_Price)\n        low: Price(minimum: Trade_Price)\n        open: Price(minimum: Block_Number)\n        close: Price(maximum: Block_Number)\n      }\n      count\n    }\n  }\n}\n',
  //   variables: "{}",
  // });
  const raw = JSON.stringify({
    "query": `query MyQuery {\n    EVM(dataset: archive) {\n      DEXTradeByTokens(\n        orderBy: {descending: Block_Date}\n        where: {Trade: {Currency: {SmartContract: {is:  "${src}"}},\n          Side: {Currency: {SmartContract: {is:"${dst}"}}}}}\n        limit: {count: 50}\n      ) {\n        Block {\n          Date(interval: {in: days, count: 1})\n        }\n        volume: sum(of: Trade_Amount)\n        Trade {\n          high: Price(maximum: Trade_Price)\n          low: Price(minimum: Trade_Price)\n          open: Price(minimum: Block_Number)\n          close: Price(maximum: Block_Number)\n        }\n      }\n    }\n  }`,
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
    console.log(result.data.EVM.DEXTradeByTokens);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message });
  }
}

export { getOhlcv as GET };

// const raw = JSON.stringify({
//   "query": "query MyQuery {\n  EVM(dataset: archive) {\n    DEXTradeByTokens(\n      orderBy: { descendingByField: \"Block_Time\"}\n      where: {Trade: {Currency: {SmartContract: {is: \"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\"}}, Side: {Currency: {SmartContract: {is: \"0xdac17f958d2ee523a2206206994597c13d831ec7\"}}}, Dex: {SmartContract: {is: \"0x4e68ccd3e89f51c3074ca5072bbac773960dfa36\"}}}}\n      limit: {count: 50}\n    ) {\n      volume: sum(of: Trade_Amount)\n      Trade {\n        high: Price(maximum: Trade_Price)\n        low: Price(minimum: Trade_Price)\n        open: Price(minimum: Block_Number)\n        close: Price(maximum: Block_Number)\n      }\n      Block {\n        Time(interval: {count: 10, in: hours})\n      }\n    }\n  }\n}\n",
//   "variables": "{}"
// });

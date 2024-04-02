import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported

// Define your named exports for the handlers
export async function getOhlcv(req, res) {
  const { searchParams } = new URL(req.url);
  const fsym = searchParams.get("src");
  const tsym = searchParams.get("dst");
  let timeperiod= searchParams.get("timeperiod");
  let limit = "50";
  if (timeperiod=="1d"){
    limit = "60";
    timeperiod="histoday"
  }else if(timeperiod=="1h"){
    timeperiod="histohour"
  }else if(timeperiod=="4h"){
    timeperiod="histohour"
    limit="70"
  }else if(timeperiod=="5m"){
    timeperiod="histominute"
  }else if(timeperiod=="1w"){
    timeperiod="histoday"
    limit = "85";
  }else {
    timeperiod="histominute"
    limit = "60";

  }
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() - 1);
  const timestamp = Math.floor(currentTime.getTime() / 1000);

  const apiKey =
    "dc57ff1b96d417fbd89096d05a3ca50db3a2fb2638a4b4bf33cb33603e614007";
    const apiUrl = `https://min-api.cryptocompare.com/data/v2/${timeperiod}?fsym=${fsym}&tsym=${tsym}&limit=${limit}&aggregate=1&aggregatePredictableTimePeriods=false&&api_key=${apiKey}`;
    try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message });
  }
}

export { getOhlcv as GET };

"use client";

import dynamic from "next/dynamic";
import axios from "axios";
import { useState, useEffect } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TokenDetailsPage = ({ tokenId }) => {
  const [series, setSeries] = useState([]);
  const [coin, setCoin] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    console.log("symbol", tokenId);
    const response = await axios.post("/api/tokenHistory", {
      id: tokenId,
    });
    console.log("response", response.data);
    setCoin(response.data.data);
    const processedData = response.data.data.quotes.map((quote) => {
      return {
        x: new Date(quote.timestamp),
        y: quote.quote.USD.price,
      };
    });
    setSeries([{ name: "Token Price", data: processedData }]);
  }
  const options = {
    chart: {
      height: 250,
      width: "100%",
      type: "area",
      foreColor: "#ccc", // Setting the color for text and grid lines
      background: "transparent", // Setting the background color
      toolbar: {
        tools: {
          download: false,
          reset: false,
          pan: false,
          zoom: false,
        },
      },
    },
    colors: ["#CBFB45"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(1); // Adjust the number of decimal places as needed
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

      type: "datetime",
      labels: {
        style: {
          colors: "#ccc", // Setting the color for x-axis labels
        },
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: "dark", // Setting tooltip theme to dark
      x: {
        format: "dd/MM/yy",
      },
      shared: false,
      intersect: false,
    },
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl font-medium text-white px-5 pb-10">
        {coin?.name}{" "}
        <span className="font-semibold text-gray-400">{coin?.symbol}</span>
      </h1>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={450}
        width={"100%"}
      />
    </div>
  );
};

export default TokenDetailsPage;

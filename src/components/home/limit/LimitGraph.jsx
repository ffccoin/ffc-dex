"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
export default function LimitGraph({ tokenOne, tokenTwo }) {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: "candlestick",
        height: 290,
      },
      title: {
        text: "Trading Data",
        align: "left",
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        enabled: true,
        hideEmptySeries: true,
        theme: false,
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        fixed: {
          enabled: false,
          position: "topRight",
          offsetX: 0,
          offsetY: 0,
        },
        x: {
          show: true,
          format: "dd MMM",
          formatter: undefined,
        },
        y: {
          show: true,
          formatter: function (val) {
            return val.toFixed(6); // Adjust the number of decimal places as needed
          },
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(6); // Adjust the number of decimal places as needed
          },
        },
      },
    },
  });

  const fetchData = async () => {
    console.log("jjo");
    try {
      const response = await axios.get(`/api/ohlcv`);
      // , {
      //   params: {
      //     src: tokenOne.address,
      //     dst: tokenTwo.address,
      //   }});
      const data = response.data.data.EVM.DEXTradeByTokens;
      console.log(response.data.data.EVM.DEXTradeByTokens);
      const firstItem = data[0];
      const firstDate = new Date(firstItem.Block.Date);
      data.forEach((item) => {
        console.log(item.Block.Date);
      });
      console.log("Date of the first item:", new Date(firstDate));

      const seriesData = data.map((item) => ({
        x: new Date(item.Block.Date).getTime(),
        y: [
          parseFloat(item.Trade.open),
          parseFloat(item.Trade.high),
          parseFloat(item.Trade.low),
          parseFloat(item.Trade.close),
        ],
      }));

      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [{ data: seriesData }],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div
        id="chart"
        className="bg-gray22/50 z-50  rounded-2xl max-h-[400px] h-full "
      >
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          height={380}
          width={840}
        />
      </div>
      <button
        onClick={() => fetchData()}
        className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit"
      >
        genrate graph
      </button>
    </div>
  );
}

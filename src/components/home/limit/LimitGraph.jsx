"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
export default function LimitGraph() {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: "candlestick",
        height:350,
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
      yaxis: {
        tooltip: {
          enabled: true,
        },
        labels: {
          formatter: function(val) {
            return val.toFixed(6); // Adjust the number of decimal places as needed
          }
        }
      
      },
      
    },
  });



    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/ohlcv`);
        const data = response.data.data.EVM.DEXTradeByTokens   
        console.log(response.data.data.EVM.DEXTradeByTokens)
        const firstItem = data[0];
        const firstDate = new Date(firstItem.Block.Date);
        console.log("Date of the first item:", new Date(firstDate));

        const seriesData = data.map((item) => ({
          x: new Date(item.Block.Date).getTime(),
          y: [parseFloat(item.Trade.open), parseFloat(item.Trade.high), parseFloat(item.Trade.low), parseFloat(item.Trade.close)],
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
      <button  onClick ={()=>fetchData()} className="bg-primary1 text-sm justify-self-end text-black rounded-full px-4 py-2 min-w-fit">
                  Select a token
                </button>
      <div id="chart">
        
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          height={380}
          width={1040}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

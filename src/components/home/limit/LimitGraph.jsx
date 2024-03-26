"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import LimitTime from "./LimitTime";
import { InfinitySpin } from "react-loader-spinner";


const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
export default function LimitGraph({ tokenOne, tokenTwo }) {
  const [selectedOption, setSelectedOption] = useState("1h");
  const [tokenNotSelected, setTokenNotSelected] = useState(true);
  const [loadingValue, setLoadingValue] = useState(false);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#20C188",
            downward: "#EF403C",
          },
          wick: {
            useFillColor: true,
          },
        },
      },

      chart: {
        toolbar: {
          show: false,
        },
        type: "candlestick",
        height: 380,
        width: "100%",
      },
      title: {
        text: "",
        align: "left",
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: true,
          color: "#6A84A0",
          height: 1,
          width: "100%",
          offsetX: 0,
          offsetY: 0,
        },
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: [0, 3],
        shared: false,
        intersect: true,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: false,
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: true,
          format: "dd MMM",
          formatter: undefined,
        },
        y: {
          formatter: function (val, opts) {
            const seriesData = chartDataRef.current.series;
            if (seriesData && seriesData.length > 0) {
              const index = opts.dataPointIndex;
              const seriesIndex = opts.seriesIndex;
              const data = seriesData[seriesIndex].data[index];
              const open = data.y[0];
              const close = data.y[3];
              return `<span style="color: #EF403C;">&#11044;</span> Open:${open.toFixed(
                6
              )}<br> <span style="color: #20C188;">&#11044;</span> Close:  ${close.toFixed(
                6
              )}`;
            }
          },
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
        items: {
          display: "flex",
        },
        fixed: {
          enabled: false,
          position: "topRight",
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(6); // Adjust the number of decimal places as needed
          },
        },
        axisBorder: {
          show: true,
          color: "#78909C",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "#78909C",
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  });
  useEffect(() => {
    fetchData();
  }, [tokenOne, tokenTwo]);
  const fetchData = async () => {
    if (tokenOne && tokenTwo) {
      setLoadingValue(true);
      try {
        const response = await axios.get(`/api/ohlcv`, {
          params: {
            src: tokenOne.address,
            dst: tokenTwo.address,
          },
        });
        const data = response.data.data.EVM.DEXTradeByTokens;
        if (data.length === 0) {
          setLoadingValue(false)
          setTokenNotSelected(true); // Set tokenNotSelected to true if data is empty
        } else {
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
        setLoadingValue(false)
        setTokenNotSelected(false);
      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const chartDataRef = useRef(chartData);
  useEffect(() => {
    chartDataRef.current = chartData;
  }, [chartData]);

  return (
    <div>
      <div
        id="chart"
        className="bg-gray22/50 z-50 rounded-2xl  h-[450px] mx-4 l py-4 "
      >
        {tokenNotSelected ? (
          <div className="bg-[url('/home/graph.svg')] bg-center w-full h-full bg-no-repeat justify-center flex items-center text-gray-600 text-center">
             {loadingValue ? (
                <InfinitySpin
                visible={true}
                width="250"
                color="#CBFB45"
                ariaLabel="infinity-spin-loading"
                />
              ):<>
              <p>Token Not selected</p></>}</div>
          ) : (
          <>
            <LimitTime
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="candlestick"
              width={"100%"}
              height={380}
            />
          </>
        )}
      </div>
    </div>
  );
}

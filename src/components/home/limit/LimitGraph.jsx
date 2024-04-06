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
  const [opt, setOpt] = useState("5m");
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      annotations: {
        yaxis: [
          {
            y: 6.4200,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#000',
                background: '#00E396',  
                textAlign: 'center'              
              },
              text: '$0.0000000000'
            }
          }
        ]
      },
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
        zoom: {
          enabled: false,
        },
        type: "candlestick",
        height: 380,
        width: "90%",
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
        labels: {
          formatter: function (value, timestamp) {
            const date = new Date(timestamp);
            // Determine the format based on the selected option
            let formatOptions = {};
            if (
              selectedOptionRef.current === "5m" ||
              selectedOptionRef.current === "15m"
            ) {
              // If the selected option is 1d or 1w, format to display only the date
              formatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              };
            } else {
              // If the selected option is not 1d or 1w, format to display date and time
              formatOptions = {
                month: "short",
                day: "numeric",
              };
            }

            // Get the formatted date/time string
            const formattedString = date.toLocaleString([], formatOptions);

            return formattedString; // Return the formatted date/time string
          },
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
            return val.toFixed(4); // Adjust the number of decimal places as needed
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
  const selectedOptionRef = useRef(selectedOption);
  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);
  useEffect(() => {
    fetchData();
  }, [tokenOne, tokenTwo, selectedOption]);
  const fetchData = async () => {
    if (tokenOne && tokenTwo) {
      setLoadingValue(true);
      try {
        const response = await axios.get(`/api/ohlcv`, {
          params: {
            src: tokenOne.symbol,
            dst: tokenTwo.symbol,
            timeperiod: selectedOption,
          },
        });
        const data = response.data.Data.Data;
        const firstItem = data[0];
        const timestamp = firstItem.time;
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const timeString = dateObject.toLocaleTimeString();
        if (data.length === 0) {
          setLoadingValue(false);
          setTokenNotSelected(true); // Set tokenNotSelected to true if data is empty
        } else {
          const seriesData = data.map((item) => ({
            x: new Date(item.time * 1000),
            y: [
              parseFloat(item.open),
              parseFloat(item.high),
              parseFloat(item.low),
              parseFloat(item.close),
            ],
          }));
          setChartData((prevChartData) => ({
            ...prevChartData,
            series: [{ data: seriesData }],
          }));
          setLoadingValue(false);
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
        className="bg-gray22/50 z-50 rounded-2xl  h-[450px]  py-4 overflow-hidden "
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
            ) : (
              <>
                <p>Token Not selected</p>
              </>
            )}
          </div>
        ) : (
          <>
            {loadingValue ? (
              <div className="bg-[url('/home/graph.svg')] bg-center w-full h-full bg-no-repeat justify-center flex items-center text-gray-600 text-center">
                <InfinitySpin
                  visible={true}
                  width="250"
                  color="#CBFB45"
                  ariaLabel="infinity-spin-loading"
                />
              </div>
            ) : (
              <>
                <LimitTime
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  tokenOne={tokenOne}
                  tokenTwo={tokenTwo}
                />
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="candlestick"
                  width={"95%"}
                  height={380}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

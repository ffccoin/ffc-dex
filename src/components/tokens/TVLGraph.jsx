"use client";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TVLGraph = () => {
  const generateData = () => {
    const startDate = new Date("2020-01-01");
    const endDate = new Date("2024-03-01");
    const currentDate = new Date(startDate);
    const seriesData = [];
    const labels = [];

    while (currentDate <= endDate) {
      labels.push(currentDate.toISOString());

      const randomValue = Math.floor(Math.random() * (75 - 10 + 1) + 10);
      seriesData.push(randomValue);

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return { labels, seriesData };
  };

  const { labels, seriesData } = generateData();
  const series = [
    {
      name: "TVL",
      data: [
        // Values for 2020
        "0$",
        "2$",
        "1$",
        "3$",
        "4$",
        "6$",
        "12$",
        "6$",
        "2$",
        "9$",
        "9$",
        "10$",
        // Values for 2021
        "11$",
        "15$",
        "20$",
        "25$",
        "30$",
        "28$",
        "25$",
        "29$",
        "31$",
        "34$",
        "36$",
        "28$",
        // Values for 2022
        "20$",
        "24$",
        "25$",
        "29$",
        "34$",
        "27$",
        "36$",
        "39$",
        "41$",
        "43$",
        "40$",
        "42$",
        // Values for 2023
        "39$",
        "44$",
        "46$",
        "45$",
        "49$",
        "55$",
        "59$",
        "54$",
        "57$",
        "61$",
        "68$",
        "75$",
        // Values for 2024
        "70$",
        "72$",
        "74$",
      ],
    },
  ];

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
        show: false,
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
      categories: labels,
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
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className="w-full hidden md:block">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
        width={"100%"}
      />
    </div>
  );
};

export default TVLGraph;

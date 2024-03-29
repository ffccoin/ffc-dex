"use client";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const VolumeGraph = () => {
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
      name: "Volume",
      data: [
        // Values for 2020
        "1$",
        "5$",
        "10$",
        "13$",
        "14$",
        "16$",
        "12$",
        "16$",
        "12$",
        "19$",
        "19$",
        "10$",
        // Values for 2021
        "31$",
        "35$",
        "40$",
        "45$",
        "50$",
        "48$",
        "45$",
        "49$",
        "51$",
        "54$",
        "56$",
        "48$",
        // Values for 2022
        "40$",
        "44$",
        "55$",
        "59$",
        "64$",
        "77$",
        "86$",
        "89$",
        "91$",
        "103$",
        "140$",
        "142$",
        // Values for 2023
        "139$",
        "144$",
        "156$",
        "155$",
        "159$",
        "165$",
        "199$",
        "154$",
        "157$",
        "181$",
        "168$",
        "175$",
        // Values for 2024
        "201$",
        "248$",
        "250$",
      ],
    },
  ];

  const options = {
    chart: {
      height: 250,
      width: "100%",
      type: "bar",
      foreColor: "#ccc", // Setting the color for text and grid lines
      background: "transparent", // Setting the background color
      toolbar: {
        show: false,
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
        type="bar"
        height={250}
        width={"100%"}
      />
    </div>
  );
};

export default VolumeGraph;

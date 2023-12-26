"use client";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

type LineProps = React.ComponentProps<typeof Line>;
type OptionsType = LineProps["options"];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: OptionsType = {
  responsive: true,
  interaction: {
    mode: "nearest",
    intersect: false,
    axis: "x",
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      display: false,
    },
    y: {
      ticks: {
        display: false, // Hides the ticks
        maxTicksLimit: 5,
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      displayColors: false,
    },
  },
};
// TODO: Following is demo code, change to accept props for data
// number of data points
const numOfDataPoints = 20;

// generate labels based on data points size
const labels = Array.from(
  { length: numOfDataPoints },
  (_, i) => `Label ${i + 1}`
);
export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      get borderColor() {
        // Check if last number in data is positive or negative
        const lastNumber = this.data[this.data.length - 1];
        return lastNumber >= 0 ? "green" : "red";
      },
      pointRadius: 0,
      pointHoverRadius: 5,
      tension: 0.1,
    },
  ],
};
const Linechart = () => {
  return <Line options={options} data={data} />;
};

export default Linechart;

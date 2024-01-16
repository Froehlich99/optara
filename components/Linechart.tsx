"use client";
import React, { useEffect, useState } from "react";
import crosshair from "chartjs-plugin-crosshair";
import annotationPlugin from "chartjs-plugin-annotation";

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

type LineProps = React.ComponentProps<typeof Line>;
type OptionsType = LineProps["options"];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  crosshair,
  annotationPlugin
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
const Linechart = ({ data: lineData }: any) => {
  const [lineOptions, setLineOptions] = useState(options);

  useEffect(() => {
    if (
      lineData &&
      lineData.datasets.length > 0 &&
      lineData.datasets[0].data.length > 0
    ) {
      setLineOptions((prevState) => ({
        ...prevState,
        plugins: {
          ...prevState.plugins,
          annotation: {
            annotations: {
              valueLine: {
                type: "line",
                yMin: lineData.datasets[0].data[0],
                yMax: lineData.datasets[0].data[0],
                borderColor: "rgb(211,211,211)",
                borderWidth: 2,
                borderDash: [5, 5],
              },
            },
          },
        },
      }));
    }
  }, [lineData]);

  return <Line options={lineOptions} data={lineData} />;
};
export default Linechart;

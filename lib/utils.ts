import { IScrip } from "@/constants/types";
import { IPortfolioEntry, IUser } from "@/db/schema/User";
import { ChartData } from "chart.js";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

// The logic for filtering data based on the selected time frame
export function filterGraphData(
  newButton: string,
  priceData: number[][] | undefined,
  type: "stock" | "portfolio",
  dateNow: number
) {
  let newData;
  switch (newButton) {
    case "1 D.":
      if (type === "stock") {
        newData = priceData;
      } else {
        newData = priceData; //but only for the last 24 Hours
      }
      break;
    case "1 M.":
      newData = priceData?.filter(
        ([time, value]) => dateNow - time <= 1000 * 60 * 60 * 24 * 30
      );
      break;
    case "6 M.":
      newData = priceData?.filter(
        ([time, value]) => dateNow - time <= 1000 * 60 * 60 * 24 * 30 * 6
      );
      break;
    case "YTD":
      // filter out data from the start of the current year
      const startOfCurrentYear = new Date(
        new Date().getFullYear(),
        0,
        1
      ).getTime();
      newData = priceData?.filter(
        ([time, value]) => time >= startOfCurrentYear
      );
      break;
    case "1 Y.":
      // filter out data that is one year old
      newData = priceData?.filter(
        ([time, value]) => dateNow - time <= 1000 * 60 * 60 * 24 * 365
      );
      break;
    case "5 Y.":
      // filter out data that is five years old
      const fiveYearData = priceData?.filter(
        ([time, value]) => dateNow - time <= 1000 * 60 * 60 * 24 * 365 * 5
      );

      if (fiveYearData) {
        const startDate = fiveYearData[0][0];

        newData = fiveYearData.filter(([time]) => {
          const daysPassed = Math.floor(
            (time - startDate) / (1000 * 60 * 60 * 24)
          );

          // include every third day
          return daysPassed % 3 === 0;
        });
      }
      break;
    case "Max.":
      // include every 10th day
      newData = priceData?.filter((_, index) => index % 10 === 0);
      break;
    default:
      break;
  }
  return newData;
}

export const updateChartData = (
  selectedButton: string,
  graphData: number[][] | undefined,
  change: number | null,
  type: "portfolio" | "stock"
): ChartData<"line", number[], string> | null => {
  if (!graphData) return null;

  const formatLabel = (value: number[]) => {
    //this is neccessary because the API returns german time, but specifies the wrong time zone
    let date;
    if (type === "stock") {
      date = new Date(value[0] - 60 * 60 * 1000); // subtract 1 hour from the timestamp
    } else {
      date = new Date(value[0]);
    }

    return selectedButton === "1 D."
      ? date.toLocaleTimeString()
      : date.toLocaleDateString();
  };
  const borderColor = change ? (change >= 0 ? "green" : "red") : "grey";

  return {
    labels: graphData.map((value) => formatLabel(value)),
    datasets: [
      {
        label: "",
        data: graphData.map((value) => value[1]),
        borderColor: borderColor,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.05,
      },
    ],
  };
};

export const calculateChange = (
  newData: number[][] | undefined
): number | null => {
  if (!newData || newData.length === 0) return null;

  // assumption: newData is ordered by time in ascending order (most recent data at the end of the array)
  const currentValue = newData[newData.length - 1][1];
  const previousValue = newData[0][1];

  let change: number | null = null;
  if (currentValue && previousValue) {
    change = ((currentValue - previousValue) / previousValue) * 100;
  }
  return change;
};

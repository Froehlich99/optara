"use client";
import Linechart from "@/components/Linechart";
import ImageWithFallback from "@/components/ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { IScrip } from "@/constants/types";
import { useEffect, useState } from "react";
import { ChartData } from "chart.js";
import {
  calculateChange,
  filterGraphData,
  formatCurrency,
  updateChartData,
} from "@/lib/utils";
import { timeFrame } from "@/constants/const";
import { StockInfo } from "@/components/StockDetails";
import StockDiscover from "@/components/StockDiscover";
import { IUser } from "@/db/schema/User";

const StockComponent: React.FC<{
  stockDetails: any;
  priceData: IScrip | null;
  user: IUser;
}> = ({ stockDetails, priceData, user }) => {
  const [selectedButton, setSelectedButton] = useState("1 D.");
  const [change, setChange] = useState<number | null>(null);
  const [graphData, setGraphData] = useState(priceData?.series.history.data);
  const [chartData, setChartData] = useState<ChartData<
    "line",
    number[],
    string
  > | null>(null);

  const currentValue =
    priceData?.info.isin == null
      ? null
      : priceData?.series.intraday.data.slice(-1)[0][1];

  const previousValue = priceData?.info.plotlines[0].value;

  useEffect(() => {
    if (currentValue && previousValue) {
      const calculatedChange =
        ((currentValue - previousValue) / previousValue) * 100;
      setChange(calculatedChange);
    }
  }, []); // Empty dependency array - runs only once

  useEffect(() => {
    // This effect is responsible for setting `graphData` when `priceData` updates
    if (priceData) {
      const initialGraphData = filterGraphData(
        selectedButton,
        priceData,
        Date.now()
      );

      // Set the initial `graphData`
      setGraphData(initialGraphData);
    }
  }, [priceData, selectedButton]);

  useEffect(() => {
    //this is responsible for setting the labels and information of the chart itself
    const chart = updateChartData(selectedButton, graphData, change);
    setChartData(chart);
  }, [selectedButton, graphData]);

  const timeFrames = timeFrame;
  const handleButtonClick = (newButton: string) => {
    setSelectedButton(newButton);
    const dateNow = Date.now();
    const newData = filterGraphData(newButton, priceData, dateNow);
    const newChange = calculateChange(newData);
    setChange(newChange);
    setGraphData(newData);
  };

  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 md:pr-5 lg:px-32">
          <div className="pb-10">
            <ImageWithFallback
              fallback={fallbackImage}
              src={`https://assets.traderepublic.com/img/logos/${stockDetails.ISIN}/v2/light.min.svg`}
              alt=""
              width={88}
              height={88}
            />
            <div className="flex flex-row items-center">
              <h1 className="bold-32">
                {stockDetails ? stockDetails.Company : ""}
              </h1>
            </div>
            <h1 className="bold-20">
              {currentValue ? formatCurrency(currentValue) : "No Data"}
            </h1>
            <p
              className={
                change
                  ? change >= 0
                    ? "regular-14 text-green-50"
                    : "regular-14 text-red-500"
                  : "No Data"
              }
            >
              {change !== null
                ? `${(change as number).toFixed(2)}%`
                : "No Data"}
            </p>
          </div>

          <span className="flex whitespace-nowrap justify-between pb-3">
            {timeFrames.map((timeFrame) => (
              <button
                key={timeFrame}
                className={`${
                  selectedButton === timeFrame ? "bg-slate-200" : ""
                } rounded-md p-1.5`}
                onClick={() => handleButtonClick(timeFrame)}
              >
                {timeFrame}
              </button>
            ))}
          </span>
          {chartData && <Linechart data={chartData} />}
        </div>
        <div className="flex flex-col py-5 lg:w-1/4">
          <StockInfo
            stockDetails={stockDetails}
            currentValue={currentValue}
            user={user}
          />
        </div>
      </div>
      <div className="relative flex flex-col lg:px-32 pb-10">
        <StockDiscover />
      </div>
    </div>
  );
};

export default StockComponent;

"use client";
import React, { useEffect, useState } from "react";
import StockDiscover from "@/components/StockDiscover";
import Linechart from "@/components/Linechart";
import Investments from "@/components/Investments";
import { IHolding, IUser } from "@/db/schema/User";
import {
  calculateChange,
  filterGraphData,
  formatCurrency,
  updateChartData,
} from "@/lib/utils";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { timeFrame } from "@/constants/const";

const PortfolioComponent: React.FC<{
  user: IUser;
  holdings: IHolding[];
  totalPortfolioValue: number;
}> = ({ user, holdings, totalPortfolioValue }) => {
  const lineData =
    user && user.portfolioValue
      ? user.portfolioValue.map((entry) => entry.value)
      : [];

  const lineLabels =
    user && user.portfolioValue
      ? user.portfolioValue.map((entry) => new Date(entry.date).getTime())
      : [];

  const portfolioData = lineLabels.map((timestamp, i) => [
    timestamp,
    lineData[i],
  ]);

  const [selectedButton, setSelectedButton] = useState("1 D.");
  const [graphData, setGraphData] = useState<number[][] | undefined>(
    portfolioData
  );
  const [change, setChange] = useState<number | null>(null);

  const currentValue =
    portfolioData.length > 0
      ? portfolioData[portfolioData.length - 1][1]
      : null;
  const previousValue = portfolioData.length > 0 ? portfolioData[0][1] : null;
  useEffect(() => {
    if (currentValue && previousValue) {
      const calculatedChange =
        ((currentValue - previousValue) / previousValue) * 100;
      setChange(calculatedChange);
    }
  }, []); // Empty dependency array - runs only once

  const handleButtonClick = (newButton: string) => {
    setSelectedButton(newButton);

    const dateNow = Date.now();
    const newData = filterGraphData(newButton, portfolioData, "stock", dateNow);
    const newChange = calculateChange(newData);
    setChange(newChange);
    setGraphData(newData);
  };
  const chartData = updateChartData(
    selectedButton,
    graphData,
    change,
    "portfolio"
  );

  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
          <div className="pb-10">
            <h1 className="bold-32">Portfolio</h1>
            <h1 className="bold-20">
              {/* formatCurrency(25000) is only for the testing phase, where user will get 25k in virtual money.*/}
              {user
                ? formatCurrency(totalPortfolioValue)
                : formatCurrency(25000)}
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
              {change !== null ? `${(change as number).toFixed(2)}%` : "0.00%"}
            </p>
          </div>
          <span className="flex whitespace-nowrap justify-between pb-3">
            {timeFrame.map((timeFrame) => (
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
          <Linechart data={chartData} />
        </div>
        <div className="relative flex flex-col py-5 lg:py-0 lg:w-1/4">
          <Investments holdings={holdings} />
        </div>
      </div>
      <div className="relative flex flex-col lg:px-32 lg:h-[90vh]">
        <StockDiscover />
      </div>
    </div>
  );
};

export default PortfolioComponent;

"use client";
import Linechart from "@/components/Linechart";
import { getStockByIsin } from "@/lib/getStockByIsin";
import ImageWithFallback from "@/components/ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { IScrip, getStockPricing } from "@/lib/getStockPricing";
import Button from "@/components/Button";
import { popularStocks } from "@/constants/popularStocks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChartData, Point } from "chart.js";
import { reduce } from "lodash";

const StockComponent: React.FC<{
  stockDetails: any;
  priceData: IScrip | null;
}> = ({ stockDetails, priceData }) => {
  const [selectedButton, setSelectedButton] = useState("1 D.");

  const currentValue =
    priceData?.info.isin == null
      ? null
      : priceData?.series.intraday.data.slice(-1)[0][1];

  const previousValue = priceData?.info.plotlines[0].value;

  let change: any = null;

  if (currentValue && previousValue) {
    change = ((currentValue - previousValue) / previousValue) * 100;
  }

  const [graphData, setGraphData] = useState(priceData?.series.history.data);
  const [chartData, setChartData] = useState<ChartData<
    "line",
    number[],
    string
  > | null>(null);
  useEffect(() => {
    if (graphData) {
      if (selectedButton === "1 D.") {
        // format labels as times
        setChartData({
          labels: graphData.map((value) =>
            new Date(value[0]).toLocaleTimeString()
          ),
          datasets: [
            {
              label: "",
              data: graphData.map((value) => value[1]),
              borderColor: change ? (change >= 0 ? "green" : "red") : "grey",
              pointRadius: 0,
              pointHoverRadius: 5,
              tension: 0.05,
            },
          ],
        });
      } else {
        // format labels as dates
        setChartData({
          labels: graphData.map((value) =>
            new Date(value[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: "",
              data: graphData.map((value) => value[1]),
              borderColor: change ? (change >= 0 ? "green" : "red") : "grey",
              pointRadius: 0,
              pointHoverRadius: 5,
              tension: 0.05,
            },
          ],
        });
      }
    }
  }, [graphData]);

  const timeFrames = ["1 D.", "1 M.", "6 M.", "YTD", "1 Y.", "5 Y.", "Max."];
  const handleButtonClick = (newButton: string) => {
    setSelectedButton(newButton);

    const dateNow = Date.now();
    let newData;

    switch (newButton) {
      case "1 D.":
        newData = priceData?.series.intraday.data; // for '1 D.', use raw intradayData
        break;
      case "1 M.":
        newData = priceData?.series.history.data.filter(
          ([time, value]) => dateNow - time <= 1000 * 60 * 60 * 24 * 30
        );
        break;
      case "6 M.":
        newData = priceData?.series.history.data.filter(
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
        newData = priceData?.series.history.data.filter(
          ([time, value]) => time >= startOfCurrentYear
        );
        break;
      case "1 Y.":
        // filter out data that is one year old
        newData = priceData?.series.history.data.filter(
          ([time, value]) => dateNow - time <= 1000 * 60 * 60 * 24 * 365
        );
        break;
      case "5 Y.":
        // filter out data that is five years old
        const fiveYearData = priceData?.series.history.data.filter(
          ([time, value]) => dateNow - time <= 1000 * 60 * 60 * 24 * 365 * 5
        );

        if (fiveYearData) {
          const startDate = fiveYearData[0][0];

          newData = fiveYearData.filter(([time]) => {
            const daysPassed = Math.floor(
              (time - startDate) / (1000 * 60 * 60 * 24)
            );

            // include tevery third day
            return daysPassed % 3 === 0;
          });
        }
        break;
      case "Max.":
        // include every 10th day
        newData = priceData?.series.history.data?.filter(
          (_, index) => index % 10 === 0
        );
        break;
      default:
        break;
    }

    setGraphData(newData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
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
                //TODO: all Buttons are Highlighted
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
          <h1 className="bold-20">Info</h1>
          {stockDetails ? (
            <>
              <div className="regular-20 flex flex-col gap-2 pb-10">
                <div className="inline-flex space-x-2">
                  <p>Company:</p>
                  <p>
                    {stockDetails.Company ? stockDetails.Company : "No Data"}
                  </p>
                </div>
                <div className="inline-flex space-x-2">
                  <p>ISIN: </p>
                  <p>{stockDetails.ISIN ? stockDetails.ISIN : "No Data"}</p>
                </div>
                <div className="inline-flex space-x-2">
                  <p>Ticker: </p>
                  <p>{stockDetails.Ticker ? stockDetails.Ticker : "No Data"}</p>
                </div>
              </div>
              <div className="flex lg:flex-col lg:gap-5 justify-around w-full">
                <div className="flex lg:w-full justify-center w-2/5">
                  <Button type="button" title="Buy" variant="btn_dark_green" />
                </div>
                <div className="flex lg:w-full justify-center w-2/5">
                  <Button type="button" title="Sell" variant="btn_dark_green" />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="relative flex flex-col lg:px-32">
        <h1 className="bold-32">Discover</h1>
        {Object.entries(popularStocks).map(
          ([ISIN, companyName], index: any) => (
            <Link
              href={`/stocks/${ISIN}`}
              key={index}
              className="flex h-[4rem] bold-16 hover:bg-gray-300 text-start items-center"
            >
              <div className="relative w-full flex py-3 items-center">
                <div className="w-4/5 flex justify-start items-center gap-1">
                  <ImageWithFallback
                    fallback={fallbackImage}
                    src={`https://assets.traderepublic.com/img/logos/${ISIN}/v2/light.min.svg`}
                    alt=""
                    width={30}
                    height={30}
                  />
                  <div className="line-clamp-1">
                    <p>{companyName}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default StockComponent;

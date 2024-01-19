"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageWithFallback from "./ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { IHolding } from "@/db/schema/User";
import { getStockByIsin } from "@/app/actions";
import { IStock } from "@/db/schema/Stock";

interface InvestmentsProps {
  holdings: IHolding[];
}

const Investments = ({ holdings }: InvestmentsProps) => {
  const [stocks, setStocks] = useState<IStock[]>([]);

  useEffect(() => {
    async function fetchStocks() {
      const newStocks = [];
      for (const holding of holdings) {
        const stock = await getStockByIsin(holding.ISIN);
        if (stock) {
          newStocks.push(stock);
        }
      }

      setStocks(newStocks);
    }

    fetchStocks();
  }, [holdings]);
  return (
    <>
      <h1 className="bold-32">Investments</h1>
      {stocks.map((stock, index) => {
        const holding = holdings.find((x) => x.ISIN === stock.ISIN);
        return (
          <Link
            href={`/stocks/${stock.ISIN}`}
            key={index}
            className="flex h-[4rem] bold-16 hover:bg-gray-300 items-center justify-between p-2"
          >
            <div className="relative w-full flex py-3 items-center">
              <div className="w-4/5 flex justify-start items-center gap-1">
                <ImageWithFallback
                  fallback={fallbackImage}
                  src={`https://assets.traderepublic.com/img/logos/${stock.ISIN}/v2/light.min.svg`}
                  alt=""
                  width={30}
                  height={30}
                />
                <div className="line-clamp-1">
                  <p>{stock.Company}</p>
                </div>
              </div>
            </div>
            <div>
              <p>{`x${holding?.quantity}`}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Investments;

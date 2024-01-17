import { popularStocks } from "@/constants/const";
import Link from "next/link";
import React from "react";
import ImageWithFallback from "./ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";

const StockDiscover = () => {
  return (
    <>
      <h1 className="bold-32">Discover</h1>
      {Object.entries(popularStocks).map(([ISIN, companyName], index: any) => (
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
      ))}
    </>
  );
};

export default StockDiscover;

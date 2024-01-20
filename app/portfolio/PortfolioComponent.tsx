"use client";
import React from "react";
import { getUser } from "../actions";
import StockDiscover from "@/components/StockDiscover";
import Linechart from "@/components/Linechart";
import Investments from "@/components/Investments";
import { IHolding, IUser } from "@/db/schema/User";
import { formatCurrency } from "@/lib/utils";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const PortfolioComponent: React.FC<{
  user: IUser;
  holdings: IHolding[];
  totalPortfolioValue: number;
}> = ({ user, holdings, totalPortfolioValue }) => {
  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
          <div className="pb-10">
            <h1 className="bold-32">Portfolio</h1>
            <h1 className="bold-20">
              {user ? formatCurrency(totalPortfolioValue) : formatCurrency(0)}
            </h1>
            <p className="regular-14 text-green-50"></p>
          </div>
          {/* <Linechart /> */}
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

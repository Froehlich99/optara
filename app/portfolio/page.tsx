import { getStockByIsin, getUser } from "@/app/actions";
import { IScrip, IStockDetails } from "@/constants/types";
import { getStockPricing } from "@/app/actions";
import PortfolioComponent from "./PortfolioComponent";
import { IHolding } from "@/db/schema/User";
import { cache } from "react";
export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { stock: string } }) => {
  const user = await getUser();
  const holdings: IHolding[] = user.holdings;
  const totalPortfolioValue = user.portfolioValue[0].value;
  return (
    <PortfolioComponent
      user={user}
      holdings={holdings}
      totalPortfolioValue={totalPortfolioValue}
    />
  );
};

export default page;

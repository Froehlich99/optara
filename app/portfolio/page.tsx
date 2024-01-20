import { getStockByIsin, getUser } from "@/app/actions";
import { IScrip, IStockDetails } from "@/constants/types";
import { getStockPricing } from "@/app/actions";
import PortfolioComponent from "./PortfolioComponent";
import { IHolding } from "@/db/schema/User";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async ({ params }: { params: { stock: string } }) => {
  let user = await getUser();
  if (!user) {
    user = await getUser();
  }
  let holdings: IHolding[] = [];
  let totalPortfolioValue: any;
  if (user) {
    holdings = user.holdings;
    totalPortfolioValue = user.portfolioValue[user.portfolioValue.length - 1]
      ? user.portfolioValue[user.portfolioValue.length - 1].value
      : null;
  }

  return (
    <PortfolioComponent
      user={user}
      holdings={holdings}
      totalPortfolioValue={totalPortfolioValue}
    />
  );
};

export default page;

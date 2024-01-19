import { getStockByIsin, getUser } from "@/app/actions";
import { IScrip, IStockDetails } from "@/constants/types";
import { getStockPricing } from "@/app/actions";
import PortfolioComponent from "./PortfolioComponent";
import { IHolding } from "@/db/schema/User";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async ({ params }: { params: { stock: string } }) => {
  const user = await getUser();
  const holdings: IHolding[] = user.holdings;
  const totalPortfolioValue = user.portfolioValue[0]
    ? user.portfolioValue[0].value
    : null;
  return (
    <PortfolioComponent
      user={user}
      holdings={holdings}
      totalPortfolioValue={totalPortfolioValue}
    />
  );
};

export default page;

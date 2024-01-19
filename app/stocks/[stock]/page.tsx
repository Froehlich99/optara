import { getStockByIsin, getUser } from "@/app/actions";
import StockComponent from "./StockComponent";
import { IScrip, IStockDetails } from "@/constants/types";
import { getStockPricing } from "@/app/actions";

const page = async ({ params }: { params: { stock: string } }) => {
  const data = await getStockByIsin(params.stock);
  const user = await getUser();

  const stockDetails: IStockDetails | null = data
    ? {
        _id: data._id.toString(),
        Company: data.Company,
        LSID: data.LSID,
        ISIN: data.ISIN,
        Ticker: data.Ticker,
      }
    : null;

  const priceData: IScrip | null = await getStockPricing(
    stockDetails ? stockDetails.LSID.toString() : ""
  );
  return (
    <StockComponent
      stockDetails={stockDetails}
      priceData={priceData}
      user={user}
    />
  );
};

export default page;

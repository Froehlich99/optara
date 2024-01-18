import { getStockByIsin } from "@/app/actions";
import StockComponent from "./StockComponent";
import { IScrip, IStockDetails } from "@/constants/types";
import { getStockPricing } from "@/app/actions";

const page = async ({ params }: { params: { stock: string } }) => {
  const data = await getStockByIsin(params.stock);

  const stockDetails: IStockDetails | null = data
    ? {
        _id: data._id.toString(), // Convert to string if necessary
        Company: data.Company,
        LSID: data.LSID,
        ISIN: data.ISIN,
        Ticker: data.Ticker,
        // ... include other properties as necessary
      }
    : null;

  const priceData: IScrip | null = await getStockPricing(
    stockDetails ? stockDetails.LSID.toString() : ""
  );
  return <StockComponent stockDetails={stockDetails} priceData={priceData} />;
};

export default page;

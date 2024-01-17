import { getStockByIsin } from "@/app/actions";
import StockComponent from "./StockComponent";
import { IScrip } from "@/constants/iscrip";
import { getStockPricing } from "@/app/actions";

interface IStockDetails {
  _id: string; // Assuming _id is meant to be a string. Adjust accordingly.
  Company: string;
  LSID: number;
  ISIN: string;
  Ticker: string;
  // Add other properties as needed, just ensure they are plain types.
}

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

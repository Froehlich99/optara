import { IStockDetails } from "@/constants/types";
import Button from "@/components/Button";

interface StockInfoProps {
  stockDetails: IStockDetails | null;
}

export const StockInfo: React.FC<StockInfoProps> = ({ stockDetails }) => {
  if (!stockDetails) return null;

  return (
    <>
      <h1 className="bold-20">Info</h1>
      {stockDetails ? (
        <>
          <div className="regular-20 flex flex-col gap-2 pb-10">
            <div className="inline-flex space-x-2">
              <p>Company:</p>
              <p className="line-clamp-1">
                {stockDetails.Company ? stockDetails.Company : "No Data"}
              </p>
            </div>
            <div className="inline-flex space-x-2">
              <p>ISIN: </p>
              <p className="line-clamp-1">
                {stockDetails.ISIN ? stockDetails.ISIN : "No Data"}
              </p>
            </div>
            <div className="inline-flex space-x-2">
              <p>Ticker: </p>
              <p className="line-clamp-1">
                {stockDetails.Ticker ? stockDetails.Ticker : "No Data"}
              </p>
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
    </>
  );
};

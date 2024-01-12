import Linechart from "@/components/Linechart";
import { getStockByIsin } from "@/lib/getStockByIsin";
import ImageWithFallback from "@/components/ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { IScrip, getStockPricing } from "@/lib/getStockPricing";

const page = async ({ params }: { params: { stock: string } }) => {
  const data = await getStockByIsin(params.stock);
  const stockDetails = data?.toObject();
  const priceData: IScrip | null = await getStockPricing(stockDetails.LSID);
  const currentValue =
    priceData?.info.isin == null
      ? null
      : priceData?.series.intraday.data.slice(-1)[0][1];
  const previousValue = priceData?.info.plotlines[0].value;
  let change = null;
  if (currentValue && previousValue) {
    change = ((currentValue - previousValue) / previousValue) * 100;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };
  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
          <div className="pb-10">
            <ImageWithFallback
              fallback={fallbackImage}
              src={`https://assets.traderepublic.com/img/logos/${stockDetails.ISIN}/v2/light.min.svg`}
              alt=""
              width={88}
              height={88}
            />
            <div className="flex flex-row items-center">
              <h1 className="bold-32">
                {stockDetails ? stockDetails.Company : ""}
              </h1>
            </div>
            <h1 className="bold-20">
              {currentValue ? formatCurrency(currentValue) : "No Data"}
            </h1>
            <p
              className={
                change
                  ? change >= 0
                    ? "regular-14 text-green-50"
                    : "regular-14 text-red-500"
                  : "No Data"
              }
            >
              {change !== null
                ? `${(change as number).toFixed(2)}%`
                : "No Data"}
            </p>
          </div>
          <Linechart />
        </div>
        <div className="relative flex flex-col py-5">
          <h1 className="bold-20">Investments</h1>
        </div>
      </div>
      <div className="relative flex flex-col lg:px-32">
        <h1 className="bold-32">Discover</h1>
      </div>
    </div>
  );
};

export default page;

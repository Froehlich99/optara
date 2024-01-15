import Linechart from "@/components/Linechart";
import { getStockByIsin } from "@/lib/getStockByIsin";
import ImageWithFallback from "@/components/ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { IScrip, getStockPricing } from "@/lib/getStockPricing";
import Button from "@/components/Button";
import { popularStocks } from "@/constants/popularStocks";
import Link from "next/link";

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
  const chartData = priceData
    ? {
        labels: priceData.series.intraday.data.map((value) =>
          new Date(value[0]).toLocaleTimeString()
        ),
        datasets: [
          {
            label: "",
            data: priceData.series.intraday.data.map((value) => value[1]),
            borderColor: change ? (change >= 0 ? "green" : "red") : "grey",
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.05,
          },
        ],
      }
    : null;

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
          <Linechart data={chartData} />
        </div>
        <div className="flex flex-col py-5 lg:w-1/4">
          <h1 className="bold-20">Info</h1>
          {stockDetails ? (
            <>
              <div className="regular-20 flex flex-col gap-2 pb-10">
                <div className="inline-flex space-x-2">
                  <p>Company:</p>
                  <p>
                    {stockDetails.Company ? stockDetails.Company : "No Data"}
                  </p>
                </div>
                <div className="inline-flex space-x-2">
                  <p>ISIN: </p>
                  <p>{stockDetails.ISIN ? stockDetails.ISIN : "No Data"}</p>
                </div>
                <div className="inline-flex space-x-2">
                  <p>Ticker: </p>
                  <p>{stockDetails.Ticker ? stockDetails.Ticker : "No Data"}</p>
                </div>
                <div className="inline-flex space-x-2">
                  <p>WKN: </p>
                  <p>{stockDetails.WKN ? stockDetails.WKN : "No Data"}</p>
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
        </div>
      </div>
      <div className="relative flex flex-col lg:px-32">
        <h1 className="bold-32">Discover</h1>
        {Object.entries(popularStocks).map(
          ([ISIN, companyName], index: any) => (
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
          )
        )}
      </div>
    </div>
  );
};

export default page;

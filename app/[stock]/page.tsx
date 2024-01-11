import Linechart from "@/components/Linechart";

const page = ({ params }: { params: { stockName: string } }) => {
  // const Stock = getStockDetails(stockName)
  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
          <div className="pb-10">
            <h1 className="bold-32">{/* {Stock.stockName} */}</h1>
            <h1 className="bold-20">{/* {StockValue} */}</h1>
            <p className="regular-14 text-green-50">2,70%</p>
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

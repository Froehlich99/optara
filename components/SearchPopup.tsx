import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ImageWithFallback from "./ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { popularStocks } from "@/constants/popularStocks";

// Define the props for SearchPopup
type SearchPopupProps = {
  refs: {
    setFloating: (el: HTMLElement | null) => void;
  };
  stocks: any;
  floatingProps: any;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// SearchPopup component
const SearchPopup: React.FC<SearchPopupProps> = ({
  refs,
  stocks,
  floatingProps,
  setIsPopupOpen,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      ref={refs.setFloating}
      {...floatingProps}
      className="absolute border border-gray-300 mt-5 bg-white rounded-lg h-[21rem] overflow-scroll"
    >
      <div className="max-container relative flex flex-col ">
        <h1 className="px-5 py-5 bold-20">
          {stocks && stocks.length > 0 ? "Search Results" : "Popular Stocks"}
        </h1>
        {stocks && stocks.length > 0
          ? stocks.map((stock: any, index: any) => (
              <Link
                href={`/stocks/${stock.ISIN}`}
                key={index}
                className="flex h-[4rem] bold-16 px-2 hover:bg-gray-300 text-start items-center"
                onClick={() => setIsPopupOpen(false)}
              >
                <div className="relative w-full flex py-3 items-center">
                  <div className="w-4/5 flex justify-start items-center gap-1">
                    <ImageWithFallback
                      fallback={fallbackImage}
                      src={`https://assets.traderepublic.com/img/logos/${stock.ISIN}/v2/light.min.svg`}
                      alt=""
                      width={30}
                      height={30}
                    />
                    <div className="line-clamp-1">
                      <p>{stock.Company}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : Object.entries(popularStocks).map(
              ([ISIN, companyName], index: any) => (
                <Link
                  href={`/stocks/${ISIN}`}
                  key={index}
                  className="flex h-[4rem] bold-16 px-2 hover:bg-gray-300 text-start items-center"
                  onClick={() => setIsPopupOpen(false)}
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
    </motion.div>
  );
};

export default SearchPopup;

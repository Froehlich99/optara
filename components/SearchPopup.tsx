import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

// Define the props for SearchPopup
type SearchPopupProps = {
  isPopupOpen: boolean;
  refs: {
    setFloating: (el: HTMLElement | null) => void;
  };
  stocks: any;
};

// SearchPopup component
const SearchPopup: React.FC<SearchPopupProps> = ({
  isPopupOpen,
  refs,
  stocks,
}) => (
  <AnimatePresence>
    {isPopupOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        ref={refs.setFloating}
        className="absolute border border-gray-300 mt-5 bg-white rounded-lg h-[21rem] overflow-scroll"
      >
        <div className="max-container relative flex flex-col ">
          <h1 className="px-5 py-5 bold-20">
            {stocks && stocks.length > 0 ? "Search Results" : "Popular Stocks"}
          </h1>
          {stocks && stocks.length > 0 ? (
            stocks.map((stock: any, index: any) => (
              // Possible way to fetch images, quality and aspect ratio is varying
              // https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.ticker}.png
              <Link
                href={""}
                key={index}
                className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start items-center"
              >
                <div className="flexBetween py-3">
                  <div className="w-3/4 line-clamp-1">
                    <p>{stock.name}</p>
                  </div>
                  <p>{stock.ticker}</p>
                </div>
              </Link>
            ))
          ) : (
            // TODO: Replace with map over highest trading volume or smth
            <>
              <Link
                href=""
                className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start items-center"
              >
                Alphabet
              </Link>
              <Link
                href=""
                className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start items-center"
              >
                Amazon
              </Link>
              <Link
                href=""
                className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start items-center"
              >
                Apple
              </Link>
              <Link
                href=""
                className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start items-center"
              >
                Microsoft
              </Link>
              <Link
                href=""
                className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start items-center"
              >
                Intel
              </Link>
            </>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default SearchPopup;

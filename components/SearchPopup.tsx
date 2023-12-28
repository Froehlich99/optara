import { AnimatePresence, motion } from "framer-motion";

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
        className="absolute border border-gray-300 mt-5 bg-white rounded-lg"
      >
        <div className="max-container relative flex flex-col ">
          <h1 className="px-5 py-5 bold-20">Popular Stocks</h1>
          {stocks && stocks.length > 0 ? (
            stocks.map((stock: any, index: any) => (
              <button
                key={index}
                className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start"
              >
                {stock.name}
              </button>
            ))
          ) : (
            <>
              <button className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start">
                Alphabet
              </button>
              <button className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start">
                Amazon
              </button>
              <button className="h-[3rem] bold-16 px-5 hover:bg-gray-300 text-start">
                Apple
              </button>
            </>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default SearchPopup;

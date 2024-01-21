import { IStockDetails } from "@/constants/types";
import { useState } from "react";
import {
  FloatingFocusManager,
  FloatingOverlay,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useClick, useDismiss } from "@floating-ui/react";
import { PurchaseModal } from "@/components/PurchaseModal";
import { IUser } from "@/db/schema/User";
import { AnimatePresence, motion } from "framer-motion";
import { SellModal } from "./SellModal";

interface StockInfoProps {
  stockDetails: IStockDetails | null;
  currentValue: number | null;
  user: IUser;
}

export const StockInfo: React.FC<StockInfoProps> = ({
  stockDetails,
  currentValue,
  user,
}) => {
  const heldStock = user.holdings.find(
    (holding) => holding.ISIN === stockDetails?.ISIN
  );
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);

  const { refs: buyRefs, context: buyContext } = useFloating({
    open: isBuyOpen,
    onOpenChange: setIsBuyOpen,
  });

  const { refs: sellRefs, context: sellContext } = useFloating({
    open: isSellOpen,
    onOpenChange: setIsSellOpen,
  });
  const buyClick = useClick(buyContext);
  const buyDismiss = useDismiss(buyContext, { outsidePressEvent: "mousedown" });
  const {
    getReferenceProps: getBuyReferenceProps,
    getFloatingProps: getBuyFloatingProps,
  } = useInteractions([buyClick, buyDismiss]);

  const sellClick = useClick(sellContext);
  const sellDismiss = useDismiss(sellContext, {
    outsidePressEvent: "mousedown",
  });
  const {
    getReferenceProps: getSellReferenceProps,
    getFloatingProps: getSellFloatingProps,
  } = useInteractions([sellClick, sellDismiss]);

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
              <button
                className="bg-green-90 px-8 py-4 text-white transition-all hover:bg-black flexCenter gap-3 rounded-full border w-full"
                ref={buyRefs.setReference}
                {...getBuyReferenceProps()}
              >
                Buy
              </button>
            </div>
            <AnimatePresence>
              {isBuyOpen && (
                <FloatingOverlay
                  className="flex z-50 sm:items-center items-end justify-center"
                  lockScroll
                  style={{ background: "rgba(0, 0, 0, 0.8)" }}
                >
                  <FloatingFocusManager context={buyContext}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-full sm:w-1/2 xl:w-1/4 max-h-2/3 min-h-2/3 h-2/3 z-100 bg-white rounded-t-xl sm:rounded-xl p-6"
                      ref={buyRefs.setFloating}
                      {...getBuyFloatingProps()}
                    >
                      <PurchaseModal
                        setIsOpen={setIsBuyOpen}
                        currentValue={currentValue}
                        user={user}
                        isin={stockDetails.ISIN}
                        lsid={String(stockDetails.LSID)}
                      />
                    </motion.div>
                  </FloatingFocusManager>
                </FloatingOverlay>
              )}
            </AnimatePresence>
            <div className="flex lg:w-full justify-center w-2/5">
              <button
                className="bg-green-90 px-8 py-4 text-white transition-all hover:bg-black flexCenter gap-3 rounded-full border w-full"
                ref={sellRefs.setReference}
                {...getSellReferenceProps()}
                disabled={!heldStock}
              >
                Sell
              </button>
            </div>
            <AnimatePresence>
              {isSellOpen && (
                <FloatingOverlay
                  className="flex z-50 sm:items-center items-end justify-center"
                  lockScroll
                  style={{ background: "rgba(0, 0, 0, 0.8)" }}
                >
                  <FloatingFocusManager context={sellContext}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-full sm:w-1/2 xl:w-1/4 max-h-2/3 min-h-2/3 h-2/3 z-100 bg-white rounded-t-xl sm:rounded-xl p-6"
                      ref={sellRefs.setFloating}
                      {...getSellFloatingProps()}
                    >
                      <SellModal
                        setIsOpen={setIsSellOpen}
                        currentValue={currentValue}
                        userHolding={heldStock}
                      />
                    </motion.div>
                  </FloatingFocusManager>
                </FloatingOverlay>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

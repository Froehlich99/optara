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

interface StockInfoProps {
  stockDetails: IStockDetails | null;
  currentValue: number | null;
}

export const StockInfo: React.FC<StockInfoProps> = ({
  stockDetails,
  currentValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

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
                ref={refs.setReference}
                {...getReferenceProps()}
              >
                Buy
              </button>
            </div>
            {isOpen && (
              <FloatingOverlay
                className="flex z-50 items-center justify-center"
                lockScroll
                style={{ background: "rgba(0, 0, 0, 0.8)" }}
              >
                <FloatingFocusManager context={context}>
                  <div
                    className="w-full sm:w-1/2 xl:w-1/4 max-h-2/3 min-h-2/3 h-2/3 z-100 bg-slate-200 rounded-xl p-6"
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                  >
                    <PurchaseModal
                      setIsOpen={setIsOpen}
                      currentValue={currentValue}
                    />
                  </div>
                </FloatingFocusManager>
              </FloatingOverlay>
            )}
            <div className="flex lg:w-full justify-center w-2/5">
              <button
                className="bg-green-90 px-8 py-4 text-white transition-all hover:bg-black flexCenter gap-3 rounded-full border w-full"
                ref={refs.setReference}
                {...getReferenceProps()}
              >
                Sell
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

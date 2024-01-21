import { Dispatch, SetStateAction, useState } from "react";
import { Tab } from "@headlessui/react";
import { formatCurrency } from "@/lib/utils";
import { IHolding } from "@/db/schema/User";
import Image from "next/image";
import { sellStock } from "@/app/actions";

interface SellModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentValue: number | null;
  userHolding: IHolding | undefined;
}

export const SellModal: React.FC<SellModalProps> = ({
  setIsOpen,
  currentValue,
  userHolding,
}) => {
  if (!userHolding) return null;

  const [isEuroSelected, setIsEuroSelected] = useState(false);
  const [quantityToSell, setQuantityToSell] = useState<number | null>(null);
  const [amountEuro, setAmountEuro] = useState<number | null>(null);

  const handleQuantityChange = (quantity: number) => {
    if (quantity > userHolding.quantity) {
      setQuantityToSell(userHolding.quantity);
    } else {
      setQuantityToSell(quantity);
    }
  };

  const handleAmountEuroChange = (amount: number) => {
    const maxAmount = userHolding.quantity * (currentValue || 0);
    if (amount > maxAmount) {
      setAmountEuro(maxAmount);
    } else {
      setAmountEuro(amount);
    }
  };

  const handleSell = async () => {
    let totalSellingValue, quantity;
    if (isEuroSelected) {
      if (!amountEuro || !currentValue) return;
      totalSellingValue = amountEuro;
      quantity = amountEuro / currentValue;
    } else {
      if (!quantityToSell || !currentValue) return;
      totalSellingValue = quantityToSell * currentValue;
      quantity = quantityToSell;
    }
    await sellStock(totalSellingValue, quantity, userHolding.ISIN);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex justify-between pb-5">
        <h1>Sell Stocks</h1>
        <Image
          src="/close.svg"
          alt="close"
          width={25}
          height={20}
          className="inline-block cursor-pointer z-20"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <Tab.Group>
        <Tab.List className="">
          <Tab className="w-20">
            {({ selected }) => (
              <div
                role="button"
                className={`p-2 rounded-l w-full  ${
                  selected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setIsEuroSelected(false)}
              >
                Quantity
              </div>
            )}
          </Tab>
          <Tab className="w-20">
            {({ selected }) => (
              <div
                role="button"
                className={`flex p-2 rounded-r w-full justify-center  ${
                  selected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setIsEuroSelected(true)}
              >
                Euro
              </div>
            )}
          </Tab>
        </Tab.List>
      </Tab.Group>
      {!isEuroSelected && (
        <div className="flex flex-col gap-5">
          <div className="inline-flex space-x-2 justify-between">
            <p>Price: </p>
            <p>{currentValue ? formatCurrency(currentValue) : "No Data"}</p>
          </div>
          <div className="inline-flex space-x-2 justify-between">
            <p>Quantity: </p>
            <input
              className="block w-1/4 pe-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white outline-none text-right regular-16"
              value={quantityToSell ? quantityToSell : ""}
              type="number"
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              placeholder=""
            />
          </div>
          <div className="inline-flex space-x-2 justify-between">
            <p>Total Sale Amount: </p>
            <p>
              {formatCurrency(
                currentValue && quantityToSell
                  ? quantityToSell * currentValue
                  : 0
              )}
            </p>
          </div>
        </div>
      )}
      {isEuroSelected && (
        <div className="flex flex-col gap-5">
          <div className="inline-flex space-x-2 justify-between">
            <p>Price: </p>
            <p>{currentValue ? formatCurrency(currentValue) : "No Data"}</p>
          </div>
          <div className="inline-flex space-x-2 justify-between">
            <p>Amount: </p>
            <input
              className="block w-1/4 pe-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white outline-none text-right regular-16"
              value={amountEuro ? amountEuro : ""}
              type="number"
              onChange={(e) => handleAmountEuroChange(Number(e.target.value))}
              placeholder=""
            />
          </div>
          <div className="inline-flex space-x-2 justify-between">
            <p>Quantity: </p>
            <p>
              {currentValue && amountEuro
                ? (amountEuro / currentValue).toFixed(2)
                : 0}
            </p>
          </div>
        </div>
      )}
      <div className="flex w-full justify-center mt-auto line-clamp-1 overflow-hidden">
        <button
          className="bg-green-90 px-8 py-4 text-white transition-all hover:bg-black flexCenter gap-3 rounded-full border w-full"
          onClick={() => {
            handleSell();
            setIsOpen(false);
          }}
        >
          Sell
        </button>
      </div>
    </div>
  );
};

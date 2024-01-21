import { Dispatch, SetStateAction, useState } from "react";
import { Tab } from "@headlessui/react";
import { formatCurrency } from "@/lib/utils";
import { IUser } from "@/db/schema/User";
import Image from "next/image";
import { buyStock } from "@/app/actions";

interface PurchaseModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentValue: number | null;
  user: IUser;
  isin: string;
  lsid: string;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  setIsOpen,
  currentValue,
  user,
  isin,
  lsid,
}) => {
  const [isEuroSelected, setIsEuroSelected] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [amountEuro, setAmountEuro] = useState<number | null>(null);

  const handleQuantityChange = (inputQuantity: number) => {
    let maxAffordableQuantity;

    if (currentValue) {
      maxAffordableQuantity = Math.floor(user.money / currentValue);
    } else {
      maxAffordableQuantity = 0;
    }

    if (inputQuantity * (currentValue ? currentValue : 0) > user.money) {
      setQuantity(maxAffordableQuantity);
    } else {
      setQuantity(inputQuantity);
    }
  };

  const handleAmountEuroChange = (inputAmountEuro: number) => {
    if (inputAmountEuro > user.money) {
      inputAmountEuro = user.money;
    }
    setAmountEuro(inputAmountEuro);
  };

  const handlePurchase = () => {
    let numPrice = currentValue;
    let totalPurchaseCost;
    let numQuantity: number = 0;

    if (isEuroSelected) {
      if (!numPrice || !amountEuro) return;
      numQuantity = Number((amountEuro / numPrice).toFixed(2));
      totalPurchaseCost = Number(amountEuro.toFixed(2));
    } else {
      if (!quantity) {
        return;
      }
      numQuantity = quantity;
      if (!numQuantity || !numPrice) return;
      totalPurchaseCost = Number((numPrice * numQuantity).toFixed(2));
    }

    if (totalPurchaseCost > user.money) {
      return;
    }
    buyStock(totalPurchaseCost, numQuantity, isin, lsid);
  };
  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex justify-between pb-5">
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
        <Image
          src="/close.svg"
          alt="close"
          width={25}
          height={20}
          className="inline-block cursor-pointer z-20"
          onClick={() => setIsOpen(false)}
        />
      </div>
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
              value={quantity ? quantity : ""}
              type="number"
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
            />
          </div>
          <div className="inline-flex space-x-2 justify-between">
            <p>Cost: </p>
            <p>
              {formatCurrency(
                currentValue && quantity ? quantity * currentValue : 0
              )}
            </p>
          </div>
          <div className="inline-flex space-x-2 justify-between">
            <p>Remaining Money: </p>
            <p>
              {formatCurrency(
                currentValue && quantity
                  ? user.money - quantity * currentValue
                  : user.money
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
          <div className="inline-flex space-x-2 justify-between">
            <p>Remaining Money: </p>
            <p>
              {formatCurrency(
                currentValue && amountEuro
                  ? user.money - amountEuro
                  : user.money
              )}
            </p>
          </div>
        </div>
      )}

      <div className="flex w-full justify-center mt-auto line-clamp-1 overflow-hidden">
        <button
          className="bg-green-90 px-8 py-4 text-white transition-all hover:bg-black flexCenter gap-3 rounded-full border w-full"
          onClick={() => {
            handlePurchase();
            setIsOpen(false);
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

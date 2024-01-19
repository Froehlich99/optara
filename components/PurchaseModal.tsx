import { Dispatch, SetStateAction, useState } from "react";
import { Tab } from "@headlessui/react";
import { formatCurrency } from "@/lib/utils";
import { IUser } from "@/db/schema/User";

interface PurchaseModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentValue: number | null;
  user: IUser;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  setIsOpen,
  currentValue,
  user,
}) => {
  const [isQuantitySelected, setIsQuantitySelected] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [availableFunds, setAvailableFunds] = useState<number | null>(null);

  const handlePurchase = () => {
    let numPrice = currentValue;
    let numQuantity = quantity;
    if (!numQuantity || !numPrice || !availableFunds) return;
    let totalPurchaseCost = numPrice * numQuantity;
    if (totalPurchaseCost > availableFunds) {
      alert("Not enough funds");
      return;
    }
    setAvailableFunds(availableFunds - totalPurchaseCost);
  };
  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex justify-between pb-5">
        <Tab.Group>
          <Tab.List className="">
            <Tab className="w-20">
              {({ selected }) => (
                <button
                  className={`p-2 rounded-l w-full  ${
                    selected
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => setIsQuantitySelected(false)}
                >
                  Euro
                </button>
              )}
            </Tab>
            <Tab className="w-20">
              {({ selected }) => (
                <button
                  className={`flex p-2 rounded-r w-full justify-center  ${
                    selected
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => setIsQuantitySelected(true)}
                >
                  Quantity
                </button>
              )}
            </Tab>
          </Tab.List>
        </Tab.Group>
        <button className="text-black" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>
      <div></div>
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
          onChange={(e) => setQuantity(Number(e.target.value))}
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
        <p>Available Money: </p>
        <p>
          {formatCurrency(
            currentValue && quantity
              ? user.money - quantity * currentValue
              : user.money
          )}
        </p>
      </div>
      <div className="flex w-full justify-center mt-auto line-clamp-1 overflow-hidden">
        <button
          className="bg-green-90 px-8 py-4 text-white transition-all hover:bg-black flexCenter gap-3 rounded-full border w-full"
          onClick={handlePurchase}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

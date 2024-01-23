"use server";

import clientPromise from "@/db/connectDB";
import Stock, { IStock } from "@/db/schema/Stock";
import User, { IHolding } from "@/db/schema/User";
import { auth } from "@clerk/nextjs";
import { IUser } from "@/db/schema/User";
import { IQuest } from "@/constants/types";
import { revalidatePath } from "next/cache";

export async function completeQuest(quest: IQuest) {
  await clientPromise;

  const user: IUser | null = await getUser();

  const clerkId = user?.clerkId;
  try {
    const user = await User.findOne({ clerkId: clerkId });

    if (user) {
      const qc = user.quests.find(
        (userQuest: IQuest) => userQuest.name === quest.name
      );
      if (qc) {
        qc.completion = 101;

        const response = await User.updateOne(
          { clerkId: clerkId },
          { $set: { "quests.$[quest].completion": 101 } },
          { arrayFilters: [{ "quest.name": qc.name }] }
        );
        await User.updateOne(
          { clerkId: clerkId },
          { $inc: { points: qc.rewardPoints } }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export async function loadQuests(quests: Array<IQuest>) {
  await clientPromise;

  const user: IUser | null = await getUser();

  const clerkId = user?.clerkId;
  try {
    const user = await User.findOne({ clerkId: clerkId });

    if (user) {
      const newQuests = quests.filter(
        (questToAdd) =>
          !user.quests.some(
            (existingQuest: IQuest) => existingQuest.name === questToAdd.name
          )
      );

      if (newQuests.length > 0) {
        const response = await User.updateOne(
          { _id: user._id },
          { $addToSet: { quests: { $each: newQuests } } }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}



export async function getRandomIsins({count}: {count: number}): Promise<string[] | null> {
  await clientPromise;
  try {
    const pipeline = [
      { $sample: { size: count } },
      { $project: { _id: 0, ISIN: 1 } }
    ];
    const stocks = await Stock.aggregate(pipeline);
    if (stocks && stocks.length) {
      const isins = stocks.map((stock) => stock.ISIN);
      return isins;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function getStocks(query: string): Promise<IStock[] | null> {
  await clientPromise;
  try {
    const pipeline = [
      {
        $search: {
          index: "stockSearch",
          autocomplete: {
            query: query,
            path: "Company",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      { $limit: 10 },
    ];
    const stocks = await Stock.aggregate(pipeline);
    if (stocks && stocks.length) {
      const data = stocks.map((stock) => JSON.parse(JSON.stringify(stock)));
      return data;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function getUser() {
  await clientPromise;
  const { userId }: { userId: string | null } = auth();
  const userData = await User.findOne({ clerkId: userId });
  if (userData) {
    const userObject = await userData.toObject();
    const userString = await JSON.stringify(userObject);
    const userJson = await JSON.parse(userString);
    revalidatePath("/portfolio");
    return userJson;
  }
  revalidatePath("/portfolio");
}

export async function getStockByIsin(isin: string): Promise<IStock | null> {
  await clientPromise;
  try {
    const stock = await Stock.findOne({ ISIN: isin });
    if (stock) {
      const plainObject = stock.toObject();
      plainObject._id = plainObject._id.toString();
      revalidatePath("/stocks");
      return plainObject;
    } else {
      revalidatePath("/stocks");
      return null;
    }
  } catch (err) {
    revalidatePath("/stocks");
    return null;
  }
}

export async function getStockPricing(lsid: string | undefined) {
  await clientPromise;
  if (!lsid) {
    return;
  }
  const response = await fetch(
    `https://www.ls-tc.de/_rpc/json/instrument/chart/dataForInstrument?instrumentId=${lsid}`,
    { cache: "no-cache" }
  );

  if (!response.ok) {
    console.error("HTTP error", response.status);
    return null;
  } else {
    const priceData = await response.json();
    return priceData;
  }
}

export async function getFreeStock(
  totalPurchaseCost: number,
  numQuantity: number,
  isin: string,
  lsid: string
) {
  await clientPromise;
  const user: IUser | null = await getUser();

  const clerkId = user?.clerkId;
  try {
    const user = await User.findOne({ clerkId: clerkId });
    if (user) {
      if (user.money < totalPurchaseCost) {
        console.warn("Insufficient Balance");
        return null;
      }
      const stock: IStock | null = await getStockByIsin(isin);
      if (!stock) {
        console.warn("Invalid ISIN");
        return null;
      }

      // Check if the user already holds this stock, if so update quantity else add the stock in holdings.
      let holding = user.holdings.find((h: IHolding) => h.ISIN === isin);
      if (holding) {
        holding.quantity += numQuantity;
      } else {
        holding = {
          ISIN: isin,
          quantity: numQuantity, // assuming 1 stock is bought if totalPurchaseCost equals stockPrice
          LSID: lsid,
        };
        user.holdings.push(holding);
      }

      // Update money and holdings in the user document
      user.money -= totalPurchaseCost;
      user.moneySpent += totalPurchaseCost;
      let lastPortfolioValue =
        user.portfolioValue[user.portfolioValue.length - 1].value;
      user.portfolioValue.push({
        date: new Date(),
        value: lastPortfolioValue,
      });

      await user.save();
      revalidatePath("/portfolio");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function buyStock(
  totalPurchaseCost: number,
  numQuantity: number,
  isin: string,
  lsid: string
) {
  await clientPromise;
  const user: IUser | null = await getUser();

  const clerkId = user?.clerkId;
  try {
    const user = await User.findOne({ clerkId: clerkId });
    if (user) {
      if (user.money < totalPurchaseCost) {
        console.warn("Insufficient Balance");
        return null;
      }
      const stock: IStock | null = await getStockByIsin(isin);
      if (!stock) {
        console.warn("Invalid ISIN");
        return null;
      }

      // Check if the user already holds this stock, if so update quantity else add the stock in holdings.
      let holding = user.holdings.find((h: IHolding) => h.ISIN === isin);
      if (holding) {
        holding.quantity += numQuantity;
      } else {
        holding = {
          ISIN: isin,
          quantity: numQuantity, // assuming 1 stock is bought if totalPurchaseCost equals stockPrice
          LSID: lsid,
        };
        user.holdings.push(holding);
      }

      // Update money and holdings in the user document
      user.money -= totalPurchaseCost;
      user.moneySpent += totalPurchaseCost;
      let lastPortfolioValue =
        user.portfolioValue[user.portfolioValue.length - 1].value;
      user.portfolioValue.push({
        date: new Date(),
        value: lastPortfolioValue,
      });

      await user.save();
      revalidatePath("/portfolio");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function sellStock(
  totalSellingValue: number,
  quantityToSell: number,
  isin: string
) {
  await clientPromise;
  const user: IUser | null = await getUser();

  const clerkId = user?.clerkId;
  try {
    const user = await User.findOne({ clerkId: clerkId });
    if (user) {
      const holding = user.holdings.find((h: IHolding) => h.ISIN === isin);

      if (!holding || holding.quantity < quantityToSell) {
        console.warn("Insufficient shares to sell");
        return null;
      }

      if (holding.quantity === quantityToSell) {
        user.holdings = user.holdings.filter((h: IHolding) => h.ISIN !== isin);
      } else {
        holding.quantity -= quantityToSell;
      }

      // Update money and holdings
      user.money += totalSellingValue;
      let lastPortfolioValue =
        user.portfolioValue[user.portfolioValue.length - 1].value;
      user.portfolioValue.push({
        date: new Date(),
        value: lastPortfolioValue,
      });

      await user.save();
      revalidatePath("/portfolio");
    }
  } catch (err) {
    console.log(err);
  }
}

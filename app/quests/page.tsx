import Roulette from "@/components/Roulette";
import { getUser, loadQuests, getRandomIsins } from "../actions";
import { IUser } from "@/db/schema/User";
import QuestItem from "@/components/QuestItem";
import { emptyQuests, rewards } from "@/constants/const";
import QuestComponent from "./QuestComponent";

interface IQuest {
  name: string;
  rewardPoints: number;
  completion: number;
}

const page = async () => {
  const currentUser: IUser | null = await getUser();
  await loadQuests(emptyQuests);
  const fallbackImageUrl = "/images/stock-placeholder.svg";

  async function checkIfImageExists(url: string) {
    const res = await fetch(url, {
      method: "HEAD",
    });
    return res.status === 200;
  }

  const getStockImage = async (stock: string) => {
    const imageExists = await checkIfImageExists(
      `https://assets.traderepublic.com/img/logos/${stock}/v2/light.min.svg`
    );
    return imageExists
      ? `https://assets.traderepublic.com/img/logos/${stock}/v2/light.min.svg`
      : fallbackImageUrl;
  };

  const randISINs = await getRandomIsins({ count: 10 });
  let imageDataPromises: Promise<string>[] = [];

  if (randISINs) {
    imageDataPromises = randISINs.map((stock) => getStockImage(stock));
  }
  const imageData = await Promise.all(imageDataPromises);

  var questItems = currentUser && currentUser.quests ? currentUser.quests : [];
  questItems = Array.isArray(questItems) ? questItems : [];

  var testItems: IQuest[] = [];

  for (const element in questItems) {
    //workaround to map the questItems without RangeError
    var template = {
      name: questItems[element]["name"],
      rewardPoints: questItems[element]["rewardPoints"],
      completion: questItems[element]["completion"],
    };
    testItems.push(template);
  }
  const user = {
    points: 0,
  };
  if (currentUser) {
    user.points = currentUser?.points;
  }

  return (
    <QuestComponent
      quests={testItems}
      user={currentUser}
      imageData={imageData}
      redeemableRewards={rewards}
    />
  );
};

export default page;

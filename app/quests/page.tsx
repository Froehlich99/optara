
import Roulette from "@/components/Roulette";
import { getUser, loadQuests } from "../actions";
import { IUser } from "@/db/schema/User";
import QuestItem from "@/components/QuestItem";
import { emptyQuests } from "@/constants/const";
import QuestComponent from "./QuestComponent";


interface IQuest {
  name: string;
  rewardPoints: number;
  completion: number;
}


const page = async () => {

  const currentUser: IUser | null = await getUser();
  await loadQuests(emptyQuests);

  var questItems = currentUser && currentUser.quests ? currentUser.quests : [];
  questItems = Array.isArray(questItems) ? questItems : [];

  var testItems: IQuest[] = []

  for (const element in questItems) { //workaround to map the questItems without RangeError
    var template = {
      name: questItems[element]['name'],
      rewardPoints: questItems[element]['rewardPoints'],
      completion: questItems[element]['completion']
    }
    testItems.push(template)
  }
  const user = {
    points: 0
  }
  if (currentUser) {user.points = currentUser?.points}
  

  return <QuestComponent quests={testItems} user={user} />
};

export default page;

import Roulette from "@/components/Roulette";
import { getUser, loadQuests } from "../actions";
import { IUser } from "@/db/schema/User";
import QuestItem from "@/components/QuestItem";
import { quests } from "@/constants/const";


interface IQuest {
  name: string;
  rewardPoints: number;
  completion: number;
}


const page = async () => {

  const user: IUser | null = await getUser();


  await loadQuests(quests)

  var questItems = user && user.quests ? user.quests : [];
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



  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
          <div className="pb-10">
            <h1 className="bold-32">Quests</h1>
            <h1 className="bold-20">{user ? user.points : "No Data"} Points</h1>
          </div>
          {/* <Roulette /> */}
        </div>
        <div className="relative flex flex-col py-5 space-y-4">
          <h1 className="text-2xl font-bold mb-5">Open Quests</h1>

          {/* {questItems.map(QuestItem => (
            <div className="overflow-hidden rounded-xl hover:opacity-95 bg-white bg-opacity-15 flex items-center border border-gray-300 cursor-pointer p-0 static relative ">
              <div className={` absolute h-full -z-10 bg-green-50 flex rounded-xl flex-row`} style={{ width: `${QuestItem['completion']}%` }}/>
              <div className="rounded-full bg-gray-100 font-bold text-lg border flex flex-row items-center justify-center whitespace-nowrap p-5 ml-5">
                <p >{QuestItem['rewardPoints']} P</p>
              </div>
              <h2 className="font-bold text-lg m-4 ml-0 p-5">{QuestItem['name']}</h2>
            </div>))} */}


          {
            testItems.map(quest => <QuestItem quest={quest} />)
          }
        </div>
      </div>
      <div className="relative flex flex-col lg:px-32">
        <h1 className="bold-32">Redeem Points</h1>
      </div>
    </div>
  );
};

export default page;
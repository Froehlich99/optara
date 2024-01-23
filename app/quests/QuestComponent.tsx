"use client";
import Roulette from "@/components/Roulette";
import { getUser, loadQuests } from "../actions";

import QuestItem from "@/components/QuestItem";
import RedeemableReward from "@/components/RedeemableReward";
import React, { useState } from 'react';



interface IQuest {
  name: string;
  rewardPoints: number;
  completion: number;
}


const QuestComponent = ({ quests, user, randISINs, redeemableRewards }: { quests: Array<IQuest>, user: any, randISINs: any, redeemableRewards: any }) => {


  const [points, setPoints] = useState(user.points);


  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
          <div className="pb-10">
            <h1 className="bold-32">Quests</h1>
            <h1 className="bold-20">{points} Points</h1>
          </div>
          <Roulette randomStocks={randISINs} />
        </div>
        <div className="gap-5 overflow-y-scroll lg:h-96  overflow-x-hidden custom-scrollbar">
          <div className="relative flex flex-col py-5 space-y-4 w-full lx:w-1/2">
            <h1 className="text-2xl font-bold mb-5">Open Quests</h1>
            {
              quests.map(quest => <QuestItem quest={quest} type='open' setPoints={setPoints} points={points} />)
            }
          </div>
          <div className="relative flex flex-col py-5 space-y-4 w-full lx:w-1/2 ">
            <h1 className="text-2xl font-bold mb-5">Completed Quests</h1>
            {
              quests.map(quest => <QuestItem quest={quest} type='completed' setPoints={setPoints} points={points} />)
            }
          </div>
        </div>

      </div>
      <div className="relative lg:px-32">
        <h1 className="bold-32">Redeem Points</h1>
        <div className="grid grid-cols-3 py-5 gap-4">

        {
          redeemableRewards.map(reward => <RedeemableReward reward={reward} points={points} />)
        }
        </div>
        
      </div>
    </div>
  );
};

export default QuestComponent;
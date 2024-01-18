"use client";
import React from 'react';
import { useUser } from "@clerk/nextjs";


import { quests } from "@/constants/const";

// interface QuestItemProps {
//     quest: {
//         name: string;
//         rewardPoints: number;
//         completion: number;
//     };
// }


const QuestItem = ({ quest }: {quest: any}) => {

    const { user } = useUser();

    const newQuest = {
        name: "this is a quest",
    rewardPoints: 5,
    completion: 0
    }

    const handleClick = async () => {
        if (user) {
            // fetch("/api/user-quest", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ clerkId: user.id, quest: newQuest }),
            // })
            //     .then((response) => response.json())
            //     .then((data) => {
            //         console.log(data)
            //         // Handle post request success
            //     })
            //     .catch((error) => {
            //         // Handle post request error
            //     });
            fetch("/api/user-quest", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ clerkId: user ? user.id : '', quests: quests }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  // Handle post request success
                })
                .catch((error) => {
                  // Handle post request error
                });

        }
        console.log('this should increase points')
    };

    if (!quest) {
        quest = {
            name: "this is a quest",
        rewardPoints: 5,
        completion: 0
        }
    }


    return (

<div className="overflow-hidden rounded-xl hover:opacity-95 bg-white bg-opacity-15 flex items-center border border-gray-300 cursor-pointer p-0 static relative " onClick={() => handleClick()}>
              <div className={` absolute h-full -z-10 bg-green-50 flex rounded-xl flex-row`} style={{ width: `${quest['completion']}%` }}/>
              <div className="rounded-full bg-gray-100 font-bold text-lg border flex flex-row items-center justify-center whitespace-nowrap p-5 ml-5">
                <p >{quest['rewardPoints']} P</p>
              </div>
              <h2 className="font-bold text-lg m-4 ml-0 p-5">{quest['name']}</h2>
            </div>

    //     <div className="quest-item" style={{ cursor: 'pointer' }} >
    //         <div className="quest-item-points">
    //             <p>{quest.rewardPoints} P</p>
    //         </div>
    //         <h2 className="font-bold text-lg m-4 ">Click this Quest! {quest.name}</h2>
    //     </div>
    );
    return (

             <h2 className="font-bold text-lg m-4 ">Click this Quest! {quest.name}</h2>

    )
};

export default QuestItem;
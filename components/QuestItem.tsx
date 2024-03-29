"use client";
import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { completeQuest } from "../app/actions";
import { motion } from 'framer-motion';
import { IUser } from '@/db/schema/User';


// import { quests } from "@/constants/const";


const QuestItem = ({ quest, type, setPoints, points, user }: { quest: any, type: string, setPoints: any, points: number, user: IUser }) => {

    const [scale, setScale] = useState(1);
    const [isClicked, setClickState] = useState(false)

    const [isVisible, setIsVisible] = useState(true);

    // Fill Quest completion
    if (quest.completion < 101) {
        if (quest.name == 'Have a Portfolio worth at least 10€') {
            const pValue = user.portfolioValue[user.portfolioValue.length - 1].value

            if (pValue > 0) {
                quest.completion = Math.round((pValue / 10) * 100)
            }
        } else if (quest.name == 'Own three different stocks') {
            const holdings = user.holdings.length
            if (holdings > 0) {
                quest.completion = Math.round((holdings / 3) * 100)
            }
        } else if (quest.name == 'Log in to the app 7 days in a row') {
            const daysLoggedIn = 1
            quest.completion = Math.round((daysLoggedIn / 7) * 100)
        }
        if (quest.completion > 100) {
            quest.completion = 100
        }

    }


    const handleClick = async () => {
        console.log(quest.completion)
        if (quest.completion == 100) {
            console.log('this should increase points', quest)
            console.log(points, quest.rewardPoints)
            completeQuest(quest)
            setScale(0)
            setTimeout(() => {
                quest.completion = 101
                setPoints(points + quest.rewardPoints)
            }, 500)


        } else {
            setClickState(true)
            setTimeout(() => setClickState(false), 500)
        }
    };


    if ((type == 'open' && quest.completion <= 100) || (type == 'completed' && quest.completion == 101) && isVisible)
        return (<motion.div layout
            animate={{ rotate: isClicked ? [0, -1, 1, -1, 1] : 0, scale: scale }}
            transition={{ duration: 0.5 }}

            className="overflow-hidden rounded-xl hover:opacity-95 bg-white bg-opacity-15 flex items-center border border-gray-300 cursor-pointer p-0 static relative " onClick={() => handleClick()}>
            <div className={` absolute h-full -z-10 bg-green-50 flex rounded-xl flex-row`} style={{ width: `${quest['completion']}%` }} />
            <div className="rounded-full bg-gray-100 font-bold text-lg border flex flex-row items-center justify-center whitespace-nowrap p-5 ml-5">
                <p >{quest['rewardPoints']} P</p>
            </div>
            <h2 className="font-bold text-lg m-4 ml-0 p-5">{quest['name']}</h2>
        </motion.div>
        );
};

export default QuestItem;
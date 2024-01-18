"use client";
import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { completeQuest } from "../app/actions";
import { motion } from 'framer-motion';


// import { quests } from "@/constants/const";


const QuestItem = ({ quest, type }: { quest: any, type: string }) => {

    const [scale, setScale] = useState(1);
    var [isClicked, setClickState] = useState(false)
    

    const handleClick = async () => {
        console.log(quest.completion)
        if (quest.completion == 100) {
            console.log('this should increase points', quest)
            completeQuest(quest)
            // setScale(0)
            quest.completion = 101

        } else {
            setClickState(true)
            console.log("not enough quest progression", quest, isClicked)
            setTimeout(() => setClickState(false), 500)
        }
    };


if ((type == 'open' && quest.completion <= 100) || (type == 'completed' && quest.completion == 101))
    return (
        <motion.div layout animate={isClicked ? {
            rotate: [0,-1, 1, -1, 1],} : {}} 
            // transition={{
            //     type: "spring",
            //   }}
            
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
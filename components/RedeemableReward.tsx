"use client";
import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { addMoney, addPoints } from "../app/actions";
import { motion } from 'framer-motion';


// import { quests } from "@/constants/const";


const RedeemableReward = ({ reward, setPoints, points, mustSpin, setMustSpin }: { reward: any, setPoints: any, points: number, mustSpin: boolean, setMustSpin: any }) => {

    const [scale, setScale] = useState(1);
    const [isClicked, setClickState] = useState(false)

    const [isVisible, setIsVisible] = useState(true);

    function hideDiv() {
        setIsVisible(false);
    }

    const affordability = Math.round((points / reward.cost) * 100)


    const handleClick = async () => {
        if (affordability >= 100) {
            console.log('bought')
            // console.log(points , quest.rewardPoints)
            // completeQuest(quest)
            // setScale(0)
            // setTimeout(() => {quest.completion = 101
            //     setPoints(points + quest.rewardPoints)}, 500)
            if(reward.name == '+5€ for your account') {
                addMoney(5)
            } else if (reward.name == '+50€ for your account') {
                addMoney(50)
            }
            setPoints(points - reward.cost)
            addPoints( - reward.cost)
            if (reward.name == 'Spin the Wheel and get a free stock!') {
                if(!mustSpin){setMustSpin(true)}
            }
        } else {
            setClickState(true)
            setTimeout(() => setClickState(false), 500)
        }
        }


        return (
            <motion.div
            layout
        animate={{ rotate: isClicked ? [0, -1, 1, -1, 1] : 0, scale: scale }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-xl hover:opacity-95 bg-white bg-opacity-15 flex flex-col items-start border border-gray-300 cursor-pointer p-0 static relative w-full aspect-w-1 aspect-h-1" onClick={() => handleClick()}>
        <div className={`absolute top-0 left-0 h-full z-0 rounded-xl bg-green-50`} style={{ width: `${affordability}%` }}/>
        <h2 className="font-bold text-lg text-center m-4 ml-0 p-5 w-full z-10 relative">{reward['name']}</h2>
                <div className="rounded-full mb-4 self-center bg-gray-100 font-bold text-lg border items-center justify-center space-x-4 whitespace-nowrap py-2 px-4 mt-auto z-10 relative">
    <p>{reward['cost']} P</p>
</div>
    </motion.div>
        );
};

export default RedeemableReward;
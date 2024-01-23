"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimateSharedLayout, color } from 'framer-motion';
import { faker } from '@faker-js/faker';
import ImageWithFallback from './ImageWithFallback';
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { Wheel } from 'react-custom-roulette'

function Roulette({ randomStocks }: { randomStocks: any }) {
  const [animation, setAnimation] = useState(false);
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const boxes = randomStocks

  const parent = {
    visible: {
      x: "-1000%",
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
  let data = []
  boxes.forEach((stock, index) => {
    data.push({
        option: index,
        image: { uri: 'https://assets.traderepublic.com/img/logos/' + stock + '/v2/light.min.svg',
        offsetY: 200,},
        
    });
});
  // const data = [
  //   { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
  //   { option: '1', style: { backgroundColor: 'white' } },
  //   { option: '2', image: { uri: 'https://static-production.npmjs.com/255a118f56f5346b97e56325a1217a16.svg'} },
  // ]

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }
  

  return (<div className='flex justify-center'>
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={data}
      backgroundColors={['#ffffff']}
      textColors={['#ffffff']}
      onStopSpinning={() => console.log(prizeNumber, boxes[prizeNumber])}
      // onComplete={}
    />
    <button onClick={() => handleSpinClick()}>Spin!</button>
    </div>
  //   <div>
  //     <button onClick={() => setAnimation(!animation)}>Start/Stop</button>
  //     <div
  // className='overflow-x-hidden h-max grid grid-flow-col flex'>
  //       <motion.div
  //   className="w-32 h-32 flex flex-row"
  //         variants={parent}
  //         initial="hidden"
  //         animate={animation ? "visible" : "hidden"}
  //       >
  //         {boxes.concat(boxes).map((box: string) => (
  //     <div className='h-16 w-16 flex-shrink-0'>
  //             <ImageWithFallback
  //               fallback={fallbackImage}
  //               src={`https://assets.traderepublic.com/img/logos/${box}/v2/light.min.svg`}
  //               alt=""
  //               width={256}
  //               height={256}
  //             />
  //           </div>
  //         ))}

  //       </motion.div>
  //       <motion.div
  //   className="w-32 h-32 flex flex-row"
  //         variants={parent}
  //         initial="hidden"
  //         animate={animation ? "visible" : "hidden"}
  //       >
  //         {boxes.concat(boxes).map((box: string) => (
  //     <div className='h-16 w-16 flex-shrink-0'>
  //             <ImageWithFallback
  //               fallback={fallbackImage}
  //               src={`https://assets.traderepublic.com/img/logos/${box}/v2/light.min.svg`}
  //               alt=""
  //               width={256}
  //               height={256}
  //             />
  //           </div>
  //         ))}

  //       </motion.div>
        
  //     </div>
  //   </div>
  );
}

export default Roulette;
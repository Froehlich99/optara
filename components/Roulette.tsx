"use client";
import React, { useState } from "react";
import { motion, AnimateSharedLayout, color } from "framer-motion";
import { faker } from "@faker-js/faker";
import ImageWithFallback from "./ImageWithFallback";
import fallbackImage from "@/public/images/stock-placeholder.svg";
import { Wheel } from "react-custom-roulette";
import { getFreeStock } from "../app/actions";

type Props = {
  imageData: string[];
};

const Roulette = ({ imageData, mustSpin }: {imageData: any, mustSpin: boolean}) => {
  // const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [stockImageData, setStockImageData] = useState(imageData)
  // let boxes: any[] = [];
  // if (!mustSpin) {
  //   setStockImageData(imageData)
  // }
  const boxes = stockImageData

  const parent = {
    visible: {
      x: "-1000%",
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  let data: any = [];
  boxes.forEach((stock: string, index: any) => {
    let stockUrl = stock;

    try {
      data.push({
        option: index,
        image: { uri: stockUrl, offsetY: 200 },
      });
    } catch {
      data.push({
        option: index,
        image: { uri: "", offsetY: 200 },
      });
    }
  });

  // const handleSpinClick = () => {
  //   if (!mustSpin) {
  //     mustSpin = true;
  //   }
  // }
  // const newPrizeNumber = Math.floor(Math.random() * data.length);
  // setPrizeNumber(newPrizeNumber);
  // setMustSpin(true);



const handleSpinStop = () => {
  let url = boxes[prizeNumber];
let parts = url.split("/");
let stock = parts[5];
  getFreeStock(1, stock);
};

return (
  <div className="flex justify-center">
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={data}
      backgroundColors={["#ffffff"]}
      textColors={["#ffffff"]}
      onStopSpinning={() => handleSpinStop()}
    // onComplete={}
    />
    {/* <button onClick={() => handleSpinClick()}>Spin!</button> */}
  </div>
);
};

export default Roulette;

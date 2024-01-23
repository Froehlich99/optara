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
  mustSpin: boolean;
  setMustSpin: any;
};

const Roulette = ({ imageData, mustSpin, setMustSpin }: Props) => {
  // const [mustSpin, setMustSpin] = useState(false);
  const [stockImageData, setStockImageData] = useState(imageData);
  const [prizeNumber, setPrizeNumber] = useState(1);
  // let boxes: any[] = [];
  // if (!mustSpin) {
  //   setStockImageData(imageData)
  // }
  const boxes = stockImageData;

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

  // setMustSpin(true);

  const handleSpinStop = () => {
    let url = boxes[prizeNumber];
    let parts = url.split("/");
    let stock = parts[5];
    getFreeStock(1, stock);
    setMustSpin(false);
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

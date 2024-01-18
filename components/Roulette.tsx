"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimateSharedLayout, color } from 'framer-motion';
import { faker } from '@faker-js/faker';

function Roulette() {
    const [animation, setAnimation] = useState(false);
    const boxes = new Array(7).fill('').map(() => ({
      id: faker.string.uuid(),
      color: faker.internet.color()
    }));
  
    const parent = {
      visible: {
        x: "-100%",
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  
    return (
      <div>
        <button onClick={() => setAnimation(!animation)}>Start/Stop</button>
        <div style={{ overflow: "hidden", display: "flex", width: "700px" }}>
          <motion.div
            style={{ display: "flex", width: "1000px" }} 
            variants={parent}
            initial="hidden"
            animate={animation ? "visible" : "hidden"}
          >
            {boxes.concat(boxes).map((box) => (
              <div
                style={{ width: "100px", height: "100px", backgroundColor: box.color }}
                key={box.id}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
  
  export default Roulette;
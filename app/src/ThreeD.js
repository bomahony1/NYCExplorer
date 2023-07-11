import React, { useState } from "react"
import { motion, MotionConfig } from "framer-motion"
import { useAnimatedText } from "./use-animated-text"
import "./ThreeD.css"
import { Scene } from "./Canvas"
import { transition as switchTransition } from "./transition";

export default function ThreeD() {
  const [isOn, setOn] = useState(true)
  const headerRef = useAnimatedText(isOn ? 8 : 9, switchTransition)

  return (
    <div className="threed-page">
    <MotionConfig transition={switchTransition}>
      <motion.div
        className="container"
        initial={false}
        animate={{
          backgroundColor: isOn ? "#ffffff" : "#1C2541",
          color: isOn ? "#1C2541" : "#ffffff"
        }}
      >
        <h1 className="open" children="<h1>" />
        <h1 className="close" children="</h1>" />
        <motion.h1 ref={headerRef} />
        <Scene isOn={isOn} setOn={setOn} />
      </motion.div>
    </MotionConfig>
    </div>
  )
}



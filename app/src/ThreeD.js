// import React, { useState } from "react"
// import { motion, MotionConfig } from "framer-motion"
// import { useAnimatedText } from "./use-animated-text"
// import "./ThreeD.css"
// import { Scene } from "./Canvas"
// import { transition as switchTransition } from "./transition";

// export default function ThreeD() {
//   const [isOn, setOn] = useState(true)
//   const headerRef = useAnimatedText(isOn ? 0 : 9, switchTransition)

//   return (
//     <div className="threed-page" style={{ width: "500px", height: "300px", position: "absolute", }}>
//     <div className="threed-page">
//     <MotionConfig transition={switchTransition}>
//       <motion.div
//         className="container"
//         initial={false}
//         animate={{
//           backgroundColor: isOn ? "#ffffff" : "#1C2541",
//           color: isOn ? "#1C2541" : "#ffffff"
//         }}
//       >
//         <h1 className="open" children="<Switch>" />
//         <h1 className="close" children="</Mode>" />
//         <motion.h1 ref={headerRef} />
//         <Scene isOn={isOn} setOn={setOn} />
//       </motion.div>
//     </MotionConfig>
//     </div>
//     </div>
//   )
// }

import React, { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { useAnimatedText } from "./use-animated-text";
import "./ThreeD.css";
import { Scene } from "./Canvas";
import { transition as switchTransition } from "./transition";

export default function ThreeD({ handleMapToggle }) {
  const [isOn, setOn] = useState(true);
  const headerRef = useAnimatedText(isOn ? 0 : 9, switchTransition);

  const handleSceneClick = () => {
   
    handleMapToggle(); // Call the function passed from MapPage to toggle map mode.
  };

  return (
    <div
      className="threed-page"
      style={{
        width: "500px",
        height: "200px",
        position: "absolute",
      }}
    >
      <div className="threed-page">
        <MotionConfig transition={switchTransition}>
          <motion.div
            className="container"
            initial={false}
            animate={{
              backgroundColor: isOn ? "#ffffff" : "#1C2541",
              color: isOn ? "#1C2541" : "#ffffff",
            }}
            onClick={handleSceneClick} // Add the onClick event to call handleSceneClick
          >
            <h1 className="open" children="<Switch>" />
            <h1 className="close" children="</Mode>" />
            <motion.h1 ref={headerRef} />
            <Scene isOn={isOn} setOn={setOn} />
          </motion.div>
        </MotionConfig>
      </div>
    </div>
  );
}


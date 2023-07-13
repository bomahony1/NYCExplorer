// import React, { useCallback, Suspense } from "react"
// import { motion, MotionCanvas } from "framer-motion-3d"
// import { useGLTF, useTexture, Shadow, meshBounds } from "@react-three/drei"
// import { useCursor } from "./use-cursor"
// import { transition } from "./transition"

  

// function Switch({ isOn, setOn }) {
//   const { nodes, materials } = useGLTF("/switch.glb")
//   const texture = useTexture("/cross.jpg")

//   const onClick = useCallback(() => setOn(!isOn), [isOn])

//   const lightVariants = {
//     on: { color: "#888" },
//     off: { color: "#000" }
//   }

//   return (
//     <group scale={[1.25, 1.25, 1.25]} dispose={null}>
//       <motion.mesh receiveShadow castShadow geometry={nodes.Cube.geometry}>
//         <motion.primitive
//           variants={lightVariants}
//           roughness={0.5}
//           metalness={0.8}
//           object={materials.track}
//           attach="material"
//           transition={{ ...transition, damping: 100 }}
//         />
//       </motion.mesh>
//       <motion.group
//         position-y={0.85}
//         variants={{
//           on: { z: -1.2 },
//           off: { z: 1.2 }
//         }}
//       >
//         <motion.mesh
//           receiveShadow
//           castShadow
//           raycast={meshBounds}
//           variants={{
//             on: { rotateX: 0 },
//             off: { rotateX: Math.PI * 1.3 }
//           }}
//           onClick={onClick}
//           {...useCursor()}
//         >
//           <sphereGeometry args={[0.8, 64, 64]} />
//           <motion.meshStandardMaterial roughness={0.5} map={texture} />
//         </motion.mesh>
//         <motion.pointLight
//           intensity={100}
//           distance={1.4}
//           variants={lightVariants}
//         />
//         <Shadow
//           renderOrder={-1000}
//           position={[0, -1, 0]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           scale={[1, 1, 1]}
//         />
//       </motion.group>
//     </group>
//   )
// }

// export function Scene({ isOn, setOn }) {
//   return (
//     <MotionCanvas
//       orthographic
//       shadows
//       dpr={[1, 2]}
//       camera={{ zoom: 60, position: [-5, 5, 5], fov: 90 }}
//     >
//       <motion.group initial={false} animate={isOn ? "on" : "off"}>
//         <ambientLight intensity={0.1} />
//         <directionalLight position={[-20, 20, 20]} intensity={1} />
//         <motion.directionalLight
//           position={[-20, -20, -20]}
//           intensity={0.5}
//           variants={colorVariants}
//         />
//         <motion.pointLight
//           position={[0, 0, 5]}
//           distance={5}
//           intensity={5}
//           variants={colorVariants}
//         />
//         <motion.spotLight
//           variants={colorVariants}
//           position={[10, 20, 20]}
//           angle={0.1}
//           intensity={2}
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//           shadow-bias={-0.00001}
//           castShadow
//         />
//         <Suspense fallback={null}>
//           <Switch isOn={isOn} setOn={setOn} />
//         </Suspense>
//         <mesh
//           receiveShadow
//           renderOrder={1000}
//           position={[0, 0, 0]}
//           rotation={[-Math.PI / 2, 0, 0]}
//         >
//           <planeGeometry args={[10, 10]} />
//           <motion.shadowMaterial
//             transparent
//             variants={{
//               on: { opacity: 0.1 },
//               off: { opacity: 0.3 }
//             }}
//           />
//         </mesh>
//       </motion.group>
//     </MotionCanvas>
//   )
// }

// const colorVariants = {
//   on: { color: "#1C2541" },
//   off: { color: "#c72f46" }
// }

import React, { useCallback, Suspense } from "react";
import { motion, MotionCanvas } from "framer-motion-3d";
import { useGLTF, useTexture, Shadow, meshBounds } from "@react-three/drei";
import { useCursor } from "./use-cursor";
import { transition as switchTransition } from "./transition";


function Switch({ isOn, setOn }) {
  const { nodes, materials } = useGLTF("/switch.glb");
  const texture = useTexture("/cross.jpg");

  const onClick = useCallback(() => setOn(!isOn), [isOn]);

  const lightVariants = {
    on: { color: "#888" },
    off: { color: "#000" }
  };

  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.mesh receiveShadow castShadow geometry={nodes.Cube.geometry}>
        <motion.primitive
          variants={lightVariants}
          roughness={0.5}
          metalness={0.8}
          object={materials.track}
          attach="material"
          transition={{ ...switchTransition, damping: 100 }}
        />
      </motion.mesh>
      <motion.group
        position-y={0.85}
        variants={{
          on: { z: -1.2 },
          off: { z: 1.2 }
        }}
      >
        <motion.mesh
          receiveShadow
          castShadow
          raycast={meshBounds}
          variants={{
            on: { rotateX: 0 },
            off: { rotateX: Math.PI * 1.3 }
          }}
          onClick={onClick}
          {...useCursor()}
        >
          <sphereGeometry args={[0.8, 64, 64]} />
          <motion.meshStandardMaterial roughness={0.5} map={texture} />
        </motion.mesh>
        <motion.pointLight
          intensity={100}
          distance={1.4}
          variants={lightVariants}
        />
        <Shadow
          renderOrder={-1000}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 1, 1]}
        />
      </motion.group>
    </group>
  );
}

export function Scene({ isOn, setOn }) {
  return (
    <MotionCanvas
      orthographic
      shadows
      dpr={[1, 2]}
      camera={{ zoom: 60, position: [-5, 5, 5], fov: 90 }}
    >
      <motion.group initial={false} animate={isOn ? "on" : "off"}>
      <ambientLight intensity={0.1} />
        <directionalLight position={[-20, 20, 20]} intensity={1} />
        <motion.directionalLight
          position={[-20, -20, -20]}
          intensity={0.5}
          variants={colorVariants}
        />
        <motion.pointLight
          position={[0, 0, 5]}
          distance={5}
          intensity={5}
          variants={colorVariants}
        />
        <motion.spotLight
          variants={colorVariants}
          position={[10, 20, 20]}
          angle={0.1}
          intensity={2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow
        />
        <Suspense fallback={null}>
          <Switch isOn={isOn} setOn={setOn} />
        </Suspense>
        <mesh
          receiveShadow
          renderOrder={1000}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[10, 10]} />
          <motion.shadowMaterial
            transparent
            variants={{
              on: { opacity: 0.1 },
              off: { opacity: 0.3 }
            }}
          />
        </mesh>
      </motion.group>
    </MotionCanvas>
  );
}

const colorVariants = {
  on: { color: "#1C2541" },
  off: { color: "#c72f46" }
};


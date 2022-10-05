/*
  Auto-generated by Spline
*/

import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'
import Character from "./components/Character";
import {useState} from "react";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/P4VHCDJuWcGVp416/scene.splinecode');
  const [characterPosition, setCharacterPosition] = useState({
      x: 30.3,
      y: 114.99,
      z: 21.67,
  });

  return (
      <>
        <color attach="background" args={['#feeaea']} />
        <group {...props} dispose={null}>
          <directionalLight
              name="Directional Light"
              intensity={0.7}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={-10000}
              shadow-camera-far={100000}
              shadow-camera-left={-1250}
              shadow-camera-right={1250}
              shadow-camera-top={1250}
              shadow-camera-bottom={-1250}
              position={[68.64, 286.33, 324.67]}
          />
          <mesh
              name="Floor"
              geometry={nodes.Floor.geometry}
              material={materials['Floor Material']}
              castShadow
              receiveShadow
              position={[16.53, -248.45, 94.19]}
              rotation={[-Math.PI / 2, 0, 0]}
          />
          <OrthographicCamera
              name="1"
              makeDefault={true}
              zoom={0.81}
              far={100000}
              near={-100000}
              position={[-71.5, 275.2, 998.02]}
              rotation={[-0.2, -0.08, -0.01]}
          />
          <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" position={[0, 1, 0]} />
          <Character
              nodes={nodes}
              materials={materials}
              position={Object.values(characterPosition)}
              onPointerOver={() => setCharacterPosition({
                  x: characterPosition.x,
                  y: characterPosition.y + 50,
                  z: characterPosition.z
              })}
              onPointerOut={() => setCharacterPosition({
                  x: characterPosition.x,
                  y: characterPosition.y - 50,
                  z: characterPosition.z
              })}
              waveArm={props.waveArm}
          />
        </group>
      </>
  )
}

import {useRef, useState} from "react";
import {useLerpedMouse} from "../hooks";
import {useFrame} from "@react-three/fiber";
import { editable as e } from '@theatre/r3f';

export default function Character({nodes, materials, onClick}) {
    const leftArm = useRef();
    const sceneContent = useRef();
    const mouse = useLerpedMouse();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    }

    let isUp = true;
    useFrame(() => {
        // lookAt mouse
        sceneContent.current.rotation.x = mouse.current.y * Math.PI * 0.05;
        sceneContent.current.rotation.y = mouse.current.x * Math.PI * 0.05;
    });

    return <e.group theatreKey="Character" ref={sceneContent} name="Big" position={[20, 100, 21.67]} rotation={[0, 0, -0.06]} onClick={handleClick}>
        <e.mesh
            theatreKey="Body"
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials['Big Body']}
            castShadow
            receiveShadow
            position={[-19.44, -31.2, -22.27]}
            rotation={[0, 0, 0.09]}
        />
        <group name="Mouth" position={[-14.18, 77.12, 147.58]} rotation={[-0.22, 0, 0]} scale={0.51}>
            <mesh
                name="Cylinder"
                geometry={nodes.Cylinder.geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[-24.8, 21.54, 0.39]}
                rotation={[0, -0.02, 0.08]}
            />
            <mesh
                name="Torus 21"
                geometry={nodes['Torus 21'].geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[-47.51, 17.38, 0]}
                rotation={[0, -0.02, 2.2]}
            />
            <mesh
                name="Torus1"
                geometry={nodes.Torus1.geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[-1.89, 20.99, 0.87]}
                rotation={[0, -0.02, 2.2]}
            />
        </group>
        <e.group theatreKey="Eyes" name="Eyes" position={[-30.85, 75.6, 117.21]}>
            <e.mesh
                theatreKey="Right eye"
                name="Right eye"
                geometry={nodes['Right eye'].geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[82.2, 7.12, 0]}
                rotation={[0, 0, 0.09]}
            />
            <e.mesh
                theatreKey="Left eye"
                name="Left eye"
                geometry={nodes['Left eye'].geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[-82.2, -7.12, 0]}
                rotation={[0, 0, 0.09]}
            />
        </e.group>
        <e.group
            theatreKey="Closed Eyes"
            name="Closed Eyes"
            position={[-33.27, 71.35, 132.28]}
            rotation={[0, 0, 0.12]}
            scale={[1.68, 1.69, 1.69]}
        >
            <mesh
                name="Torus 2"
                geometry={nodes['Torus 2'].geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[55.1, -0.98, 0.67]}
                rotation={[-0.45, 0.38, -1.5]}
            />
            <mesh
                name="Torus"
                geometry={nodes.Torus.geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[-50.18, 1.42, -0.2]}
                rotation={[-0.25, -0.47, -1.59]}
            />
        </e.group>
        <mesh
            name="Tail"
            geometry={nodes.Tail.geometry}
            material={materials['Big Body']}
            castShadow
            receiveShadow
            position={[-8.1, -163.48, -176.89]}
            rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
            name="Right leg"
            geometry={nodes['Right leg'].geometry}
            material={materials['Big Body']}
            castShadow
            receiveShadow
            position={[91.92, -226.17, 39.58]}
            rotation={[3.02, -0.03, -0.45]}
            scale={0.8}
        />
        <mesh
            name="Left leg"
            geometry={nodes['Left leg'].geometry}
            material={materials['Big Body']}
            castShadow
            receiveShadow
            position={[-103.04, -228.08, 45.13]}
            rotation={[3.04, -0.03, 0.13]}
            scale={0.8}
        />
        <e.group theatreKey="Left Arm" ref={leftArm} name="Left arm" position={[127.45, -1.65, -4.69]} rotation={[0, 0, 1]}>
            <mesh
                name="Cube 4"
                geometry={nodes['Cube 4'].geometry}
                material={materials['Big Body']}
                castShadow
                receiveShadow
                position={[-7.05, -42.67, -3.31]}
                rotation={[-3.03, -0.16, -0.13]}
                scale={0.8}
            />
        </e.group>
        <e.group theatreKey="Right Arm" name="Right arm" position={[-180, -45.24, 22]} rotation={[0, 0, -1.08]}>
            <mesh
                name="Cube 41"
                geometry={nodes['Cube 41'].geometry}
                material={materials['Big Body']}
                castShadow
                receiveShadow
                position={[-7.05, -42.67, -3.31]}
                rotation={[-3.03, -0.16, -0.13]}
                scale={0.8}
            />
        </e.group>
        <mesh
            name="Left ear"
            geometry={nodes['Left ear'].geometry}
            material={materials['Big Body']}
            castShadow
            receiveShadow
            position={[-154.15, 158.62, 13.82]}
            rotation={[0, 0, 0.47]}
            scale={0.93}
        />
        <mesh
            name="Right ear"
            geometry={nodes['Right ear'].geometry}
            material={materials['Big Body']}
            castShadow
            receiveShadow
            position={[71.73, 177.48, 3.94]}
            rotation={[0, 0, -0.29]}
            scale={0.93}
        />
    </e.group>;
}
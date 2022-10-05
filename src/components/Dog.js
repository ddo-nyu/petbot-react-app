import { editable as e } from '@theatre/r3f';

export default function Dog({ nodes, materials, position}) {
    return <e.group theatreKey="Dog" name="Dog" position={position}>
        <mesh
            name="Tail"
            geometry={nodes.Tail.geometry}
            material={materials['Tail Material']}
            castShadow
            receiveShadow
            position={[-1.04, -36.4, -58.12]}
            rotation={[3.14, 0, -3.14]}
        />
        <mesh
            name="Right ear"
            geometry={nodes['Right ear'].geometry}
            material={materials['Right ear Material']}
            castShadow
            receiveShadow
            position={[55.99, 31.63, 24.43]}
            rotation={[1.86, -1, 1.84]}
        />
        <mesh
            name="Left Ear"
            geometry={nodes['Left Ear'].geometry}
            material={materials['Left Ear Material']}
            castShadow
            receiveShadow
            position={[-61.15, 29.74, 21.55]}
            rotation={[-1.19, -0.93, -1.2]}
        />
        <group
            name="Right Arm"
            position={[47.78, -1.72, -12.4]}
            rotation={[1.7, -0.19, 1.36]}
            scale={[1.01, 1, 1.01]}
        >
            <mesh
                name="Cube"
                geometry={nodes.Cube.geometry}
                material={materials.Dog}
                castShadow
                receiveShadow
                position={[37.34, -15.4, -0.33]}
                rotation={[0.19, -0.91, -2.43]}
                scale={0.27}
            />
        </group>
        <group
            name="Left arm"
            position={[-58.27, 3.84, -19.65]}
            rotation={[-1.96, -0.97, -2.03]}
            scale={[1.01, 1, 1.01]}
        >
            <mesh
                name="Cube1"
                geometry={nodes.Cube1.geometry}
                material={materials.Dog}
                castShadow
                receiveShadow
                position={[37.34, -15.4, -0.33]}
                rotation={[0.19, -0.91, -2.43]}
                scale={0.27}
            />
        </group>
        <group name="Mouth" position={[24.62, 5.8, 77.81]} rotation={[-0.22, 0.01, -0.06]} scale={[0.4, 0.39, 0.39]}>
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
                name="Torus 2"
                geometry={nodes['Torus 2'].geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[-47.51, 17.38, 0]}
                rotation={[0, -0.02, 2.2]}
            />
            <mesh
                name="Torus"
                geometry={nodes.Torus.geometry}
                material={materials.Eyes}
                castShadow
                receiveShadow
                position={[-1.89, 20.99, 0.87]}
                rotation={[0, -0.02, 2.2]}
            />
        </group>
        <mesh
            name="Cube 8"
            geometry={nodes['Cube 8'].geometry}
            material={materials.Dog}
            castShadow
            receiveShadow
            position={[-0.84, -6.57, 9.85]}
        />
        <mesh
            name="Sphere 5"
            geometry={nodes['Sphere 5'].geometry}
            material={materials.Eyes}
            castShadow
            receiveShadow
            position={[30.83, 24.04, 60.61]}
            scale={0.78}
        />
        <mesh
            name="Sphere 4"
            geometry={nodes['Sphere 4'].geometry}
            material={materials.Eyes}
            castShadow
            receiveShadow
            position={[-29.56, 24.04, 60.61]}
            scale={0.78}
        />
        <mesh
            name="Cube 12"
            geometry={nodes['Cube 12'].geometry}
            material={materials.Dog}
            castShadow
            receiveShadow
            position={[29.43, -82.41, 22.55]}
            rotation={[3.02, -0.03, -0.45]}
            scale={0.27}
        />
        <mesh
            name="Cube 121"
            geometry={nodes['Cube 121'].geometry}
            material={materials.Dog}
            castShadow
            receiveShadow
            position={[-28.78, -82.22, 24.21]}
            rotation={[3.02, -0.03, 0.13]}
            scale={0.27}
        />
    </e.group>
}
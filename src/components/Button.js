import { editable as e } from '@theatre/r3f';
import WinkleRegular from "../Winkle-Regular.ttf";

const opt = {
    font: WinkleRegular,
    fontSize: 25,
    color: "black",
    maxWidth: 500,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial"
};

export default function Button({ tKey, geometry, material, position, label, onClick}) {
    return <e.group theatreKey={tKey} position={position} onClick={onClick}>
        <mesh
            name="Cube"
            geometry={geometry}
            material={material}
            castShadow
            receiveShadow
            scale={[1, 1, 0.11]}
        />
        <group>
            <text
                {...opt}
                position={[0,0,8]}
                text={label}
                anchorX="center"
                anchorY="middle"
            />
        </group>
    </e.group>
}
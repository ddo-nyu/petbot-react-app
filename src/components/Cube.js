import {useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import {useRef} from "react";

export default function Cube({tKey, position, rotation, imageUrl, onClick}) {
    const ref = useRef();
    const imageTexture = useLoader(TextureLoader, imageUrl);

    return <mesh
        ref={ref}
        key={tKey}
        name="Tile"
        castShadow
        receiveShadow
        position={position}
        rotation={rotation}
        onClick={onClick}
    >
        <boxGeometry args={[150, 150, 150]}/>
        <meshStandardMaterial map={imageTexture}/>
    </mesh>
}
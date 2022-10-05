import {useFrame, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import {useEffect, useRef, useState} from "react";

export default function Tile({ tKey, position, rotation, imageUrl, onClick}) {
    const ref = useRef();
    const imageTexture = useLoader(TextureLoader, imageUrl);

    const [spin, setSpin] = useState(false);

    // useFrame(() => {
    //     if (spin) {
    //         // ref.current.rotation.y += 0.1;
    //         if (ref.current.position.x > 0) {
    //             ref.current.position.x -= 20;
    //         }
    //         if (ref.current.position.y > 150) {
    //             ref.current.position.y -= 20;
    //         }
    //         if (position[2] <= 300) {
    //             if (ref.current.position.z <= 250) {
    //                 ref.current.position.z += 20;
    //             } else {
    //                 onClick();
    //             }
    //         } else {
    //             if (ref.current.position.z >= 250) {
    //                 ref.current.position.z -= 20;
    //             } else {
    //                 onClick();
    //             }
    //         }
    //         if (ref.current.position.x === 0 && ref.current.position.y === 150 && ref.current.position.z <= 250) {
    //             onClick();
    //             setSpin(false);
    //         }
    //     }
    // });

    return <mesh
        ref={ref}
        key={tKey}
        name="Tile"
        castShadow
        receiveShadow
        position={position}
        rotation={rotation}
        // onClick={() => setSpin(true)}
        onClick={onClick}
    >
        <boxGeometry args={[150, 150, 150]} />
        <meshStandardMaterial map={imageTexture} />
    </mesh>
}
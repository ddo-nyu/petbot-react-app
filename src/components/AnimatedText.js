import {Text} from 'troika-three-text';
import {extend, useFrame} from "@react-three/fiber";
import WinkleRegular from './../Winkle-Regular.ttf';
import {useRef, useState} from "react";
import { editable as e } from '@theatre/r3f';


extend({ Text });

const opt = {
    font: WinkleRegular,
    fontSize: 40,
    color: "black",
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial"
};

export default function AnimatedText({ tKey, content = 'Hello World!', position, ...props }) {
    const textRef = useRef();
    const maxOpacity = props.opacity || 1;
    const [opacity, setOpacity] = useState(0);
    useFrame(() => {
        if (opacity < maxOpacity) {
            textRef.current.material.opacity = opacity;
            setOpacity(opacity + 0.05);
        }
    }, []);
    return <e.group theatreKey={tKey} position={position}>
        <text
            {...opt}
            ref={textRef}
            text={content}
            anchorX="center"
            anchorY="middle"
            {...props}
        />
    </e.group>;
}
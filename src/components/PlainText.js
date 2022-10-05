import {Text} from 'troika-three-text';
import {extend, useFrame} from "@react-three/fiber";
import WinkleRegular from './../Winkle-Regular.ttf';
import {useRef, useState} from "react";

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

export default function PlainText({ content = 'Hello World!', show = true, position }) {
    return show && <text
        position={position}
        text={content}
        anchorX="center"
        anchorY="middle"
        {...opt}
    />;
}

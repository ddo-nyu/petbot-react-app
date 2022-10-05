import WinkleRegular from "../Winkle-Regular.ttf";

const opt = {
    font: WinkleRegular,
    fontSize: 40,
    color: "black",
    maxWidth: 500,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial"
};

export default function Text({ ...props }) {
    return <text
        {...opt}
        ref={textRef}
        text={content}
        anchorX="center"
        anchorY="middle"
        {...props}
    />;
}
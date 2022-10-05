import { editable as e } from '@theatre/r3f';

export default function ThoughtBubble({ nodes, materials, position}) {
    return <e.group theatreKey="Thought Bubble" name="Thinking" position={position}>
        <e.mesh
            theatreKey="Thought Bubble Dot 1"
            name="Dot 1"
            geometry={nodes['Dot 1'].geometry}
            material={materials['Dot 1 Material']}
            castShadow
            receiveShadow
            position={[-50,0,20]}
        />
        <e.mesh
            theatreKey="Thought Bubble Dot 2"
            name="Dot 2"
            geometry={nodes['Dot 2'].geometry}
            material={materials['Dot 2 Material']}
            castShadow
            receiveShadow
            position={[0, 0, 20]}
        />
        <e.mesh
            theatreKey="Thought Bubble Dot 3"
            name="Dot 3"
            geometry={nodes['Dot 3'].geometry}
            material={materials['Dot 3 Material']}
            castShadow
            receiveShadow
            position={[50, 0, 20]}
        />
        <mesh
            name="Thought Bubble"
            geometry={nodes['Thought Bubble'].geometry}
            material={materials.White}
            castShadow
            receiveShadow
        />
    </e.group>;
}
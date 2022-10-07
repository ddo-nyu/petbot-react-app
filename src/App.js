import './App.css';
import {Canvas} from "@react-three/fiber";
import {OrbitControls, OrthographicCamera} from '@react-three/drei';
import {Suspense, useEffect, useRef, useState} from 'react';
import AnimatedText from "./components/AnimatedText";
import {getProject} from "@theatre/core";
import studio from "@theatre/studio";
import extension from '@theatre/r3f/dist/extension';
import {editable as e, SheetProvider} from '@theatre/r3f';
import state from './state.json';
import Character from "./components/Character";
import useSpline from "@splinetool/r3f-spline";
import Button from "./components/Button";
import ThoughtBubble from "./components/ThoughtBubble";
import Cube from "./components/Cube";

const textSheet = getProject('Petbot', {state}).sheet('Text Sheet');
const characterSheet = getProject('Petbot', {state}).sheet('Sheet 1');

if (process.env.NODE_ENV === 'development') {
    studio.initialize()
    studio.extend(extension)
}

const filterPets = (type, data) => {
    return data.filter((d) => d.species_breed.species_name === type);
}

function App() {
    const inputRef = useRef();
    const {nodes, materials} = useSpline('https://prod.spline.design/alAuVKXsK9bMxIgz/scene.splinecode');

    const [petData, setPetData] = useState(null);
    const [petTiles, setPetTiles] = useState([]);

    // Set up camera controls for theatrejs
    const [orthoCamera, setOrthoCamera] = useState(null);
    const [cameraPosition, setCameraPosition] = useState([-71.5, 275.2, 998.02]);
    const [cameraRotation, setCameraRotation] = useState([-0.2, -0.08, -0.01]);
    const [cameraZoom, setCameraZoom] = useState(0.8);
    const [cameraFov] = useState(75);

    const [userName, setUserName] = useState('');
    const [showThoughtBubble, setShowThoughtBubble] = useState(false);
    const [showText1, setShowText1] = useState(true);
    const [showText2, setShowText2] = useState(true);
    const [showText3, setShowText3] = useState(true);
    const [showText4, setShowText4] = useState(false);
    const [showText5, setShowText5] = useState(false);
    const [showText6, setShowText6] = useState(false);
    const [showText7, setShowText7] = useState(false);
    const [showText8, setShowText8] = useState(false);
    const [showText9, setShowText9] = useState(false);
    const [showText10, setShowText10] = useState(false);

    const [selectedPet, setSelectedPet] = useState(null);

    const [showButton, setShowButton] = useState(false);
    const [showButton2, setShowButton2] = useState(false);

    const [sceneIndex, setSceneIndex] = useState(0);

    const SCENES = [
        {
            name: 'Intro',
            play: async () => {
                getAdoptablePets();
                inputRef.current?.focus();
            },
        },
        {
            name: 'Hello',
            play: async () => {
                setShowText1(false);
                setShowText2(false);
                setShowText3(false);

                await textSheet.sequence.play({iterationCount: 1, range: [0, 0.1]});
                inputRef.current?.setAttribute('disabled', true);
                await characterSheet.sequence.play({iterationCount: 1, range: [1, 2]});
                setShowText4(true);
                setSceneIndex(2);
            }
        },
        {
            name: 'Question 1: Are you looking for a new friend?',
            play: async () => {
                await characterSheet.sequence.play({iterationCount: 1, range: [2, 3]});
                setShowText5(true);
                setShowButton(true);
            }
        },
        {
            name: 'Question 1: Yes',
            play: async () => {
                await setShowButton(false);
                await textSheet.sequence.play({iterationCount: 1, range: [1, 1.3]});
                await characterSheet.sequence.play({iterationCount: 1, range: [6, 8.5]});
                setSceneIndex(5);
            }
        },
        {
            name: 'Question 1: No',
            play: async () => {
                await textSheet.sequence.play({iterationCount: 1, range: [1, 1.3]});
                await setShowButton(false);
                await setShowText6(true);
            }
        },
        {
            name: 'Question 2: What kind of friend are you looking for?',
            play: async () => {
                setShowText7(true);
                await setShowButton2(true);
                await textSheet.sequence.play({iterationCount: 1, range: [2, 2.3]});
            },
        },
        {
            name: 'Question 2: Cats',
            play: async () => {
                await textSheet.sequence.play({iterationCount: 1, range: [5, 5.1]});
                await setShowButton2(false);
                await setShowText7(false);

                await setShowText8(true);

                await setShowThoughtBubble(true);
                await textSheet.sequence.play({iterationCount: 1, range: [2, 4]});
                await setShowThoughtBubble(false);

                await characterSheet.sequence.play({iterationCount: 1, range: [4, 5]});

                await setShowText8(false);
                await setShowText10(true);

                await setPetTiles(createPetCubes('Cat'));
            },
        },
        {
            name: 'Question 2: Dogs',
            play: async () => {
                await textSheet.sequence.play({iterationCount: 1, range: [5, 5.1]});
                await setShowButton2(false);
                await setShowText7(false);

                await setShowText9(true);

                await setShowThoughtBubble(true);
                await textSheet.sequence.play({iterationCount: 1, range: [2, 4]});
                await setShowThoughtBubble(false);

                await characterSheet.sequence.play({iterationCount: 1, range: [4, 5]});

                await setShowText9(false);
                await setShowText10(true);

                await setPetTiles(createPetCubes('Dog'));
            },
        },
    ];

    const createPetCubes = (filterType) => {
        const pets = filterPets(filterType, petData);
        const maxRadius = 500;
        return pets.map((p, i) => {
            const angle = i * (2 * Math.PI / pets.length);
            const x = (maxRadius) * Math.cos(angle);
            const y = (maxRadius) * Math.sin(angle);
            return <Cube tKey={`Pet Tile ${i}`} nodes={nodes} materials={materials}
                         position={[x, 600, y]} rotation={[0, x, 0]} imageUrl={p.pic_url}
                         onClick={() => setSelectedPet(p)}
            />;
        });
    }

    useEffect(() => {
        SCENES[sceneIndex].play();
    }, [sceneIndex]);

    useEffect(() => {
        const cam = characterSheet.object('Ortho Camera', {
            position: {x: cameraPosition[0], y: cameraPosition[1], z: cameraPosition[2]},
            rotation: {x: cameraRotation[0], y: cameraRotation[1], z: cameraRotation[2]},
            zoom: cameraZoom,
        });
        setOrthoCamera(cam);

        document.addEventListener("keydown", () => {
            if(inputRef.current.getAttribute('disabled') !== true) {
                inputRef.current?.focus();
            }
        });
    }, []);

    useEffect(() => {
        if (orthoCamera) {
            orthoCamera.onValuesChange(v => {
                setCameraPosition([v.position.x, v.position.y, v.position.z]);
                setCameraRotation([v.rotation.x, v.rotation.y, v.rotation.z]);
                setCameraZoom(v.zoom);
            });
        }
    }, [orthoCamera]);

    useEffect(() => {
        if (petTiles.length > 0) {
            textSheet.sequence.play({iterationCount: Infinity, range: [6, 18]});
        }
    }, [petTiles]);

    const getAdoptablePets = async () => {
        const res = await fetch('https://api.adoptapet.me/ap');
        if (res.ok) {
            const obj = await res.json();
            setPetData(obj.page);
        }
    };

    return (
        <Suspense fallback={null}>
            <Canvas shadows flat linear>
                <SheetProvider sheet={characterSheet}>
                    <OrthographicCamera
                        name="1"
                        makeDefault={true}
                        far={100000}
                        near={-100000}
                        position={cameraPosition}
                        rotation={cameraRotation}
                        zoom={cameraZoom}
                        fov={cameraFov}
                    />
                    <OrbitControls/>
                    <color attach="background" args={['#feeaea']}/>
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

                    <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea"
                                     position={[0, 1, 0]}/>
                    <e.group theatreKey="Character Wrapper" name="Character Wrapper" position={[0, 40, 0]}
                             rotation={[0, -0.1, -0.01]}>
                        <Character
                            theatreKey="Character"
                            nodes={nodes}
                            materials={materials}
                            position={[0, 0, 0]}
                        />
                    </e.group>
                </SheetProvider>
                <SheetProvider sheet={textSheet}>
                    {showText1 && <AnimatedText tKey="Text 1" position={[400, 400, 0]}
                                                content="Hey I'm Petbot! What's your name?"/>}
                    {showText2 &&
                        <AnimatedText tKey="Text 2" position={[400, 300, 0]} content="Type your name and press Enter..."
                                      fontSize={25} textAlign="center" opacity={0.5}
                                      onClick={() => inputRef.current.focus()}/>}
                    {showText3 && <AnimatedText tKey="Text 3" position={[400, 220, 0]} content={userName}/>}
                    {showText4 && <AnimatedText tKey="Text 4" position={[400, 400, 0]} content={`Hi ${userName}!`}/>}
                    {showText5 && <AnimatedText tKey="Text 5" position={[400, 300, 0]}
                                                content="Is it true you're looking for a new friend?"/>}
                    {showText6 &&
                        <AnimatedText tKey="Text 6" position={[400, 300, 0]} content="Then why are you here?"/>}
                    {showText7 && <AnimatedText tKey="Text 7" position={[400, 300, 0]}
                                                content="Ok! What kind of pet are you looking for?"/>}
                    {showText8 && <AnimatedText tKey="Text 8" position={[400, 300, 0]}
                                                content="Yes! Cats are awesome. Let me find some for you..."
                                                maxWidth={400}/>}
                    {showText9 && <AnimatedText tKey="Text 9" position={[400, 300, 0]}
                                                content="So you're a dog person? Let me find some for you..."
                                                maxWidth={400}/>}
                    {showText10 && <AnimatedText tKey="Text 10" position={[400, 300, 0]}
                                                 content="Here are all the pets available for adoption. Choose a pet and I'll tell you more about them!"/>}

                    {showButton &&
                        <Button tKey="Yes button" geometry={nodes['Green Button'].geometry} material={materials.Button}
                                position={[350, 150, 0]} label={"Yes, I am!"} onClick={() => setSceneIndex(3)}/>}
                    {showButton && <Button tKey="No button" geometry={nodes['Red Button'].geometry}
                                           material={materials['Red Button']} position={[500, 150, 0]} label={"Hell no"}
                                           onClick={() => setSceneIndex(4)}/>}

                    {showButton2 &&
                        <Button tKey="Cat button" geometry={nodes['Red Button'].geometry} material={materials.White}
                                position={[350, 150, 0]} label={"Cats"} onClick={() => setSceneIndex(6)}/>}
                    {showButton2 &&
                        <Button tKey="Dog button" geometry={nodes['Red Button'].geometry} material={materials.White}
                                position={[500, 150, 0]} label={"Dogs"} onClick={() => setSceneIndex(7)}/>}

                    {showThoughtBubble && <ThoughtBubble nodes={nodes} materials={materials} position={[0, 450, 0]}/>}

                    <e.group theatreKey="Pet Cubes">
                        {petTiles}
                    </e.group>
                </SheetProvider>
            </Canvas>
            <form onSubmit={(e) => {
                e.preventDefault();
                setSceneIndex(1);
            }}>
                <input ref={inputRef} type="text" placeholder="Enter text"
                       onChange={(event) => setUserName(event.target.value)}/>
            </form>
            {(selectedPet !== null) && <div className="popup">
                <div className="content">
                    <img src={selectedPet.pic_url} alt="pet"/>
                    <div>
                        <h2>{selectedPet.name}</h2>
                        <h3>Age: {selectedPet.age}</h3>
                        <h3>Shelter: {selectedPet.center.name}</h3>
                        <p dangerouslySetInnerHTML={{__html: selectedPet.desc}}></p>
                    </div>
                    <div className="close-button" onClick={() => setSelectedPet(null)}>
                        X
                    </div>
                </div>
            </div>}
        </Suspense>
    );
}

export default App;

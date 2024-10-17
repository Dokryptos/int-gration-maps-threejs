import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";

interface MapPlanerProps{
    zoom: number
}

const MapPlane: React.FC<MapPlanerProps> = ({ zoom }) => {
  const ref = useRef<THREE.Mesh>(null);

  // texture SVG 
  const texture = new THREE.TextureLoader().load("./public/images/map.svg");
  console.log(texture);
  return (
    <mesh ref={ref} scale={[zoom, zoom, 1]}>
      <planeGeometry args={[10, 5]} /> 
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const MapViewer = () => {
  const [zoom, setZoom] = useState(1); // Zoom setting

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <Canvas>
        {/* light */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} />
        <MapPlane zoom={zoom} />

        {/* voir orbitcontrol pour juste zoomer et pas bouger*/}
        <MapControls enableRotate={false} />     
    </Canvas>

      {/* button setting */}
      <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
        <button onClick={() => setZoom((prev) => Math.min(prev + 0.1, 5))}>
          Zoom In
        </button>
        <button onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}>
          Zoom Out
        </button>
      </div>
    </div>
  );
};

export default MapViewer;
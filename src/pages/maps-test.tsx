import { SVGLoader } from "three-stdlib";
import mapSVG from "../assets/images/map.svg";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
const loader = new SVGLoader();

interface SvgShapeProps {
  shape: THREE.Shape;
  index: number;
}

function SvgShape({ shape, index }: SvgShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  return (
    <>
      <mesh ref={mesh}>
        <meshBasicMaterial
          attach="material"
          color={new THREE.Color("skyblue")}
          opacity={1}
          side={THREE.DoubleSide}
          polygonOffset
          polygonOffsetFactor={index}
        />
        <ShapeGeometry args={[shape]} />
      </mesh>
    </>
  );
}

const svgResource = new Promise((resolve) =>
  loader.load(mapSVG, (shapes) => {
    resolve(
      shapes.paths.flatMap((group, index) => {
        return group.toShapes(true).map((shape) => {
          const fillColor = group.userData.style.fill;
          return { shape, color: fillColor, index };
        });
      })
    );
  })
);

const Scene = () => {
  const [shapes, set] = useState([]);
  useEffect(() => {
    svgResource.then(set);
  }, []);
  return (
    <group scale={1}>
      {shapes.map((item) => (
        <SvgShape key={item.shape.uuid} {...item} />
      ))}
    </group>
  );
};

const MapTest = () => {
  return (
    <>
      <p>ah</p>
      <div className="size-full">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};

export default MapTest;

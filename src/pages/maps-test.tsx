import * as THREE from "three";
import { SVGLoader } from "three-stdlib";
import mapSVG from "../assets/images/map.svg";
import { Canvas } from "@react-three/fiber";

interface SVGPath {
  color: THREE.ColorRepresentation;
}

interface SVGData {
  paths: SVGPath[];
}

function mapData(data: SVGData): void {
  const paths = data.paths;
  const group = new THREE.Group();

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    const material = new THREE.MeshBasicMaterial({
      color: path.color,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const shapes = SVGLoader.createShapes(path as any);

    for (let j = 0; j < shapes.length; j++) {
      const shape = shapes[j];
      const geometry = new THREE.ShapeGeometry(shape);
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    }
  }

  scene.add(group);
}

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Appel de la fonction pour charger et afficher le SVG
// mapData(mapSVG);

// camera.position.z = 500;

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();

const MapTest = () => {
  return (
    <>
      <p>ah</p>
      <div className="size-full">
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </>
  );
};

export default MapTest;

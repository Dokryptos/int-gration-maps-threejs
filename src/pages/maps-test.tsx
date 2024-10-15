import * as THREE from 'three'
import { Suspense, useState, useRef, useLayoutEffect, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three-stdlib'
import { MapControls } from '@react-three/drei'


interface CellProps{
    color: any,
    shape: any,
    fillOpacity: number;
}

const Cell: React.FC<CellProps> = ({ color, shape, fillOpacity }) => {
  const [hovered, hover] = useState(false)

  return (
    <mesh onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
      <meshBasicMaterial color={hovered ? 'hotpink' : color} opacity={fillOpacity} depthWrite={false} transparent />
      <shapeBufferGeometry args={[shape]} />
    </mesh>
  )
}

interface SVGProps{
    url: string,
}

const Svg: React.FC<SVGProps> = ({ url }) => {
  const { paths } = useLoader(SVGLoader, url)
  const shapes = useMemo(
    () => paths.flatMap((p) => p.toShapes(true).map((shape) => ({ 
        shape, 
        color: p.color, 
        fillOpacity:p.userData?.style?.fillOpacity !== undefined ? p.userData.style.fillOpacity : 1 }))),
    [paths]
  )

  const ref = useRef<THREE.Group>(null)
  useLayoutEffect(() => {
    if (!ref.current) return;

    const sphere = new THREE.Box3().setFromObject(ref.current).getBoundingSphere(new THREE.Sphere())
    ref.current.position.set(-sphere.center.x, -sphere.center.y, 0)
  }, [])

  return (
    <group ref={ref}>
      {shapes.map((props, index) => (
        <Cell key={props.shape.uuid} {...props} />
      ))}
    </group>
  )
}

function MapTest() {
  return (
    <Canvas frameloop="demand" orthographic camera={{ position: [0, 0, 50], zoom: 2, up: [0, 0, 1], far: 10000 }}>
      <Suspense fallback={null}>
        <Svg url="../public/images/map.svg" />
      </Suspense>
      <MapControls enableRotate={false} />
    </Canvas>
  )
}

export default MapTest

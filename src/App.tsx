import { useEffect, useState } from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { BufferGeometry, Mesh } from "three";

function Plane(props: ThreeElements["planeBufferGeometry"]) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh receiveShadow ref={ref as React.RefObject<Mesh<BufferGeometry>>}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

function Cube(props: ThreeElements["boxBufferGeometry"]) {
  const [ref] = useBox(() => ({ mass: 1, ...props }));
  return (
    <mesh castShadow ref={ref as React.RefObject<Mesh<BufferGeometry>>}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function App() {
  const [ready, set] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => set(true), 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
        <ambientLight />
        <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} castShadow />
        <Physics>
          <Plane />
          <Cube position={[0, 5, 0]} />
          <Cube position={[0.45, 7, -0.25]} />
          <Cube position={[-0.45, 9, 0.25]} />
          {ready && <Cube position={[-0.45, 10, 0.25]} />}
        </Physics>
      </Canvas>
    </div>
  );
}

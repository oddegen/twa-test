import { Canvas, ThreeElements } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

export default function App() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
      <Canvas>
        <ambientLight intensity={0.5 * Math.PI} />
        <Torus scale={1.75} />
        <OrbitControls />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function Torus(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props}>
      <torusGeometry args={[1, 0.25, 32, 100]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

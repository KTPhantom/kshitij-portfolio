import { Canvas } from "@react-three/fiber";
import { Color, Fog } from "three";
import CockpitEnvironment from "./CockpitEnvironment";
import CameraRig from "../cockpit/CameraRig";

export default function CockpitScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.5, 2.5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ scene }) => {
          scene.background = new Color("#050810");
          scene.fog = new Fog("#050810", 5, 14);
        }}
      >
        <ambientLight intensity={0.08} color="#00ff41" />
        <pointLight position={[0, 2, 1]} intensity={0.6} color="#ffaa00" />
        <pointLight position={[-3, 1, 0]} intensity={0.5} color="#00ff41" />
        <pointLight position={[3, 1, 0]} intensity={0.5} color="#00ffff" />
        <pointLight position={[0, -1, 1.5]} intensity={0.3} color="#00ff41" />

        <CameraRig />
        <CockpitEnvironment />
      </Canvas>
    </div>
  );
}

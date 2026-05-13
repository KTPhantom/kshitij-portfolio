import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import { Color, Fog } from "three";
import CockpitModel from "./CockpitModel";
import CameraRig from "../cockpit/CameraRig";

function FallbackEnvironment() {
  return (
    <>
      <Stars radius={80} depth={60} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </>
  );
}

export default function CockpitScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.8, 2.2], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ scene }) => {
          scene.background = new Color("#020508");
          scene.fog = new Fog("#020508", 6, 18);
        }}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.15} color="#ffffff" />
        {/* Main overhead white */}
        <directionalLight position={[0, 5, 2]} intensity={0.8} color="#e8f0ff" castShadow />
        {/* Green phosphor fill from below dashboard */}
        <pointLight position={[0, -1.5, 1.8]} intensity={1.2} color="#00ff41" distance={6} />
        {/* Amber instrument glow */}
        <pointLight position={[0, 0.5, 1]} intensity={0.6} color="#ffaa00" distance={4} />
        {/* Left console teal */}
        <pointLight position={[-2.5, 0, 1]} intensity={0.5} color="#00ffcc" distance={5} />
        {/* Right console cyan */}
        <pointLight position={[2.5, 0, 1]} intensity={0.5} color="#00ccff" distance={5} />
        {/* Rim backlight */}
        <pointLight position={[0, 2, -2]} intensity={0.4} color="#1a3a5c" distance={8} />

        <CameraRig />

        <Suspense fallback={<FallbackEnvironment />}>
          <CockpitModel />
          <Stars radius={80} depth={60} count={2000} factor={3} saturation={0} fade speed={0.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { Color } from "three";
import CockpitModel from "./CockpitModel";
import CameraRig from "../cockpit/CameraRig";

export default function CockpitScene() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 65, near: 0.01, far: 200 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ scene, gl }) => {
          scene.background = new Color("#020508");
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = 2; // PCFSoftShadowMap
        }}
        style={{ pointerEvents: "auto" }}
      >
        {/* ── Lights ── */}
        <ambientLight intensity={0.5} color="#d0e8ff" />
        <directionalLight
          position={[0, 4, 3]}
          intensity={1.2}
          color="#ffffff"
          castShadow
        />
        {/* Green under-glow (dashboard) */}
        <pointLight position={[0, -1.5, 1.5]} intensity={3} color="#00ff41" distance={5} decay={2} />
        {/* Amber centre */}
        <pointLight position={[0, 0.5, 1]} intensity={1.5} color="#ffaa00" distance={4} decay={2} />
        {/* Left teal */}
        <pointLight position={[-2, 0.2, 0.5]} intensity={1.2} color="#00ffcc" distance={5} decay={2} />
        {/* Right cyan */}
        <pointLight position={[2, 0.2, 0.5]} intensity={1.2} color="#00ccff" distance={5} decay={2} />
        {/* Cool rim from behind */}
        <pointLight position={[0, 2, -3]} intensity={0.8} color="#1a3a5c" distance={8} decay={2} />

        {/* ── Camera ── */}
        <CameraRig />

        {/* ── Model ── */}
        <Suspense fallback={null}>
          <CockpitModel />
        </Suspense>

        {/* ── Stars ── */}
        <Stars radius={60} depth={40} count={2000} factor={3} saturation={0} fade speed={0.4} />

        {/* ── Orbit (pointer-events on the canvas allow this) ── */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={0.5}
          maxDistance={12}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}

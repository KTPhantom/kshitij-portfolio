import { Stars } from "@react-three/drei";

export default function CockpitEnvironment() {
  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Cockpit frame tubes */}
      <mesh position={[-2, 0, 1]} rotation={[0, 0.2, 0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[2, 0, 1]} rotation={[0, -0.2, -0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Dashboard panel */}
      <mesh position={[0, -0.8, 0.5]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[6, 2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.8} />
      </mesh>

      {/* Windshield frame */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[4, 0.2, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Side panels */}
      <mesh position={[-3, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#050a05" emissive="#00ff41" emissiveIntensity={0.05} wireframe />
      </mesh>
      
      <mesh position={[3, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#050a05" emissive="#00ffff" emissiveIntensity={0.05} wireframe />
      </mesh>

      {/* Holographic center display */}
      <mesh position={[0, 0.5, -1]}>
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={0.1} transparent opacity={0.1} wireframe />
      </mesh>

      {/* Grid Floor */}
      <gridHelper args={[20, 20, "#00ff41", "#051105"]} position={[0, -2, 0]} />
    </group>
  );
}

import { Stars } from "@react-three/drei";

export default function CockpitEnvironment() {
  return (
    <group>
      {/* Stars visible through windshield */}
      <Stars radius={80} depth={60} count={4000} factor={4} saturation={0} fade speed={0.5} />

      {/* ── COCKPIT FRAME ── */}

      {/* Left canopy strut */}
      <mesh position={[-1.8, 0.6, 0.8]} rotation={[0.1, 0.15, 0.45]}>
        <boxGeometry args={[0.06, 3.8, 0.06]} />
        <meshStandardMaterial color="#111418" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Right canopy strut */}
      <mesh position={[1.8, 0.6, 0.8]} rotation={[0.1, -0.15, -0.45]}>
        <boxGeometry args={[0.06, 3.8, 0.06]} />
        <meshStandardMaterial color="#111418" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Top canopy bar */}
      <mesh position={[0, 2.2, 0.3]}>
        <boxGeometry args={[3.8, 0.07, 0.07]} />
        <meshStandardMaterial color="#111418" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Center divider */}
      <mesh position={[0, 1.4, -0.2]}>
        <boxGeometry args={[0.05, 2.0, 0.05]} />
        <meshStandardMaterial color="#111418" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* ── MAIN DASHBOARD ── */}

      {/* Dashboard base — thick angled slab */}
      <mesh position={[0, -1.05, 0.85]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <boxGeometry args={[5.5, 2.5, 0.06]} />
        <meshStandardMaterial color="#080d08" metalness={0.7} roughness={0.6} />
      </mesh>

      {/* Dashboard top lip (glowing edge) */}
      <mesh position={[0, -0.36, 0.55]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <boxGeometry args={[5.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={2.5} />
      </mesh>

      {/* Dashboard instrument panels — left cluster */}
      <mesh position={[-1.6, -0.85, 0.92]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <boxGeometry args={[1.4, 1.0, 0.03]} />
        <meshStandardMaterial color="#0a120a" metalness={0.5} roughness={0.8}
          emissive="#00ff41" emissiveIntensity={0.04} />
      </mesh>

      {/* Dashboard instrument panels — right cluster */}
      <mesh position={[1.6, -0.85, 0.92]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <boxGeometry args={[1.4, 1.0, 0.03]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.5} roughness={0.8}
          emissive="#00ffff" emissiveIntensity={0.04} />
      </mesh>

      {/* Dashboard center MFD screen (Multi-Function Display) */}
      <mesh position={[0, -0.82, 0.88]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <boxGeometry args={[1.0, 1.0, 0.025]} />
        <meshStandardMaterial color="#020802" metalness={0.3} roughness={0.9}
          emissive="#00ff41" emissiveIntensity={0.08} />
      </mesh>

      {/* MFD screen glow border */}
      {[[-0.5, 0], [0.5, 0], [0, -0.5], [0, 0.5]].map(([dx, dy], i) => (
        <mesh key={i} position={[dx * 0.5, -0.82 + dy * 0.48, 0.9]} rotation={[-Math.PI / 2.8, 0, 0]}>
          <boxGeometry args={[i < 2 ? 0.02 : 1.0, i < 2 ? 1.0 : 0.02, 0.01]} />
          <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={1.5} />
        </mesh>
      ))}

      {/* ── SIDE CONSOLES ── */}

      {/* Left console */}
      <mesh position={[-2.6, -0.5, 0.6]} rotation={[0, Math.PI / 5, 0]}>
        <boxGeometry args={[0.06, 1.5, 1.2]} />
        <meshStandardMaterial color="#080d08" metalness={0.6} roughness={0.7} />
      </mesh>
      <mesh position={[-2.55, -0.5, 0.6]} rotation={[0, Math.PI / 5, 0]}>
        <boxGeometry args={[0.01, 1.4, 1.1]} />
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={0.15}
          transparent opacity={0.3} />
      </mesh>

      {/* Right console */}
      <mesh position={[2.6, -0.5, 0.6]} rotation={[0, -Math.PI / 5, 0]}>
        <boxGeometry args={[0.06, 1.5, 1.2]} />
        <meshStandardMaterial color="#080a0d" metalness={0.6} roughness={0.7} />
      </mesh>
      <mesh position={[2.55, -0.5, 0.6]} rotation={[0, -Math.PI / 5, 0]}>
        <boxGeometry args={[0.01, 1.4, 1.1]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.15}
          transparent opacity={0.3} />
      </mesh>

      {/* ── HUD GLASS PANE (faint windshield) ── */}
      <mesh position={[0, 0.8, -0.6]}>
        <planeGeometry args={[4.5, 3]} />
        <meshStandardMaterial color="#020d02" transparent opacity={0.08}
          emissive="#00ff41" emissiveIntensity={0.02} />
      </mesh>

      {/* Windshield scan-line grid on glass */}
      <mesh position={[0, 0.8, -0.59]}>
        <planeGeometry args={[4.5, 3]} />
        <meshStandardMaterial color="#00ff41" transparent opacity={0.03} wireframe />
      </mesh>

      {/* ── FLOOR / SEAT ── */}
      <mesh position={[0, -2.2, 0.8]}>
        <boxGeometry args={[5.5, 0.04, 3]} />
        <meshStandardMaterial color="#060806" metalness={0.5} roughness={0.9} />
      </mesh>

      {/* Grid floor glow */}
      <gridHelper args={[8, 16, "#00ff41", "#011001"]} position={[0, -2.18, 0.8]} />

      {/* ── AMBIENT GLOW STRIPS ── */}

      {/* Left glow strip */}
      <mesh position={[-2.2, -0.1, 0.9]}>
        <boxGeometry args={[0.02, 2.0, 0.02]} />
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={3} />
      </mesh>

      {/* Right glow strip */}
      <mesh position={[2.2, -0.1, 0.9]}>
        <boxGeometry args={[0.02, 2.0, 0.02]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

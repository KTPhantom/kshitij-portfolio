import { Html } from "@react-three/drei";
import { useState } from "react";
import { useCockpitStore, Section } from "@/store/useCockpitStore";

interface ControlProps {
  position: [number, number, number];
  color: string;
  label: string;
  section: Section;
}

function ControlButton({ position, color, label, section }: ControlProps) {
  const [hovered, setHovered] = useState(false);
  const setActiveSection = useCockpitStore((state) => state.setActiveSection);
  const activeSection = useCockpitStore((state) => state.activeSection);

  const isActive = activeSection === section;

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(section);
        }}
      >
        <boxGeometry args={[0.3, 0.1, 0.2]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isActive ? 1.5 : hovered ? 0.8 : 0.2} 
        />
      </mesh>
      
      {hovered && (
        <Html position={[0, 0.2, 0]} center>
          <div className="px-2 py-1 bg-black/80 border border-primary text-primary font-mono text-xs whitespace-nowrap backdrop-blur-sm pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function CockpitControls() {
  return (
    <group>
      <ControlButton position={[0, -0.2, 0.8]} color="#ffaa00" label="ENGINE START" section="hero" />
      <ControlButton position={[-1.5, 0.5, 0.5]} color="#00ff41" label="RADAR" section="skills" />
      <ControlButton position={[1.5, 0.5, 0.5]} color="#00ffff" label="NAV MAP" section="projects" />
      <ControlButton position={[-1.2, -0.4, 0.6]} color="#ffaa00" label="FLIGHT LOGS" section="experience" />
      <ControlButton position={[1.2, -0.4, 0.6]} color="#4444ff" label="COMM PANEL" section="contact" />
      <ControlButton position={[0, -0.6, 0.9]} color="#aa00ff" label="CERT ARCHIVE" section="certifications" />
    </group>
  );
}

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

useGLTF.preload("/cockpit.glb");

export default function CockpitModel() {
  const { scene } = useGLTF("/cockpit.glb");
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Boost emissive on any screen/display materials
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => enhanceMaterial(mat));
        } else if (mesh.material) {
          enhanceMaterial(mesh.material as THREE.MeshStandardMaterial);
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={1}
        position={[0, -1.2, 0]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
}

function enhanceMaterial(mat: THREE.Material) {
  const m = mat as THREE.MeshStandardMaterial;
  if (!m.isMeshStandardMaterial) return;

  // Darken non-emissive surfaces to match the cockpit theme
  if (m.emissiveIntensity === 0 || !m.emissive) {
    m.roughness = Math.max(m.roughness ?? 0.5, 0.4);
  }
  // Give any emissive elements a slight boost
  if (m.emissiveIntensity > 0) {
    m.emissiveIntensity = Math.min(m.emissiveIntensity * 1.4, 3);
  }
}

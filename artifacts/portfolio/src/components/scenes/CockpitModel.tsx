import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

useGLTF.preload("/cockpit.glb");

export default function CockpitModel() {
  const { scene } = useGLTF("/cockpit.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    const group = groupRef.current;

    // ── 1. Compute bounds of the raw scene ──────────────────────────
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // ── 2. Scale so the largest dimension = 5 units ─────────────────
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 5;
    const s = targetSize / maxDim;
    group.scale.setScalar(s);

    // ── 3. Centre the model at world origin ─────────────────────────
    group.position.set(
      -center.x * s,
      -center.y * s,
      -center.z * s
    );

    // ── 4. Enhance materials ─────────────────────────────────────────
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const mats = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      mats.forEach((mat) => {
        if (!mat) return;
        // Convert Lambert → Standard so we get PBR lighting
        if ((mat as any).isMeshLambertMaterial) {
          const lam = mat as THREE.MeshLambertMaterial;
          const std = new THREE.MeshStandardMaterial({
            name: lam.name,
            color: lam.color,
            map: lam.map,
            emissive: lam.emissive,
            emissiveMap: lam.emissiveMap,
            emissiveIntensity: lam.emissiveIntensity ?? 0,
            transparent: lam.transparent,
            opacity: lam.opacity,
            side: lam.side,
            roughness: 0.6,
            metalness: 0.3,
          });
          if (Array.isArray(mesh.material)) {
            const idx = mesh.material.indexOf(mat);
            mesh.material[idx] = std;
          } else {
            mesh.material = std;
          }
        }

        // Boost any existing emissive (screen glow etc.)
        const m = mat as THREE.MeshStandardMaterial;
        if (m.emissiveIntensity > 0) {
          m.emissiveIntensity = Math.min(m.emissiveIntensity * 2, 4);
        }
      });
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

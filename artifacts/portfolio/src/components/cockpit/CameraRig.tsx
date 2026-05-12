import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCockpitStore } from "@/store/useCockpitStore";

export default function CameraRig() {
  const { camera } = useThree();
  const cameraPosition = useCockpitStore((state) => state.cameraPosition);
  const cameraTarget = useCockpitStore((state) => state.cameraTarget);

  useEffect(() => {
    gsap.to(camera.position, {
      x: cameraPosition[0],
      y: cameraPosition[1],
      z: cameraPosition[2],
      duration: 1.5,
      ease: "power2.inOut",
    });

    const targetObj = { x: 0, y: 0, z: 0 }; // Temporary object for looking at
    gsap.to(targetObj, {
      x: cameraTarget[0],
      y: cameraTarget[1],
      z: cameraTarget[2],
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(targetObj.x, targetObj.y, targetObj.z);
      }
    });
  }, [camera, cameraPosition, cameraTarget]);

  return null;
}

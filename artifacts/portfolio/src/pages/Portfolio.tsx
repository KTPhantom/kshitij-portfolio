import { useCockpitStore } from "@/store/useCockpitStore";
import BootSequence from "@/components/hud/BootSequence";
import CockpitScene from "@/components/scenes/CockpitScene";
import HUDOverlay from "@/components/hud/HUDOverlay";
import SectionPanel from "@/components/hud/SectionPanel";
import CockpitDashboard from "@/components/hud/CockpitDashboard";
import ScanLine from "@/components/ui/ScanLine";

export default function Portfolio() {
  const { isBooting } = useCockpitStore();

  return (
    <div className="fixed inset-0 w-full h-full bg-[#050810] overflow-hidden font-sans select-none">
      {/* 3D atmospheric background */}
      <CockpitScene />

      {/* HUD + controls (post-boot only) */}
      {!isBooting && (
        <>
          <HUDOverlay />
          <SectionPanel />
          <CockpitDashboard />
        </>
      )}

      {/* Boot sequence (covers everything) */}
      {isBooting && <BootSequence />}

      {/* Subtle CRT scan line */}
      <ScanLine />
    </div>
  );
}

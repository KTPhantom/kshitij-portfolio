import { useCockpitStore } from "@/store/useCockpitStore";
import BootSequence from "@/components/hud/BootSequence";
import CockpitScene from "@/components/scenes/CockpitScene";
import HUDOverlay from "@/components/hud/HUDOverlay";
import SectionPanel from "@/components/hud/SectionPanel";
import CockpitNav from "@/components/hud/CockpitNav";
import ScanLine from "@/components/ui/ScanLine";

export default function Portfolio() {
  const { isBooting } = useCockpitStore();

  return (
    <div className="fixed inset-0 w-full h-full bg-background overflow-hidden font-sans select-none">
      <CockpitScene />
      
      {!isBooting && (
        <>
          <HUDOverlay />
          <SectionPanel />
          <CockpitNav />
        </>
      )}

      {isBooting && <BootSequence />}
      <ScanLine />
    </div>
  );
}

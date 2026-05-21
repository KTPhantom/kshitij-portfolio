import { useCockpitStore } from "@/store/useCockpitStore";
import BootSequence from "@/components/hud/BootSequence";
import CockpitBackground from "@/components/hud/CockpitBackground";
import CockpitScene from "@/components/scenes/CockpitScene";
import HUDOverlay from "@/components/hud/HUDOverlay";
import FloatingNav from "@/components/hud/FloatingNav";
import OnboardingOverlay from "@/components/hud/OnboardingOverlay";
import ScanLine from "@/components/ui/ScanLine";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Portfolio() {
  const { isBooting } = useCockpitStore();

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen w-full font-sans select-none text-white bg-transparent">
        {/* CSS cockpit background — fixed behind everything */}
        <CockpitBackground />

        {/* 3D atmospheric cockpit layer (fixed in viewport) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <CockpitScene />
        </div>

        {/* Custom cursor (fixed at top layer) */}
        <CustomCursor />

        {/* HUD Overlay + Navigation (post-boot only) */}
        {!isBooting && (
          <>
            <HUDOverlay />
            <FloatingNav />
            <OnboardingOverlay />
          </>
        )}

        {/* Scrollable content layer */}
        {!isBooting && (
          <div className="relative z-20 w-full flex flex-col items-center">
            <HeroSection />
            <StatsSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <CertificationsSection />
            <ContactSection />
          </div>
        )}

        {/* Boot sequence (covers everything) */}
        {isBooting && <BootSequence />}

        {/* Subtle CRT scan line */}
        <ScanLine />
      </div>
    </SmoothScrollProvider>
  );
}

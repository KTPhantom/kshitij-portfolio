import { useEffect } from "react";
import { useCockpitStore } from "@/store/useCockpitStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const { isBooting } = useCockpitStore();

  useEffect(() => {
    if (isBooting) return;

    // Wait for React rendering & DOM styling to settle, then refresh ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    
    return () => clearTimeout(timer);
  }, [isBooting]);

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

        {/* Scrollable content layer (block container instead of flexbox to prevent ScrollTrigger pinSpacing issues) */}
        {!isBooting && (
          <div className="relative z-20 w-full">
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

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCockpitStore } from "@/store/useCockpitStore";
import { portfolio } from "@/data/portfolio";

export default function HUDOverlay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const activeSection = useCockpitStore((state) => state.activeSection);
  
  // Find current cockpit label
  const cockpitLabel = Object.entries(portfolio.cockpitMap).find(
    ([_, section]) => section === activeSection
  )?.[0] || "SYSTEM ACTIVE";

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none font-mono text-sm mix-blend-screen overflow-hidden">
      
      {/* Top Left */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
        className="absolute top-6 left-6 text-foreground flex flex-col gap-1"
      >
        <div className="font-bold text-lg">{portfolio.hero.callsign}</div>
        <div className="text-xs text-primary">CLEARANCE: {portfolio.hero.clearanceLevel}</div>
        <div className="text-xs">{time}</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          <span className="text-xs">SYSTEMS ONLINE</span>
        </div>
      </motion.div>

      {/* Top Right */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
        className="absolute top-6 right-6 text-right text-foreground flex flex-col gap-1"
      >
        <div className="font-bold text-primary">{cockpitLabel}</div>
        <div className="text-xs">27.4° N 77.6° E</div>
        <div className="text-xs">ALT: 35,000 FT</div>
        <div className="text-xs text-blue-400">MACH 2.1</div>
      </motion.div>

      {/* Bottom Left */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="absolute bottom-16 left-6 text-foreground flex flex-col gap-1"
      >
        <div className="text-xs">SYSTEMS: NOMINAL</div>
        <div className="text-xs text-primary">FUEL: 87%</div>
      </motion.div>

      {/* Bottom Right - Radar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
        className="absolute bottom-16 right-6 flex flex-col items-end gap-2"
      >
        <div className="relative w-16 h-16 rounded-full border border-foreground/30 bg-background/50 overflow-hidden">
          <div className="absolute inset-0 border border-foreground rounded-full opacity-50" />
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,255,65,0.5)_360deg)] animate-[spin_3s_linear_infinite]" />
        </div>
        <div className="text-xs text-foreground">RADAR: ACTIVE</div>
      </motion.div>

      {/* Center Targeting Reticle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-px h-32 bg-foreground" />
        <div className="w-32 h-px bg-foreground absolute" />
        <div className="w-16 h-16 border border-foreground rounded-full absolute" />
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-foreground/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-foreground/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-foreground/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-foreground/50" />

    </div>
  );
}

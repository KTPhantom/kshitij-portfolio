import { useEffect } from "react";
import { useCockpitStore, Section } from "@/store/useCockpitStore";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems: { id: Section; label: string; number: string; color: string }[] = [
  { id: "hero", label: "ENGINE", number: "01", color: "#ffaa00" },
  { id: "skills", label: "SYSTEMS", number: "02", color: "#00ff41" },
  { id: "projects", label: "MISSIONS", number: "03", color: "#00ffff" },
  { id: "experience", label: "FLIGHTS", number: "04", color: "#ffaa00" },
  { id: "certifications", label: "MEDALS", number: "05", color: "#cc44ff" },
  { id: "contact", label: "COMMUNICATION", number: "06", color: "#4488ff" },
];

export default function FloatingNav() {
  const activeSection = useCockpitStore((s) => s.activeSection);
  const setActiveSection = useCockpitStore((s) => s.setActiveSection);

  useEffect(() => {
    // Sync scroll triggers with activeSection state
    navItems.forEach((item) => {
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveSection(item.id),
        onEnterBack: () => setActiveSection(item.id),
      });
    });
  }, [setActiveSection]);

  const handleNavClick = (id: Section) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Sidebar Floating Nav */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 p-4 border border-green-500/20 bg-black/60 backdrop-blur-md rounded-lg font-mono pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.4)]"
      >
        <div className="text-[7px] text-green-500/40 border-b border-green-500/10 pb-2 text-center tracking-widest font-bold">
          NAV.DEC.01
        </div>

        <div className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-end gap-3 text-right group cursor-pointer border-none bg-transparent p-0"
                data-cursor="GOTO"
              >
                {/* Text label - slides/fades in on hover and active */}
                <span
                  className={`text-[9px] font-bold tracking-widest transition-all duration-200 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
                  }`}
                  style={{ color: isActive ? item.color : "#94a3b8" }}
                >
                  {item.label}
                </span>
                
                {/* Number and dot indicator */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[8px] tracking-tighter"
                    style={{ color: isActive ? "#ffffff" : "#64748b" }}
                  >
                    {item.number}
                  </span>
                  <div
                    className={`w-2.5 h-2.5 rounded-sm border transition-all duration-300 ${
                      isActive ? "scale-110 rotate-45" : "scale-100 hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: isActive ? item.color : "transparent",
                      borderColor: isActive ? item.color : "rgba(0, 255, 65, 0.3)",
                      boxShadow: isActive ? `0 0 10px ${item.color}` : "none",
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Mobile Bottom Pill Nav */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden flex gap-2.5 p-2 bg-black/80 border border-green-500/20 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(0,0,0,0.65)] pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border transition-all duration-250 cursor-pointer p-0"
              style={{
                borderColor: isActive ? item.color : "rgba(0, 255, 65, 0.15)",
                color: isActive ? item.color : "rgba(148, 163, 184, 0.6)",
                backgroundColor: isActive ? `${item.color}15` : "transparent",
                boxShadow: isActive ? `0 0 8px ${item.color}33` : "none",
              }}
            >
              {item.number}
            </button>
          );
        })}
      </div>
    </>
  );
}

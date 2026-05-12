import { motion } from "framer-motion";
import { useCockpitStore, Section } from "@/store/useCockpitStore";

interface ControlDef {
  id: Section;
  label: string;
  sublabel: string;
  color: string;
  glowClass: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
}

const controls: ControlDef[] = [
  {
    id: "hero",
    label: "ENGINE",
    sublabel: "START",
    color: "#ffaa00",
    glowClass: "shadow-[0_0_12px_#ffaa00]",
    borderClass: "border-amber-500/60",
    bgClass: "bg-amber-900/20",
    textClass: "text-amber-400",
  },
  {
    id: "skills",
    label: "RADAR",
    sublabel: "SYSTEMS",
    color: "#00ff41",
    glowClass: "shadow-[0_0_12px_#00ff41]",
    borderClass: "border-green-500/60",
    bgClass: "bg-green-900/20",
    textClass: "text-green-400",
  },
  {
    id: "projects",
    label: "NAV",
    sublabel: "MAP",
    color: "#00ffff",
    glowClass: "shadow-[0_0_12px_#00ffff]",
    borderClass: "border-cyan-500/60",
    bgClass: "bg-cyan-900/20",
    textClass: "text-cyan-400",
  },
  {
    id: "experience",
    label: "FLIGHT",
    sublabel: "LOGS",
    color: "#ffaa00",
    glowClass: "shadow-[0_0_12px_#ffaa00]",
    borderClass: "border-amber-500/60",
    bgClass: "bg-amber-900/20",
    textClass: "text-amber-400",
  },
  {
    id: "certifications",
    label: "CERT",
    sublabel: "ARCHIVE",
    color: "#cc44ff",
    glowClass: "shadow-[0_0_12px_#cc44ff]",
    borderClass: "border-purple-500/60",
    bgClass: "bg-purple-900/20",
    textClass: "text-purple-400",
  },
  {
    id: "contact",
    label: "COMM",
    sublabel: "PANEL",
    color: "#4488ff",
    glowClass: "shadow-[0_0_12px_#4488ff]",
    borderClass: "border-blue-500/60",
    bgClass: "bg-blue-900/20",
    textClass: "text-blue-400",
  },
];

export default function CockpitDashboard() {
  const activeSection = useCockpitStore((s) => s.activeSection);
  const setActiveSection = useCockpitStore((s) => s.setActiveSection);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none"
    >
      {/* Outer panel frame */}
      <div className="mx-auto max-w-5xl px-4 pb-3">
        {/* Top ridge line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500/40 to-transparent mb-1" />

        {/* Main panel */}
        <div
          className="relative bg-[#050a05]/90 backdrop-blur-md border border-green-900/60 pointer-events-auto"
          style={{ clipPath: "polygon(1% 0%, 99% 0%, 100% 100%, 0% 100%)" }}
        >
          {/* Panel grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Inner content */}
          <div className="relative px-6 py-3 flex items-center gap-3">
            {/* Left status cluster */}
            <div className="flex flex-col gap-1 mr-3 shrink-0">
              <div className="text-[9px] font-mono text-green-500/70">SYS</div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse [animation-delay:0.3s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse [animation-delay:0.6s]" />
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-green-900/60 shrink-0" />

            {/* Control buttons */}
            <div className="flex-1 flex items-center justify-center gap-2 md:gap-3">
              {controls.map((ctrl, i) => {
                const isActive = activeSection === ctrl.id;
                return (
                  <motion.button
                    key={ctrl.id}
                    data-testid={`nav-${ctrl.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    onClick={() => setActiveSection(ctrl.id)}
                    className={`
                      relative flex flex-col items-center justify-center
                      w-16 h-14 md:w-20 md:h-16 border transition-all duration-200 cursor-pointer select-none
                      font-mono text-[9px] md:text-[10px] tracking-wider
                      ${ctrl.borderClass} ${ctrl.bgClass}
                      ${isActive ? `${ctrl.glowClass} scale-105` : "hover:scale-105 hover:brightness-125"}
                    `}
                    style={{
                      clipPath: "polygon(5% 0%, 95% 0%, 100% 15%, 100% 85%, 95% 100%, 5% 100%, 0% 85%, 0% 15%)",
                    }}
                  >
                    {/* Active indicator dot */}
                    <div
                      className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-all ${
                        isActive ? "opacity-100 animate-pulse" : "opacity-30"
                      }`}
                      style={{ backgroundColor: ctrl.color }}
                    />

                    {/* Button glow fill when active */}
                    {isActive && (
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundColor: ctrl.color }}
                      />
                    )}

                    {/* Label text */}
                    <span className={`font-bold text-[10px] md:text-xs leading-none ${ctrl.textClass}`}>
                      {ctrl.label}
                    </span>
                    <span className={`text-[8px] md:text-[9px] opacity-70 mt-0.5 ${ctrl.textClass}`}>
                      {ctrl.sublabel}
                    </span>

                    {/* Bottom scan bar when active */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5"
                        style={{ backgroundColor: ctrl.color }}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-green-900/60 shrink-0" />

            {/* Right status cluster */}
            <div className="flex flex-col items-end gap-1 ml-3 shrink-0">
              <div className="text-[9px] font-mono text-green-500/70">ALT</div>
              <div className="text-[10px] font-mono text-amber-400 leading-none">35K</div>
              <div className="text-[8px] font-mono text-green-500/50">FT</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

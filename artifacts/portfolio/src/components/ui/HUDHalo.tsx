import { motion } from "framer-motion";

interface HUDHaloProps {
  color?: "green" | "cyan" | "amber" | "purple";
  className?: string;
}

export default function HUDHalo({ color = "green", className = "" }: HUDHaloProps) {
  const colorMap = {
    green: {
      border: "border-green-500/15",
      text: "text-green-500/30",
      glow: "shadow-[0_0_20px_rgba(0,255,65,0.03)]",
      line: "bg-green-500/15",
      bracket: "border-green-500/25",
      pulse: "bg-green-500/30",
    },
    cyan: {
      border: "border-cyan-500/15",
      text: "text-cyan-500/30",
      glow: "shadow-[0_0_20px_rgba(0,255,255,0.03)]",
      line: "bg-cyan-500/15",
      bracket: "border-cyan-500/25",
      pulse: "bg-cyan-500/30",
    },
    amber: {
      border: "border-amber-500/15",
      text: "text-amber-500/30",
      glow: "shadow-[0_0_20px_rgba(255,170,0,0.03)]",
      line: "bg-amber-500/15",
      bracket: "border-amber-500/25",
      pulse: "bg-amber-500/30",
    },
    purple: {
      border: "border-purple-500/15",
      text: "text-purple-500/30",
      glow: "shadow-[0_0_20px_rgba(204,68,255,0.03)]",
      line: "bg-purple-500/15",
      bracket: "border-purple-500/25",
      pulse: "bg-purple-500/30",
    }
  };

  const theme = colorMap[color];

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 ${className}`}>
      <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] flex items-center justify-center opacity-40 md:opacity-60">
        
        {/* Outer Rotating Compass Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full border border-dashed ${theme.border} ${theme.glow}`}
        />

        {/* Middle Solid Ring with Tick Marks */}
        <div className={`absolute w-[82%] h-[82%] rounded-full border border-double ${theme.border} flex items-center justify-center`}>
          {/* Compass labels */}
          <div className={`absolute top-2 font-mono text-[7px] md:text-[8px] font-bold ${theme.text}`}>N 000°</div>
          <div className={`absolute right-2 font-mono text-[7px] md:text-[8px] font-bold ${theme.text}`}>E 090°</div>
          <div className={`absolute bottom-2 font-mono text-[7px] md:text-[8px] font-bold ${theme.text}`}>S 180°</div>
          <div className={`absolute left-2 font-mono text-[7px] md:text-[8px] font-bold ${theme.text}`}>W 270°</div>
        </div>

        {/* Inner Ring with Crosshairs */}
        <div className={`absolute w-[55%] h-[55%] rounded-full border ${theme.border}`}>
          {/* Pitch Ladder Marks */}
          <div className="absolute inset-0 flex flex-col justify-between items-center py-6 font-mono text-[6px] md:text-[7px]">
            <div className={`flex gap-3 items-center ${theme.text}`}>
              <span>+10</span>
              <div className={`w-5 h-px ${theme.line}`} />
              <span>+10</span>
            </div>
            <div className={`flex gap-3 items-center ${theme.text}`}>
              <span>+05</span>
              <div className={`w-3 h-px ${theme.line}`} />
              <span>+05</span>
            </div>
            <div className="w-10 h-px bg-transparent" /> {/* Center space */}
            <div className={`flex gap-3 items-center ${theme.text}`}>
              <span>-05</span>
              <div className={`w-3 h-px ${theme.line}`} />
              <span>-05</span>
            </div>
            <div className={`flex gap-3 items-center ${theme.text}`}>
              <span>-10</span>
              <div className={`w-5 h-px ${theme.line}`} />
              <span>-10</span>
            </div>
          </div>
        </div>

        {/* Horizontal & Vertical Crosshair Lines (with gap in center) */}
        <div className={`absolute left-0 right-0 h-px ${theme.line} opacity-30`} />
        <div className={`absolute top-0 bottom-0 w-px ${theme.line} opacity-30`} />
        <div className="absolute w-24 h-24 rounded-full bg-transparent" /> {/* clears center */}

        {/* Target Corner Brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-3 h-3 md:w-5 md:h-5 ${theme.bracket} ${cls}`} />
        ))}

        {/* Center Target Box */}
        <div className={`absolute w-8 h-8 md:w-10 md:h-10 border ${theme.border} flex items-center justify-center`}>
          {/* Target Acknowledge cross */}
          <div className={`w-1.5 h-1.5 rounded-full ${theme.pulse} animate-ping`} />
        </div>

        {/* Tech readouts on the side of the halo */}
        <div className={`absolute left-[6%] top-[35%] font-mono text-[6px] md:text-[7px] ${theme.text} flex flex-col gap-0.5 select-none text-left`}>
          <div>FCS: ACTIVE</div>
          <div>RAD: SCAN</div>
          <div>LOCK: N/A</div>
        </div>

        <div className={`absolute right-[6%] bottom-[35%] font-mono text-[6px] md:text-[7px] ${theme.text} flex flex-col gap-0.5 select-none text-right`}>
          <div>SYS: NOMINAL</div>
          <div>ALT: COUPL</div>
          <div>MODE: NAV</div>
        </div>

      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCockpitStore } from "@/store/useCockpitStore";
import { portfolio } from "@/data/portfolio";

function RadarDisplay() {
  return (
    <div className="relative w-28 h-28">
      {/* Rings */}
      {[28, 42, 56].map((r, i) => (
        <div
          key={i}
          className="absolute border border-green-500/20 rounded-full"
          style={{
            width: r * 2,
            height: r * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
      {/* Cross hairs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-green-500/15" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-full bg-green-500/15" />
      </div>
      {/* Sweep */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ animation: "spin 3s linear infinite" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(0,255,65,0.08) 310deg, rgba(0,255,65,0.5) 360deg)",
          }}
        />
      </div>
      {/* Blip dots */}
      {[
        { top: "30%", left: "60%", delay: "0s" },
        { top: "65%", left: "35%", delay: "1.2s" },
        { top: "45%", left: "20%", delay: "2.1s" },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-green-400"
          style={{
            top: dot.top,
            left: dot.left,
            animation: `blip 3s ${dot.delay} ease-in-out infinite`,
          }}
        />
      ))}
      {/* Center dot */}
      <div className="absolute w-2 h-2 rounded-full bg-green-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Label */}
      <div className="absolute -bottom-5 left-0 right-0 text-center text-[8px] font-mono text-green-500/60 tracking-widest">
        RADAR ACTIVE
      </div>

      <style>{`
        @keyframes blip {
          0%,100% { opacity:0; transform:scale(0.5); }
          50% { opacity:1; transform:scale(1); }
        }
      `}</style>
    </div>
  );
}

function AltitudeTape({ value }: { value: number }) {
  const ticks = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <div className="flex flex-col items-end gap-0">
      <div className="text-[8px] font-mono text-green-500/50 mb-1">ALT FT</div>
      <div className="relative w-14 border border-green-500/20 bg-black/40 overflow-hidden" style={{ height: 100 }}>
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute right-0 flex items-center gap-1 w-full"
            style={{ top: `${50 + t * -14}%`, transform: "translateY(-50%)" }}
          >
            <div className={`flex-1 h-px ${t === 0 ? "bg-amber-400" : "bg-green-500/20"}`} />
            <div className={`text-[7px] font-mono pr-1 ${t === 0 ? "text-amber-400" : "text-green-500/40"}`}>
              {((value + t * 1000) / 1000).toFixed(0)}K
            </div>
          </div>
        ))}
        {/* Indicator */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-amber-400" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 border-l-4 border-y-4 border-l-amber-400 border-y-transparent w-0 h-0" />
      </div>
      <div className="text-[9px] font-mono text-amber-400 mt-1">{value.toLocaleString()}</div>
    </div>
  );
}

function SpeedTape({ value }: { value: number }) {
  const ticks = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <div className="flex flex-col items-start gap-0">
      <div className="text-[8px] font-mono text-cyan-500/50 mb-1">SPD KTS</div>
      <div className="relative w-14 border border-cyan-500/20 bg-black/40 overflow-hidden" style={{ height: 100 }}>
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute left-0 flex items-center gap-1 w-full"
            style={{ top: `${50 + t * -14}%`, transform: "translateY(-50%)" }}
          >
            <div className={`text-[7px] font-mono pl-1 ${t === 0 ? "text-cyan-400" : "text-cyan-500/40"}`}>
              {value + t * 50}
            </div>
            <div className={`flex-1 h-px ${t === 0 ? "bg-cyan-400" : "bg-cyan-500/20"}`} />
          </div>
        ))}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-cyan-400" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 border-r-4 border-y-4 border-r-cyan-400 border-y-transparent w-0 h-0" />
      </div>
      <div className="text-[9px] font-mono text-cyan-400 mt-1">M {(value / 700).toFixed(2)}</div>
    </div>
  );
}

function HeadingTape() {
  const [heading, setHeading] = useState(275);
  useEffect(() => {
    const t = setInterval(() => setHeading((h) => (h + 0.05) % 360), 100);
    return () => clearInterval(t);
  }, []);

  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-[8px] font-mono text-green-500/50">HDG</div>
      <div className="relative w-48 h-8 border border-green-500/20 bg-black/40 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 flex items-center"
          style={{
            left: "50%",
            transform: `translateX(calc(-50% - ${(heading % 360) * 0.4}px))`,
            transition: "transform 0.1s linear",
            width: "800px",
          }}
        >
          {Array.from({ length: 37 }).map((_, i) => {
            const deg = i * 10;
            return (
              <div key={i} className="flex flex-col items-center" style={{ width: 40 }}>
                <div
                  className="font-mono"
                  style={{ fontSize: 7, color: deg % 90 === 0 ? "rgba(255,170,0,0.8)" : "rgba(0,255,65,0.3)" }}
                >
                  {deg % 90 === 0 ? dirs[deg / 45] || deg : deg}
                </div>
                <div
                  className="h-2 w-px mt-0.5"
                  style={{ background: deg % 90 === 0 ? "rgba(255,170,0,0.6)" : "rgba(0,255,65,0.2)" }}
                />
              </div>
            );
          })}
        </div>
        {/* Center marker */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-amber-400 w-0 h-0" />
      </div>
      <div className="text-[10px] font-mono text-amber-400">{Math.round(heading).toString().padStart(3, "0")}°</div>
    </div>
  );
}

function ArtificialHorizon() {
  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-green-500/30 bg-black/50">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001a2e] to-[#002a1a]" />
      {/* Ground */}
      <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-b from-[#1a0e00] to-[#0d0800]" />
      {/* Horizon line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-amber-400/80 -translate-y-1/2" />
      {/* Pitch ladder */}
      {[-1, 1].map((s) => (
        <div
          key={s}
          className="absolute left-1/4 right-1/4 h-px bg-white/20"
          style={{ top: `calc(50% + ${s * 14}px)` }}
        />
      ))}
      {/* Aircraft symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-12 h-1">
          <div className="absolute left-0 right-1/2 h-px bg-amber-400 top-0" />
          <div className="absolute left-1/2 right-0 h-px bg-amber-400 top-0" />
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 -top-1" />
        </div>
      </div>
      <div className="absolute -bottom-4 left-0 right-0 text-center text-[7px] font-mono text-green-500/50">
        ATT
      </div>
    </div>
  );
}

export default function HUDOverlay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const activeSection = useCockpitStore((s) => s.activeSection);

  const cockpitLabel =
    Object.entries(portfolio.cockpitMap).find(([_, sec]) => sec === activeSection)?.[0] ||
    "SYSTEM ACTIVE";

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none font-mono overflow-hidden">

      {/* ═══ TOP BAR ═══ */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-[15%] py-2 border-b border-green-900/30"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,15,5,0.6) 20%, rgba(0,15,5,0.6) 80%, transparent)" }}
      >
        <div className="flex items-center gap-4 text-[10px] text-green-500/70">
          <span className="text-amber-400 font-bold">{portfolio.hero.callsign}</span>
          <span>CLR: {portfolio.hero.clearanceLevel}</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* Center mode display */}
        <motion.div
          key={cockpitLabel}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[11px] font-bold text-amber-400 tracking-[0.3em] px-4 py-1 border border-amber-500/30 bg-amber-900/10"
        >
          ◈ {cockpitLabel} ◈
        </motion.div>

        <div className="flex items-center gap-4 text-[10px] text-green-500/70 text-right">
          <span>{time}</span>
          <span>27.4°N 77.6°E</span>
          <span className="text-cyan-400">MACH 2.1</span>
        </div>
      </motion.div>

      {/* ═══ LEFT SIDE ─ Speed tape + instruments ═══ */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute hidden lg:flex flex-col gap-6 items-start"
        style={{ left: "14%", top: "15%" }}
      >
        <SpeedTape value={1470} />
        <ArtificialHorizon />
      </motion.div>

      {/* ═══ RIGHT SIDE ─ Altitude tape + radar ═══ */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute hidden lg:flex flex-col gap-6 items-end"
        style={{ right: "14%", top: "15%" }}
      >
        <AltitudeTape value={35000} />
        <RadarDisplay />
      </motion.div>

      {/* ═══ CENTER ─ Heading tape ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute left-1/2 -translate-x-1/2 hidden md:block"
        style={{ top: "10%" }}
      >
        <HeadingTape />
      </motion.div>

      {/* ═══ CENTER ─ Targeting reticle ═══ */}
      <div className="absolute inset-0 flex items-center justify-center hidden md:flex" style={{ marginTop: "-6%" }}>
        {/* Outer ring */}
        <div className="absolute w-40 h-40 rounded-full border border-green-500/10" />
        {/* Inner ring */}
        <div className="absolute w-24 h-24 rounded-full border border-green-500/15" />
        {/* Cross */}
        <div className="absolute w-48 h-px bg-green-500/10" />
        <div className="absolute w-px h-48 bg-green-500/10" />
        {/* Corner brackets (inner) */}
        {[
          "top-12 left-12 border-t border-l",
          "top-12 right-12 border-t border-r",
          "bottom-12 left-12 border-b border-l",
          "bottom-12 right-12 border-b border-r",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 border-green-500/30 ${cls}`} />
        ))}
        {/* Center dot */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-green-500/40" />
      </div>

      {/* ═══ STATUS STRIP ─ bottom left ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute hidden lg:flex flex-col gap-1.5"
        style={{ left: "14%", bottom: "28%" }}
      >
        {[
          { label: "FUEL", value: 87, color: "bg-green-500" },
          { label: "THRUST", value: 100, color: "bg-amber-500" },
          { label: "SHIELD", value: 72, color: "bg-cyan-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="text-[8px] text-green-500/50 w-12">{label}</div>
            <div className="w-20 h-1.5 bg-green-900/30 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </div>
            <div className="text-[8px] text-green-500/50">{value}%</div>
          </div>
        ))}
      </motion.div>

      {/* ═══ MISSION DATA ─ bottom right ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="absolute hidden lg:flex flex-col items-end gap-1 text-[8px] text-green-500/50"
        style={{ right: "14%", bottom: "28%" }}
      >
        <div>MISSION: <span className="text-amber-400/70">KTP-PORTFOLIO-01</span></div>
        <div>UPTIME: <span className="text-green-400/70">99.8%</span></div>
        <div>CGPA: <span className="text-green-400/70">8.53 / 10.0</span></div>
        <div>STATUS: <span className="text-green-400 animate-pulse">◉ NOMINAL</span></div>
      </motion.div>

      {/* ═══ CORNER BRACKETS ═══ */}
      {[
        "top-3 left-3 border-t-2 border-l-2",
        "top-3 right-3 border-t-2 border-r-2",
        "bottom-3 left-3 border-b-2 border-l-2",
        "bottom-3 right-3 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 border-green-500/40 ${cls}`} />
      ))}

      {/* ═══ SIDE DATA STREAMS ═══ */}
      <div className="absolute top-16 left-3 hidden xl:flex flex-col gap-0.5">
        {["AI-ENGINE", "FULLSTACK", "ML-OPS", "CLOUD-SVC", "EMBEDDED"].map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 1 + i * 0.3, duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-[7px] font-mono text-green-500/40 tracking-wider"
          >
            {s}
          </motion.div>
        ))}
      </div>

      <div className="absolute top-16 right-3 hidden xl:flex flex-col items-end gap-0.5">
        {["REACT", "NODE", "PYTHON", "PYTORCH", "AWS"].map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 1.5 + i * 0.3, duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-[7px] font-mono text-cyan-500/40 tracking-wider"
          >
            {s}
          </motion.div>
        ))}
      </div>


    </div>
  );
}

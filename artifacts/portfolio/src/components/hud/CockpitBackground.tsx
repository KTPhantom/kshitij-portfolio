import { motion } from "framer-motion";

export default function CockpitBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020508]">

      {/* ── STAR FIELD ── */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: Math.random() > 0.9 ? "2px" : "1px",
              height: Math.random() > 0.9 ? "2px" : "1px",
              opacity: 0.2 + Math.random() * 0.6,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* ── HORIZON GLOW ── */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "52%",
          height: "3px",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.15) 20%, rgba(0,255,65,0.4) 50%, rgba(0,255,65,0.15) 80%, transparent 100%)",
        }}
      />
      {/* Horizon atmospheric glow */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "44%",
          height: "18%",
          background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0,255,65,0.06) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── PERSPECTIVE GRID FLOOR ── */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "52%",
          height: "48%",
          perspective: "400px",
          perspectiveOrigin: "50% 0%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: "rotateX(75deg)",
            transformOrigin: "50% 0%",
            backgroundImage:
              "linear-gradient(rgba(0,255,65,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.25) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "center 0",
            animation: "gridScroll 3s linear infinite",
          }}
        />
      </div>

      {/* ── COCKPIT CANOPY FRAME ── */}
      {/* Center divider bar (top of windshield) */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: 0,
          width: "6px",
          height: "50%",
          background: "linear-gradient(180deg, #0d1117 0%, #151c22 60%, transparent 100%)",
          boxShadow: "0 0 20px rgba(0,255,65,0.05)",
        }}
      />

      {/* Left canopy strut */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: "10%",
          width: "5px",
          height: "55%",
          background: "linear-gradient(180deg, #0d1117 0%, #111 70%, transparent 100%)",
          transform: "rotate(8deg)",
          transformOrigin: "top center",
        }}
      />

      {/* Right canopy strut */}
      <div
        className="absolute"
        style={{
          top: 0,
          right: "10%",
          width: "5px",
          height: "55%",
          background: "linear-gradient(180deg, #0d1117 0%, #111 70%, transparent 100%)",
          transform: "rotate(-8deg)",
          transformOrigin: "top center",
        }}
      />

      {/* Canopy top bar */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: 0,
          height: "28px",
          background: "linear-gradient(180deg, #0c1012 0%, transparent 100%)",
        }}
      />

      {/* ── SIDE CONSOLE PANELS ── */}
      {/* Left console */}
      <div
        className="absolute top-0 bottom-0 left-0"
        style={{
          width: "13%",
          background:
            "linear-gradient(90deg, #04090a 0%, rgba(0,20,12,0.95) 70%, transparent 100%)",
          borderRight: "1px solid rgba(0,255,65,0.12)",
        }}
      >
        {/* Left console glow strip */}
        <div
          className="absolute right-0 top-16 bottom-24"
          style={{
            width: "2px",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,255,65,0.6) 30%, rgba(0,255,65,0.6) 70%, transparent 100%)",
            boxShadow: "0 0 12px rgba(0,255,65,0.4)",
          }}
        />
        {/* Left console data bars */}
        <div className="absolute inset-x-3 top-20 flex flex-col gap-3">
          {[85, 62, 91, 45, 78].map((val, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <div className="text-[7px] font-mono text-green-500/50">SYS-{String(i + 1).padStart(2, "0")}</div>
              <div className="h-1 bg-green-900/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${val}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right console */}
      <div
        className="absolute top-0 bottom-0 right-0"
        style={{
          width: "13%",
          background:
            "linear-gradient(270deg, #04080a 0%, rgba(0,12,20,0.95) 70%, transparent 100%)",
          borderLeft: "1px solid rgba(0,200,255,0.12)",
        }}
      >
        {/* Right console glow strip */}
        <div
          className="absolute left-0 top-16 bottom-24"
          style={{
            width: "2px",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,200,255,0.6) 30%, rgba(0,200,255,0.6) 70%, transparent 100%)",
            boxShadow: "0 0 12px rgba(0,200,255,0.4)",
          }}
        />
        {/* Right console data bars */}
        <div className="absolute inset-x-3 top-20 flex flex-col gap-3">
          {[92, 71, 55, 88, 40].map((val, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <div className="text-[7px] font-mono text-cyan-500/50">NET-{String(i + 1).padStart(2, "0")}</div>
              <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${val}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DASHBOARD BOTTOM FRAME ── */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          height: "28%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(4,10,6,0.8) 40%, #040a06 100%)",
          borderTop: "1px solid rgba(0,255,65,0.15)",
        }}
      >
        {/* Dashboard top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.4) 30%, rgba(255,170,0,0.6) 50%, rgba(0,255,65,0.4) 70%, transparent 100%)",
            boxShadow: "0 0 8px rgba(0,255,65,0.3)",
          }}
        />

        {/* Dashboard inner glow panels */}
        <div className="absolute top-3 left-[14%] right-[14%] flex gap-3 px-4">
          {/* Left MFD */}
          <div
            className="flex-1 h-16 border border-green-900/40 bg-black/30"
            style={{ boxShadow: "inset 0 0 20px rgba(0,255,65,0.05)" }}
          >
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(0,255,65,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
          </div>
          {/* Center MFD */}
          <div
            className="flex-1 h-16 border border-amber-900/40 bg-black/30"
            style={{ boxShadow: "inset 0 0 20px rgba(255,170,0,0.05)" }}
          />
          {/* Right MFD */}
          <div
            className="flex-1 h-16 border border-cyan-900/40 bg-black/30"
            style={{ boxShadow: "inset 0 0 20px rgba(0,200,255,0.05)" }}
          />
        </div>
      </div>

      {/* ── ANIMATED SCAN LINE ── */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(0,255,65,0.15)", boxShadow: "0 0 8px rgba(0,255,65,0.2)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* ── VIGNETTE ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(2,5,8,0.7) 100%)",
        }}
      />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes gridScroll {
          from { backgroundPosition: center 0; }
          to { backgroundPosition: center 60px; }
        }
      `}</style>
    </div>
  );
}

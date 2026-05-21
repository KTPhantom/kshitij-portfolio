import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("ktp-onboarding-seen");
    if (!seen) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("ktp-onboarding-seen", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center font-mono"
          style={{ background: "rgba(0,5,0,0.85)", backdropFilter: "blur(4px)" }}
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="border border-green-500/40 bg-black/80 p-8 max-w-sm w-full mx-4 relative"
            style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/60" />

            {/* Header */}
            <div className="text-[10px] text-green-500/50 tracking-widest mb-4">◈ SYSTEM BRIEFING ◈</div>

            {/* Pilot welcome */}
            <div className="text-amber-400 font-bold text-lg mb-1">Welcome, Pilot.</div>
            <div className="text-green-400/80 text-xs mb-6 leading-relaxed">
              You are now in control of KTP-01's mission cockpit. Navigate using the control panel below.
            </div>

            {/* Steps */}
            <div className="space-y-3 mb-8">
              {[
                { icon: "▼", label: "BOTTOM PANEL", desc: "Click any cockpit button to open a mission section" },
                { icon: "►", label: "SIDE PANEL", desc: "Mission data loads on the right side of your display" },
                { icon: "◉", label: "COMM PANEL", desc: "Use COMM to contact, download resume & connect" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <div className="text-green-500 text-xs w-5 shrink-0 mt-0.5">{step.icon}</div>
                  <div>
                    <div className="text-[9px] text-green-400 tracking-widest">{step.label}</div>
                    <div className="text-[11px] text-foreground/60 leading-snug">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={dismiss}
              className="w-full py-2.5 border border-amber-500/60 bg-amber-900/20 text-amber-400 text-xs tracking-[0.2em] hover:bg-amber-900/40 transition-colors"
            >
              ◈ ENGAGE SYSTEMS ◈
            </motion.button>

            <div className="text-center text-[9px] text-green-500/30 mt-3">Click anywhere to dismiss</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

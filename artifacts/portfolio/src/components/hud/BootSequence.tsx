import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCockpitStore } from "@/store/useCockpitStore";

export default function BootSequence() {
  const [step, setStep] = useState(0);
  const finishBoot = useCockpitStore((state) => state.finishBoot);

  useEffect(() => {
    const sequence = [
      { time: 200, step: 1 },
      { time: 550, step: 2 },
      { time: 900, step: 3 },
      { time: 1250, step: 4 },
      { time: 1600, step: 5 },
      { time: 1950, step: 6 },
      { time: 2300, step: 7 },
      { time: 2650, step: 8 },
    ];

    const timeouts = sequence.map((s) => setTimeout(() => setStep(s.step), s.time));

    const endTimeout = setTimeout(() => {
      finishBoot();
    }, 3000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(endTimeout);
    };
  }, [finishBoot]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] bg-black text-foreground font-mono p-8 flex flex-col justify-end pointer-events-auto cursor-pointer select-none"
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        onClick={finishBoot}
      >
        {/* Skip indicator */}
        <div className="absolute top-6 right-6 text-[8px] sm:text-[9px] font-mono text-green-500/40 animate-pulse uppercase tracking-widest">
          [ CLICK ANYWHERE TO SKIP BOOT ]
        </div>

        <div className="space-y-2 mb-8 max-w-2xl">
          {step >= 0 && step < 7 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
              <span className="w-2 h-4 bg-foreground animate-pulse mr-2" />
              {step === 0 && ""}
              {step >= 1 && "INITIALIZING PILOT PROFILE..."}
            </motion.div>
          )}
          {step >= 2 && step < 7 && <div className="text-foreground/80">LOADING AIRCRAFT SYSTEMS...</div>}
          {step >= 3 && step < 7 && <div className="text-foreground/80">MISSION RECORDS AVAILABLE</div>}
          {step >= 4 && step < 7 && <div className="text-foreground/80">ACCESSING COMBAT LOGS...</div>}
          {step >= 5 && step < 7 && (
            <div className="w-full mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>SYSTEM BOOT</span>
                <span>100%</span>
              </div>
              <div className="h-2 w-full bg-green-950/30 border border-green-500/10">
                <motion.div 
                  className="h-full bg-green-400 shadow-[0_0_8px_#00ff41]" 
                  initial={{ width: "0%" }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 1 }} 
                />
              </div>
            </div>
          )}
          {step >= 6 && step < 7 && (
            <div className="mt-4 text-primary font-bold">
              <div>PILOT: KTP-01</div>
              <div>CLEARANCE: ALPHA</div>
            </div>
          )}
        </div>

        {step === 7 && (
          <motion.div 
            className="absolute inset-0 bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}


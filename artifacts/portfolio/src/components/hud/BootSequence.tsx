import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCockpitStore } from "@/store/useCockpitStore";

export default function BootSequence() {
  const [step, setStep] = useState(0);
  const finishBoot = useCockpitStore((state) => state.finishBoot);

  useEffect(() => {
    const sequence = [
      { time: 500, step: 1 },
      { time: 1500, step: 2 },
      { time: 2500, step: 3 },
      { time: 3500, step: 4 },
      { time: 4500, step: 5 },
      { time: 5500, step: 6 },
      { time: 6500, step: 7 },
      { time: 7500, step: 8 },
    ];

    const timeouts = sequence.map((s) => setTimeout(() => setStep(s.step), s.time));

    const endTimeout = setTimeout(() => {
      finishBoot();
    }, 8000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(endTimeout);
    };
  }, [finishBoot]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] bg-black text-foreground font-mono p-8 flex flex-col justify-end pointer-events-none"
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
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
              <div className="h-2 w-full bg-border">
                <motion.div 
                  className="h-full bg-foreground" 
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

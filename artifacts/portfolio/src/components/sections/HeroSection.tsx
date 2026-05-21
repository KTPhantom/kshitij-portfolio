import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const handleEngage = () => {
    const el = document.getElementById("stats");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 pointer-events-none select-none"
    >
      <div className="max-w-4xl w-full text-center space-y-6 z-10 pointer-events-auto mt-[-40px] md:mt-0">
        {/* Callsign & Mission Status header */}
        <div className="flex justify-center items-center gap-3 text-green-500/80 font-mono text-[10px] md:text-xs tracking-[0.25em]">
          <span className="border border-green-500/30 px-2 py-0.5 bg-green-900/10">
            CALLSIGN: {portfolio.hero.callsign}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="border border-green-500/30 px-2 py-0.5 bg-green-900/10 text-amber-400 font-bold">
            STATUS: {portfolio.hero.missionStatus}
          </span>
        </div>

        {/* Big Name Title */}
        <TextReveal
          tag="h1"
          text={portfolio.hero.name}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase font-sans py-2"
        />

        {/* Subtitle / Role */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm sm:text-base md:text-xl font-bold text-primary font-mono tracking-[0.25em] uppercase"
        >
          {portfolio.hero.role}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-xl mx-auto text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed"
        >
          {portfolio.hero.tagline}
        </motion.p>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="pt-4"
        >
          <MagneticButton>
            <button
              onClick={handleEngage}
              className="px-6 py-3 bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-amber-500/20 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer rounded-sm"
              data-cursor="ENGAGE"
            >
              ENGAGE SYSTEMS
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-auto cursor-pointer"
        onClick={handleEngage}
      >
        <span className="text-[8px] md:text-[9px] font-mono text-green-500/60 tracking-[0.2em]">SCROLL</span>
        <ArrowDown className="w-4 h-4 text-green-500/50" />
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";
import HUDHalo from "@/components/ui/HUDHalo";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative min-h-screen w-full flex flex-col justify-center items-center py-16 px-6 md:px-12 pointer-events-none select-none">
      <HUDHalo color="amber" />
      <div className="max-w-3xl w-full space-y-10 z-10 pointer-events-auto">
        
        {/* Section Title */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] md:text-[10px] font-mono text-green-500/50 tracking-[0.3em] uppercase">PILOT LOGS</div>
          <TextReveal tag="h2" text="FLIGHT LOGS" className="text-xl md:text-3xl font-bold tracking-wider text-white uppercase font-sans" />
        </div>

        {/* Timeline container */}
        <div className="relative pl-6 md:pl-8 border-l border-green-500/20 space-y-6 py-2">
          {/* Timeline bar */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-green-500 via-emerald-500 to-transparent origin-top" />

          {portfolio.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative space-y-2 pb-6 last:pb-0"
            >
              {/* Dot marker */}
              <div className="absolute w-2.5 h-2.5 rounded-full bg-green-400 -left-[31px] md:-left-[39px] top-1.5 border-2 border-background animate-pulse" />

              <div className="space-y-0.5">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="text-[9px] font-mono text-primary font-bold tracking-wider uppercase">
                    {exp.cockpitLabel}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground">{exp.period}</span>
                </div>
                
                <h3 className="text-base md:text-lg font-bold text-white uppercase font-sans leading-tight">
                  {exp.role}
                </h3>
                
                <div className="text-[11px] font-bold text-green-400/80 font-mono tracking-wider">
                  {exp.company.toUpperCase()} // {exp.location.toUpperCase()}
                </div>
              </div>

              {/* Achievements list */}
              <ul className="text-xs font-mono text-foreground/70 space-y-1.5 list-none pt-1">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-green-500/60 mt-1 text-[8px]">▷</span>
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

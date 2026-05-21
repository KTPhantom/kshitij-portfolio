import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";
import { Code, Layers, Database, Settings, Cloud, Brain } from "lucide-react";
import HUDHalo from "@/components/ui/HUDHalo";

const icons: Record<string, any> = {
  code: Code,
  layers: Layers,
  database: Database,
  settings: Settings,
  cloud: Cloud,
  brain: Brain,
};

export default function SkillsSection() {
  const allSkills = portfolio.skills.systems.categories.flatMap(cat => cat.items);

  return (
    <section id="skills" className="relative min-h-screen w-full flex flex-col justify-center items-center py-16 px-6 md:px-12 pointer-events-none select-none">
      <HUDHalo color="green" />
      <div className="max-w-4xl w-full space-y-8 z-10 pointer-events-auto">
        
        {/* Section Title */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] md:text-[10px] font-mono text-green-500/50 tracking-[0.3em] uppercase">SYSTEM CAPABILITIES</div>
          <TextReveal tag="h2" text="AIRCRAFT SYSTEMS" className="text-xl md:text-3xl font-bold tracking-wider text-white uppercase font-sans" />
        </div>

        {/* Ticker / Infinite Marquee */}
        <div className="relative w-full overflow-hidden border-y border-green-500/10 py-3 bg-green-950/[0.03]">
          <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] w-max">
            {/* Duplicate to prevent gaps */}
            {Array.from({ length: 4 }).flatMap(() => allSkills).map((skill, index) => (
              <span key={index} className="text-xs font-mono text-green-400/50 tracking-wider">
                ◈ {skill.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolio.skills.systems.categories.map((cat, i) => {
            const Icon = icons[cat.icon] || Code;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="p-5 border border-green-500/20 bg-green-950/10 backdrop-blur-[2px] relative flex flex-col gap-3"
              >
                {/* Corner details */}
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-green-500/30" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-green-500/30" />

                <div className="flex items-center gap-3">
                  <div className="p-1.5 border border-green-500/30 bg-green-950/20 text-green-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold font-mono tracking-widest text-green-400">
                    {cat.name.toUpperCase()}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 text-[10px] md:text-xs border border-green-500/10 bg-black/40 text-foreground/80 hover:border-green-500/40 hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,65,0.12)] transition-all select-none cursor-default font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TextReveal from "@/components/ui/TextReveal";

export default function StatsSection() {
  const statsDef = [
    { label: "PROJECTS DEPLOYED", value: portfolio.missionStats.projectsDeployed, color: "text-cyan-400", border: "border-cyan-500/25", bg: "bg-cyan-950/10" },
    { label: "ML INFERENCE ACCURACY", value: portfolio.missionStats.mlAccuracy, color: "text-green-400", border: "border-green-500/25", bg: "bg-green-950/10" },
    { label: "STUDENTS IMPACTED", value: `${portfolio.missionStats.studentsImpacted}+`, color: "text-amber-400", border: "border-amber-500/25", bg: "bg-amber-950/10" },
    { label: "CUMULATIVE CGPA", value: `${portfolio.missionStats.cgpa}/10.0`, color: "text-purple-400", border: "border-purple-500/25", bg: "bg-purple-950/10" },
    { label: "LINES OF CODE WRITTEN", value: portfolio.missionStats.linesOfCode, color: "text-cyan-400", border: "border-cyan-500/25", bg: "bg-cyan-950/10" },
    { label: "IOT SENSOR TELEMETRY", value: `${portfolio.missionStats.iotSensors} NODES`, color: "text-green-400", border: "border-green-500/25", bg: "bg-green-950/10" },
  ];

  return (
    <section id="stats" className="min-h-[60vh] w-full flex flex-col justify-center items-center py-16 px-6 md:px-12 pointer-events-none select-none">
      <div className="max-w-4xl w-full space-y-10 z-10 pointer-events-auto">
        
        {/* Section Title */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] md:text-[10px] font-mono text-green-500/50 tracking-[0.3em] uppercase">SYSTEM ANALYTICS</div>
          <TextReveal tag="h2" text="MISSION READOUT" className="text-xl md:text-3xl font-bold tracking-wider text-white uppercase font-sans" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statsDef.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: "rgba(0, 255, 65, 0.4)" }}
              className={`p-5 border ${stat.border} ${stat.bg} flex flex-col justify-between min-h-[120px] relative overflow-hidden group select-none backdrop-blur-[2px]`}
            >
              {/* Corner tech line decoration */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-green-500/30" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-green-500/30" />

              <div className="text-[8px] md:text-[9px] font-mono text-muted-foreground tracking-widest uppercase mb-3 leading-normal">
                {stat.label}
              </div>
              <div className={`text-2xl md:text-3xl font-bold font-mono tracking-tight ${stat.color}`}>
                <AnimatedCounter value={stat.value} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";
import HUDHalo from "@/components/ui/HUDHalo";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative min-h-[50vh] w-full flex flex-col justify-center items-center py-16 px-6 md:px-12 pointer-events-none select-none">
      <HUDHalo color="purple" />
      <div className="max-w-3xl w-full space-y-8 z-10 pointer-events-auto">
        
        {/* Section Title */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] md:text-[10px] font-mono text-purple-400/50 tracking-[0.3em] uppercase">VERIFIED CREDENTIALS</div>
          <TextReveal tag="h2" text="COMBAT MEDALS" className="text-xl md:text-3xl font-bold tracking-wider text-white uppercase font-sans" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolio.certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.01, borderColor: "rgba(204, 68, 255, 0.4)" }}
              className="border border-purple-500/20 bg-purple-950/5 p-5 backdrop-blur-[2px] relative flex items-center gap-4 group"
            >
              {/* Corner indicators */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-purple-500/30" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-purple-500/30" />

              {/* Medal Circle Badge */}
              <div className="w-12 h-12 rounded-full border border-purple-500/40 bg-purple-950/20 flex items-center justify-center text-purple-400 font-mono font-bold text-[11px] tracking-wide shrink-0 shadow-[0_0_8px_rgba(204,68,255,0.08)] group-hover:shadow-[0_0_15px_rgba(204,68,255,0.25)] transition-all">
                {cert.level.substring(0, 3)}
              </div>

              {/* Certification text details */}
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase leading-snug">
                  {cert.name}
                </h3>
                <div className="text-[9px] font-mono text-purple-400/80 tracking-wider">
                  {cert.issuer.toUpperCase()} // ISSUED {cert.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

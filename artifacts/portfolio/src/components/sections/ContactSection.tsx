import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, Github, Copy, Download, ExternalLink } from "lucide-react";
import HUDHalo from "@/components/ui/HUDHalo";

export default function ContactSection() {
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "FREQUENCY COPIED",
      description: text,
    });
  };

  return (
    <section id="contact" className="relative min-h-screen w-full flex flex-col justify-center items-center py-16 px-6 md:px-12 pointer-events-none select-none">
      <HUDHalo color="cyan" />
      <div className="max-w-md w-full space-y-6 z-10 pointer-events-auto">
        
        {/* Section Title */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="text-[9px] font-mono text-blue-400/50 tracking-[0.3em] uppercase font-bold">COMMUNICATIONS DECK</div>
          <TextReveal tag="h2" text="ESTABLISH LINK" className="text-xl md:text-3xl font-bold tracking-wider text-white uppercase font-sans mx-auto md:mx-0" />
        </div>

        <div className="space-y-3.5">
          {/* Resume Download CTA (Primary action) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 12 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <MagneticButton range={70} strength={0.4} className="w-full">
              <a
                href={portfolio.contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-amber-500/50 bg-amber-950/10 hover:bg-amber-950/20 text-amber-400 font-mono tracking-wider w-full transition-all group"
                data-cursor="DOWNLOAD"
              >
                <Download className="w-5 h-5 text-amber-400 animate-pulse group-hover:scale-110 transition-transform" />
                <div className="flex-1 text-left">
                  <div className="text-[9px] text-amber-400/60 tracking-widest font-bold">MISSION DOSSIER</div>
                  <div className="text-sm font-bold text-white uppercase">Download Resume</div>
                </div>
                <ExternalLink className="w-4 h-4 text-amber-400/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </MagneticButton>
          </motion.div>

          {/* Secure Email (Copy capability) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 12 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            onClick={() => handleCopy(portfolio.contact.email)}
            className="flex items-center gap-4 p-4 border border-blue-500/20 bg-blue-950/5 hover:bg-blue-950/10 transition-all cursor-pointer group"
          >
            <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <div className="flex-1">
              <div className="text-[9px] font-mono text-blue-400/60 tracking-widest">SECURE PORT</div>
              <div className="text-xs sm:text-sm font-mono text-white/90">{portfolio.contact.email}</div>
            </div>
            <Copy className="w-4 h-4 text-blue-500/40 group-hover:text-blue-400 transition-colors" />
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 12 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex items-center gap-4 p-4 border border-blue-500/20 bg-blue-950/5"
          >
            <Phone className="w-5 h-5 text-blue-400" />
            <div className="flex-1">
              <div className="text-[9px] font-mono text-blue-400/60 tracking-widest">COMMS CHANNEL</div>
              <div className="text-xs sm:text-sm font-mono text-white/90">{portfolio.contact.phone}</div>
            </div>
          </motion.div>

          {/* Grid of Social Channels */}
          <div className="grid grid-cols-2 gap-4">
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 12 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              href={portfolio.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-blue-500/20 bg-blue-950/5 hover:bg-blue-950/10 transition-all group cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-[8px] font-mono text-blue-400/60">LINKEDIN</div>
                <div className="text-[9px] font-mono font-bold text-white uppercase">VIEW SIGNAL</div>
              </div>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 12 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
              href={portfolio.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-blue-500/20 bg-blue-950/5 hover:bg-blue-950/10 transition-all group cursor-pointer"
            >
              <Github className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-[8px] font-mono text-blue-400/60">GITHUB</div>
                <div className="text-[9px] font-mono font-bold text-white uppercase">MISSION BASE</div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

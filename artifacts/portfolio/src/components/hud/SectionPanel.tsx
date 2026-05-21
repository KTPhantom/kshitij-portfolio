import { motion, AnimatePresence } from "framer-motion";
import { useCockpitStore } from "@/store/useCockpitStore";
import { portfolio } from "@/data/portfolio";
import { Code, Layers, Database, Settings, Cloud, Brain, Mail, Phone, Linkedin, Github, Copy, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const icons: Record<string, any> = {
  code: Code,
  layers: Layers,
  database: Database,
  settings: Settings,
  cloud: Cloud,
  brain: Brain,
};

export default function SectionPanel() {
  const activeSection = useCockpitStore((state) => state.activeSection);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "COPIED TO CLIPBOARD", description: text });
  };

  return (
    <div className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] p-6 z-20 pointer-events-none flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-h-[80vh] bg-card/80 backdrop-blur-md border border-border p-6 rounded-lg pointer-events-auto overflow-y-auto scrollbar-hide font-mono"
        >
          {activeSection === "hero" && (
            <div className="space-y-6">
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  {portfolio.hero.name}
                </motion.h1>
                <div className="text-primary font-bold">{portfolio.hero.role}</div>
                <div className="text-sm text-muted-foreground mt-2">{portfolio.hero.tagline}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-border bg-black/50">
                  <div className="text-xs text-muted-foreground">PROJECTS</div>
                  <div className="text-xl font-bold text-foreground">{portfolio.missionStats.projectsDeployed}</div>
                </div>
                <div className="p-3 border border-border bg-black/50">
                  <div className="text-xs text-muted-foreground">ML ACCURACY</div>
                  <div className="text-xl font-bold text-foreground">{portfolio.missionStats.mlAccuracy}</div>
                </div>
                <div className="p-3 border border-border bg-black/50">
                  <div className="text-xs text-muted-foreground">IMPACT</div>
                  <div className="text-xl font-bold text-foreground">{portfolio.missionStats.studentsImpacted}+</div>
                </div>
                <div className="p-3 border border-border bg-black/50">
                  <div className="text-xs text-muted-foreground">CGPA</div>
                  <div className="text-xl font-bold text-foreground">{portfolio.missionStats.cgpa}</div>
                </div>
              </div>

              <div className="text-xs text-primary animate-pulse text-center mt-8">
                [ CLICK COCKPIT CONTROLS TO NAVIGATE ]
              </div>
            </div>
          )}

          {activeSection === "skills" && (
            <div className="space-y-6">
              <div className="text-xl font-bold text-primary mb-6">SYSTEMS STATUS: OPERATIONAL</div>
              {portfolio.skills.systems.categories.map((cat, i) => {
                const Icon = icons[cat.icon] || Code;
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon className="w-4 h-4" />
                      <span>{cat.name.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item, j) => (
                        <div key={j} className="px-2 py-1 text-xs border border-border bg-black/40 text-foreground">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeSection === "projects" && (
            <div className="space-y-6">
              <div className="text-xl font-bold text-primary mb-6">MISSION ARCHIVE</div>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="border border-border p-4 bg-black/40 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-cyan-400">{proj.cockpitLabel}</div>
                    <div className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">
                      {proj.status}
                    </div>
                  </div>
                  <div className="text-xs text-foreground/80 leading-relaxed">{proj.description}</div>
                  <div className="flex flex-wrap gap-1">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-[10px] text-muted-foreground">[{t}]</span>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="flex gap-2 pt-1">
                    {(proj as any).githubUrl && (
                      <a
                        href={(proj as any).githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] px-2 py-1 border border-green-500/30 bg-green-900/10 text-green-400 hover:bg-green-900/30 transition-colors"
                      >
                        <Github className="w-3 h-3" /> CODE
                      </a>
                    )}
                    {(proj as any).liveUrl && (
                      <a
                        href={(proj as any).liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] px-2 py-1 border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/30 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> LIVE
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "experience" && (
            <div className="space-y-6">
              <div className="text-xl font-bold text-primary mb-6">FLIGHT LOGS</div>
              {portfolio.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-primary/50 space-y-2 pb-6 last:pb-0">
                  <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1" />
                  <div className="font-bold text-primary">{exp.cockpitLabel}</div>
                  <div className="text-sm font-semibold text-foreground">{exp.role}</div>
                  <div className="text-xs text-muted-foreground">{exp.period}</div>
                  <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside mt-2">
                    {exp.achievements.slice(0, 2).map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeSection === "certifications" && (
            <div className="space-y-6">
              <div className="text-xl font-bold text-purple-400 mb-6">COMBAT MEDALS</div>
              {portfolio.certifications.map((cert) => (
                <div key={cert.id} className="border border-purple-500/30 p-4 bg-purple-900/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    {cert.level.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground leading-tight">{cert.name}</div>
                    <div className="text-xs text-purple-400 mt-1">{cert.issuer} // {cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "contact" && (
            <div className="space-y-6">
              <div className="text-xl font-bold text-blue-400 mb-6">COMM PANEL</div>
              <div className="text-sm text-foreground mb-4">ESTABLISH COMM LINK...</div>
              
              <div className="space-y-4">
                {/* Resume download — top priority CTA */}
                <a
                  href={portfolio.contact.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 border border-amber-500/60 bg-amber-900/20 hover:bg-amber-900/40 transition-colors"
                >
                  <Download className="w-5 h-5 text-amber-400" />
                  <div className="flex-1">
                    <div className="text-xs text-amber-400 tracking-widest">MISSION DOSSIER</div>
                    <div className="text-sm text-foreground font-bold">Download Resume</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-amber-400/60" />
                </a>

                <div className="flex items-center gap-4 p-3 border border-blue-500/30 bg-blue-900/10 cursor-pointer hover:bg-blue-900/30 transition-colors" onClick={() => handleCopy(portfolio.contact.email)}>
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-xs text-blue-400">ENCRYPTED EMAIL</div>
                    <div className="text-sm text-foreground">{portfolio.contact.email}</div>
                  </div>
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-4 p-3 border border-blue-500/30 bg-blue-900/10">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-xs text-blue-400">SECURE FREQUENCY</div>
                    <div className="text-sm text-foreground">{portfolio.contact.phone}</div>
                  </div>
                </div>

                <a href={portfolio.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 border border-blue-500/30 bg-blue-900/10 hover:bg-blue-900/30 transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-xs text-blue-400">LINKEDIN</div>
                    <div className="text-sm text-foreground">View Profile</div>
                  </div>
                </a>

                <a href={portfolio.contact.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 border border-blue-500/30 bg-blue-900/10 hover:bg-blue-900/30 transition-colors">
                  <Github className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-xs text-blue-400">GITHUB REPOSITORY</div>
                    <div className="text-sm text-foreground">View Commits</div>
                  </div>
                </a>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import TextReveal from "@/components/ui/TextReveal";
import { Github, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  name: string;
  cockpitLabel: string;
  tech: readonly string[];
  period: string;
  description: string;
  highlights: readonly string[];
  stats?: Record<string, number>;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projectsData = portfolio.projects as readonly ProjectItem[];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    const scrollWidth = scrollSection.scrollWidth - window.innerWidth;

    const pin = gsap.to(scrollSection, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: () => `+=${scrollSection.scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.scrollTrigger?.kill();
    };
  }, [isMobile]);

  if (isMobile) {
    // Mobile Layout: Vertical List
    return (
      <section id="projects" className="py-16 px-6 space-y-8 select-none">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono text-cyan-400 tracking-[0.3em] uppercase">PROJECT PORTFOLIO</span>
          <TextReveal tag="h2" text="MISSION ARCHIVE" className="text-xl md:text-3xl font-bold tracking-wider text-white uppercase font-sans" />
        </div>

        <div className="flex flex-col gap-6">
          {projectsData.map((proj) => (
            <div
              key={proj.id}
              className="border border-cyan-500/20 bg-cyan-950/10 p-5 relative flex flex-col gap-4"
            >
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/30" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/30" />
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20" />

              <div className="space-y-2 pl-2">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-cyan-400/80 tracking-widest">{proj.cockpitLabel}</span>
                  <span className="text-[8px] font-mono px-2 py-0.5 border border-cyan-500/40 bg-cyan-500/5 text-cyan-400">
                    {proj.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase">{proj.name}</h3>
                <p className="text-xs font-mono text-foreground/80 leading-relaxed">{proj.description}</p>
              </div>

              <div className="space-y-3 pl-2">
                <div className="flex flex-wrap gap-1">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[8px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-500/10 px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] font-mono px-3 py-1 border border-green-500/30 bg-green-950/10 text-green-400"
                    >
                      <Github className="w-3 h-3" /> CODE
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] font-mono px-3 py-1 border border-cyan-500/30 bg-cyan-950/10 text-cyan-400"
                    >
                      <ExternalLink className="w-3 h-3" /> LIVE
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop Layout: Horizontal Scroll
  return (
    <div ref={containerRef} id="projects" className="relative min-h-screen bg-transparent overflow-hidden">
      <div
        ref={scrollSectionRef}
        className="flex items-center h-screen gap-8 px-24 w-max"
      >
        {/* Title slide */}
        <div className="w-[350px] flex flex-col justify-center shrink-0 space-y-3 select-none">
          <span className="text-[9px] font-mono text-cyan-400 tracking-[0.3em] uppercase">PROJECT PORTFOLIO</span>
          <TextReveal tag="h2" text="MISSION ARCHIVE" className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider leading-none" />
          <p className="text-xs font-mono text-muted-foreground max-w-[280px] leading-relaxed animate-pulse">
            Scroll vertically to slide through systems »»
          </p>
        </div>

        {/* Project slides */}
        {projectsData.map((proj) => (
          <div
            key={proj.id}
            className="w-[480px] shrink-0 border border-cyan-500/20 bg-cyan-950/10 p-8 backdrop-blur-[2px] relative flex flex-col justify-between h-[450px] group transition-all hover:border-cyan-500/40 select-none"
            data-cursor="MISSION"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/30" />
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500/10 group-hover:bg-cyan-500/30 transition-all" />

            <div className="space-y-4">
              <div className="flex justify-between items-start pl-2">
                <span className="text-[10px] font-mono text-cyan-400/85 tracking-widest">{proj.cockpitLabel}</span>
                <span className="text-[8px] font-mono px-2 py-0.5 border border-cyan-500/40 bg-cyan-500/5 text-cyan-400">
                  {proj.status}
                </span>
              </div>

              <h3 className="text-xl font-bold font-sans text-white tracking-wider uppercase pl-2">
                {proj.name}
              </h3>

              <p className="text-[11px] font-mono text-foreground/80 leading-relaxed pl-2">
                {proj.description}
              </p>

              {/* Highlights */}
              <ul className="text-[10px] font-mono text-muted-foreground/80 space-y-1.5 pl-2 list-none">
                {proj.highlights.slice(0, 3).map((high, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-cyan-500 text-[8px] mt-0.5">▶</span>
                    <span>{high}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pl-2">
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-[9px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-500/10 px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-mono px-3.5 py-1.5 border border-green-500/30 bg-green-950/10 text-green-400 hover:bg-green-500/20 hover:border-green-500 transition-all cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" /> CODE
                  </a>
                )}
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-mono px-3.5 py-1.5 border border-cyan-500/30 bg-cyan-950/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> LIVE
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

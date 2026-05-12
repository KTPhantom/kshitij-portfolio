import { useCockpitStore } from "@/store/useCockpitStore";
import { portfolio } from "@/data/portfolio";

export default function CockpitNav() {
  const activeSection = useCockpitStore((state) => state.activeSection);
  const setActiveSection = useCockpitStore((state) => state.setActiveSection);

  const navItems = [
    { id: "hero", label: "ENGINE" },
    { id: "skills", label: "RADAR" },
    { id: "projects", label: "NAV MAP" },
    { id: "experience", label: "LOGS" },
    { id: "certifications", label: "CERTS" },
    { id: "contact", label: "COMMS" },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-20 pointer-events-none flex justify-center">
      <div className="flex gap-2 p-2 bg-black/60 backdrop-blur-sm border border-border/50 rounded-full pointer-events-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`px-4 py-2 text-xs font-mono rounded-full transition-colors ${
              activeSection === item.id 
                ? "bg-foreground text-background font-bold" 
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/10"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

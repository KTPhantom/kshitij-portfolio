import { create } from "zustand";

export type Section = "hero" | "skills" | "projects" | "experience" | "certifications" | "contact";

interface CockpitState {
  activeSection: Section;
  isBooting: boolean;
  bootStep: number;
  hudVisible: boolean;
  isMuted: boolean;
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  isTransitioning: boolean;
  hoveredControl: string | null;

  setActiveSection: (section: Section) => void;
  setBootStep: (step: number) => void;
  finishBoot: () => void;
  setHudVisible: (v: boolean) => void;
  toggleMute: () => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setCameraPosition: (pos: [number, number, number]) => void;
  setIsTransitioning: (v: boolean) => void;
  setHoveredControl: (control: string | null) => void;
}

export const CAMERA_POSITIONS: Record<Section, { position: [number, number, number]; target: [number, number, number] }> = {
  hero:          { position: [0, 0.5, 2.5],   target: [0, 0, 0] },
  skills:        { position: [-2.5, 0.8, 1.5], target: [-1.5, 0.3, 0] },
  projects:      { position: [2.5, 0.8, 1.5],  target: [1.5, 0.3, 0] },
  experience:    { position: [0, -0.5, 2.8],   target: [0, -0.5, 0] },
  certifications:{ position: [0, 1.5, 2.0],    target: [0, 1.0, 0] },
  contact:       { position: [0, 0.2, 3.2],    target: [0, 0, 0] },
};

export const useCockpitStore = create<CockpitState>((set) => ({
  activeSection: "hero",
  isBooting: true,
  bootStep: 0,
  hudVisible: false,
  isMuted: false,
  cameraTarget: [0, 0, 0],
  cameraPosition: [0, 0.5, 2.5],
  isTransitioning: false,
  hoveredControl: null,

  setActiveSection: (section) =>
    set({
      activeSection: section,
      cameraPosition: CAMERA_POSITIONS[section].position,
      cameraTarget: CAMERA_POSITIONS[section].target,
    }),

  setBootStep: (step) => set({ bootStep: step }),

  finishBoot: () => set({ isBooting: false, hudVisible: true }),

  setHudVisible: (v) => set({ hudVisible: v }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  setCameraTarget: (target) => set({ cameraTarget: target }),

  setCameraPosition: (pos) => set({ cameraPosition: pos }),

  setIsTransitioning: (v) => set({ isTransitioning: v }),

  setHoveredControl: (control) => set({ hoveredControl: control }),
}));

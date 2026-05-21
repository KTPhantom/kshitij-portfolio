import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if touch device / mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
    if (isMobile) return;

    // Apply cursor-none to body/html
    document.documentElement.classList.add("cursor-none");

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Set initial offscreen positions to prevent flash in top-left
    gsap.set([dot, ring], { x: -100, y: -100 });

    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xDotTo(clientX);
      yDotTo(clientY);
      xRingTo(clientX);
      yRingTo(clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input, textarea, select, .clickable");
      const cursorTextAttr = (target.closest("[data-cursor]") as HTMLElement)?.dataset.cursor;

      if (isClickable) {
        setIsActive(true);
        setCursorText(cursorTextAttr || "ENGAGE");
        gsap.to(ring, { width: 56, height: 56, borderColor: "#ffaa00", duration: 0.25 });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else {
        setIsActive(false);
        setCursorText("");
        gsap.to(ring, { width: 28, height: 28, borderColor: "rgba(0,255,65,0.4)", duration: 0.25 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mouseover", onMouseOver);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Inner green tracking dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-green-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      />
      {/* Outer HUD ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-green-500/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[7px] text-amber-400 font-bold tracking-wider mix-blend-screen bg-green-500/[0.02]"
      >
        {isActive && (
          <span className="absolute animate-pulse text-[6px] tracking-tight bg-black/60 px-1 py-0.5 rounded border border-amber-500/20">{cursorText}</span>
        )}
        {/* Crosshair segments */}
        <div className="absolute w-px h-1.5 bg-green-500/30 top-0" />
        <div className="absolute w-px h-1.5 bg-green-500/30 bottom-0" />
        <div className="absolute h-px w-1.5 bg-green-500/30 left-0" />
        <div className="absolute h-px w-1.5 bg-green-500/30 right-0" />
      </div>
    </>
  );
}

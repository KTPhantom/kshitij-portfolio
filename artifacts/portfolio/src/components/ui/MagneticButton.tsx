import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
  className?: string;
}

export default function MagneticButton({ children, range = 50, strength = 0.35, className = "inline-block" }: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
    if (isMobile) return;

    const el = containerRef.current;
    if (!el) return;

    // Use GSAP quickTo for ultra-smooth 60fps tracking & elastic snap back
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      
      const distance = Math.hypot(clientX - elCenterX, clientY - elCenterY);

      if (distance < range) {
        // Attract the button towards the cursor position
        xTo((clientX - elCenterX) * strength);
        yTo((clientY - elCenterY) * strength);
      } else {
        // Snap back to original position
        xTo(0);
        yTo(0);
      }
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

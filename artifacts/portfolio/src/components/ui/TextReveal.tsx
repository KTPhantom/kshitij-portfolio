import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
  triggerOnce?: boolean;
}

export default function TextReveal({
  text,
  className = "",
  tag: Tag = "h2",
  delay = 0,
  triggerOnce = true,
}: TextRevealProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Use SplitType to separate text into words & characters
    const split = new SplitType(el, { types: "chars,words" });

    // Put characters into an overflow-hidden wrapper style for masks
    if (split.chars) {
      split.chars.forEach((char) => {
        const parent = char.parentNode;
        if (parent) {
          // If already wrapped or styling is correct
          char.style.display = "inline-block";
          char.style.willChange = "transform, opacity";
        }
      });
    }

    const chars = split.chars;
    if (chars && chars.length > 0) {
      gsap.fromTo(
        chars,
        {
          y: "110%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.025,
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: triggerOnce ? "play none none none" : "play none none reverse",
          },
        }
      );
    }

    return () => {
      split.revert();
    };
  }, [text, delay, triggerOnce]);

  return (
    <Tag ref={elementRef as any} className={`relative overflow-hidden ${className}`}>
      {text}
    </Tag>
  );
}

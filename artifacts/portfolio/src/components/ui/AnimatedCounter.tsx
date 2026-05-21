import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  decimals?: number;
}

export default function AnimatedCounter({ value, duration = 1.5, decimals }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const valStr = String(value);
    
    // Match prefix (e.g. $), numeric value (with decimal/signs), and suffix (e.g. %, +, /10.0)
    let numericPart = 0;
    let prefix = "";
    let suffix = "";
    
    const match = valStr.match(/^([^0-9.-]*)([0-9.-]+)(.*)$/);
    if (match) {
      prefix = match[1];
      numericPart = parseFloat(match[2]);
      suffix = match[3];
    } else {
      numericPart = parseFloat(valStr) || 0;
    }

    const isDecimal = !Number.isInteger(numericPart) || valStr.includes(".");
    const determinedDecimals = decimals !== undefined ? decimals : (isDecimal ? (valStr.split(".")[1]?.split(/[^0-9]/)[0]?.length || 2) : 0);

    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: numericPart,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        const formattedNum = obj.val.toFixed(determinedDecimals);
        setDisplayValue(`${prefix}${formattedNum}${suffix}`);
      },
    });
  }, [value, duration, decimals]);

  return <span ref={containerRef}>{displayValue}</span>;
}

import { motion } from "framer-motion";
import { useMemo } from "react";

/* Deterministic star positions so no re-render jitter */
function useStars(count: number) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: ((i * 137.508) % 100).toFixed(2),
    top:  ((i * 97.3)   % 60).toFixed(2),
    size: i % 11 === 0 ? 2 : i % 5 === 0 ? 1.5 : 1,
    opacity: 0.25 + (i % 7) * 0.1,
    dur: (2 + (i % 5)).toFixed(1),
    delay: ((i % 8) * 0.5).toFixed(1),
  })), [count]);
}

export default function CockpitBackground() {
  const stars = useStars(120);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: "#010306" }}>

      {/* ══════════════════════════════════════════
          SKY — deep space gradient
      ══════════════════════════════════════════ */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 120% 80% at 50% -10%, #0a1628 0%, #050c14 40%, #010306 100%)",
      }} />

      {/* Subtle nebula bloom top-left */}
      <div className="absolute" style={{
        top: "-10%", left: "-5%", width: "55%", height: "55%",
        background: "radial-gradient(ellipse at 30% 30%, rgba(0,80,180,0.08) 0%, transparent 70%)",
      }} />
      {/* Subtle nebula top-right */}
      <div className="absolute" style={{
        top: "-5%", right: "-10%", width: "50%", height: "50%",
        background: "radial-gradient(ellipse at 70% 20%, rgba(0,160,100,0.06) 0%, transparent 70%)",
      }} />

      {/* ── Stars ── */}
      <div className="absolute inset-0">
        {stars.map(s => (
          <div key={s.id} className="absolute rounded-full bg-white" style={{
            left: `${s.left}%`, top: `${s.top}%`,
            width: s.size, height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
        {/* A few bright blue-white stars */}
        {[{l:22,t:12},{l:61,t:8},{l:78,t:19},{l:44,t:5},{l:88,t:31}].map((p,i) => (
          <div key={`b${i}`} className="absolute rounded-full" style={{
            left:`${p.l}%`, top:`${p.t}%`, width:2, height:2,
            background:"rgba(160,200,255,0.9)",
            boxShadow:"0 0 4px rgba(160,200,255,0.6)",
            animation:`twinkle ${3+i}s ease-in-out ${i*0.7}s infinite`,
          }}/>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          HORIZON
      ══════════════════════════════════════════ */}
      {/* Atmospheric glow band just above horizon */}
      <div className="absolute left-0 right-0" style={{
        top: "45%", height: "12%",
        background: "linear-gradient(180deg, transparent 0%, rgba(0,255,80,0.04) 50%, rgba(0,255,65,0.10) 100%)",
      }} />
      {/* Horizon line */}
      <div className="absolute left-0 right-0" style={{
        top: "56%", height: "2px",
        background: "linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.12) 15%, rgba(0,255,65,0.55) 50%, rgba(0,255,65,0.12) 85%, transparent 100%)",
        boxShadow: "0 0 18px 2px rgba(0,255,65,0.12)",
      }} />

      {/* ══════════════════════════════════════════
          PERSPECTIVE GRID (ground)
      ══════════════════════════════════════════ */}
      <div className="absolute left-0 right-0" style={{
        top: "56%", height: "17%",
        perspective: "600px", perspectiveOrigin: "50% 0%", overflow: "hidden",
      }}>
        <div style={{
          width: "100%", height: "200%",
          transform: "rotateX(82deg)", transformOrigin: "50% 0%",
          backgroundImage:
            "linear-gradient(rgba(0,255,65,0.35) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(0,255,65,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 40px",
          animation: "gridScroll 2.5s linear infinite",
        }} />
        {/* Fade-out at bottom of grid */}
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: "60%",
          background: "linear-gradient(180deg, transparent, #010306)",
        }} />
      </div>

      {/* ══════════════════════════════════════════
          COCKPIT CANOPY FRAME (CSS overlay)
      ══════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0" style={{
          height: "3.5%",
          background: "linear-gradient(180deg,#1a2230 0%,#0d1318 100%)",
        }}>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg,transparent,rgba(0,255,65,0.3) 30%,rgba(0,255,65,0.3) 70%,transparent)",
          }}/>
        </div>

        {/* Left edge */}
        <div className="absolute top-0 left-0 bottom-0" style={{
          width: "1.5%",
          background: "linear-gradient(90deg,#0d1318,transparent)",
        }}/>
        {/* Right edge */}
        <div className="absolute top-0 right-0 bottom-0" style={{
          width: "1.5%",
          background: "linear-gradient(270deg,#0d1318,transparent)",
        }}/>

        {/* Left diagonal strut — clip-path polygon */}
        <div className="absolute top-0 left-0" style={{
          width: "22%", height: "57%",
          background: "linear-gradient(135deg,#0d1318 0%,rgba(10,16,22,0.85) 60%,transparent 100%)",
          clipPath: "polygon(0% 0%, 38% 0%, 100% 100%, 0% 100%)",
        }}/>
        {/* Left strut inner edge glow line (SVG, lines support %) */}
        <svg className="absolute top-0 left-0" width="22%" height="57%" style={{overflow:"visible"}} xmlns="http://www.w3.org/2000/svg">
          <line x1="38%" y1="0%" x2="100%" y2="100%" stroke="rgba(0,255,65,0.2)" strokeWidth="1.5"/>
        </svg>

        {/* Right diagonal strut */}
        <div className="absolute top-0 right-0" style={{
          width: "22%", height: "57%",
          background: "linear-gradient(225deg,#0d1318 0%,rgba(10,16,22,0.85) 60%,transparent 100%)",
          clipPath: "polygon(62% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}/>
        <svg className="absolute top-0 right-0" width="22%" height="57%" style={{overflow:"visible"}} xmlns="http://www.w3.org/2000/svg">
          <line x1="62%" y1="0%" x2="0%" y2="100%" stroke="rgba(0,255,65,0.2)" strokeWidth="1.5"/>
        </svg>

        {/* Centre strut — narrow tapered bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{
          width: "2%", height: "57%",
          background: "linear-gradient(180deg,#111820 0%,rgba(12,18,26,0.5) 80%,transparent 100%)",
          clipPath: "polygon(30% 0%,70% 0%,60% 100%,40% 100%)",
        }}/>
      </div>

      {/* ══════════════════════════════════════════
          SIDE CONSOLES
      ══════════════════════════════════════════ */}

      {/* Left console panel */}
      <div className="absolute top-0 bottom-0 left-0" style={{ width:"13%", zIndex:3 }}>
        <div className="absolute inset-0" style={{
          background:"linear-gradient(90deg,#060c0e 0%,rgba(4,14,10,0.97) 75%,transparent 100%)",
          borderRight:"1px solid rgba(0,255,65,0.08)",
        }}/>
        {/* Vertical glow strip */}
        <div className="absolute top-14 bottom-20" style={{
          right:0, width:"2px",
          background:"linear-gradient(180deg,transparent,rgba(0,255,65,0.7) 20%,rgba(0,255,65,0.7) 80%,transparent)",
          boxShadow:"0 0 14px rgba(0,255,65,0.35)",
        }}/>
        {/* Instrument rows */}
        <div className="absolute inset-x-2 top-16 flex flex-col gap-2.5">
          {["SYS","CPU","MEM","NET","PWR"].map((lbl,i)=>{
            const val=[87,72,91,58,100][i];
            return (
              <div key={lbl} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[7px] font-mono" style={{color:"rgba(0,255,65,0.45)"}}>
                  <span>{lbl}</span><span>{val}%</span>
                </div>
                <div className="h-1 rounded-sm overflow-hidden" style={{background:"rgba(0,255,65,0.08)"}}>
                  <motion.div className="h-full rounded-sm" style={{background:"rgba(0,255,65,0.55)"}}
                    initial={{width:0}} animate={{width:`${val}%`}}
                    transition={{delay:0.6+i*0.08,duration:0.9,ease:"easeOut"}} />
                </div>
              </div>
            );
          })}
          {/* Mini indicator lights */}
          <div className="flex gap-1.5 mt-1">
            {["#00ff41","#ffaa00","#00ff41","#00ffcc"].map((c,i)=>(
              <div key={i} className="w-2 h-2 rounded-full" style={{
                background:c, boxShadow:`0 0 6px ${c}`,
                animation:`pulse 1.${i+2}s ease-in-out ${i*0.3}s infinite`,
              }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Right console panel */}
      <div className="absolute top-0 bottom-0 right-0" style={{ width:"13%", zIndex:3 }}>
        <div className="absolute inset-0" style={{
          background:"linear-gradient(270deg,#06090e 0%,rgba(4,10,18,0.97) 75%,transparent 100%)",
          borderLeft:"1px solid rgba(0,180,255,0.08)",
        }}/>
        <div className="absolute top-14 bottom-20" style={{
          left:0, width:"2px",
          background:"linear-gradient(180deg,transparent,rgba(0,180,255,0.7) 20%,rgba(0,180,255,0.7) 80%,transparent)",
          boxShadow:"0 0 14px rgba(0,180,255,0.35)",
        }}/>
        <div className="absolute inset-x-2 top-16 flex flex-col gap-2.5">
          {["AI","API","DB","CDN","SEC"].map((lbl,i)=>{
            const val=[94,81,67,88,76][i];
            return (
              <div key={lbl} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[7px] font-mono" style={{color:"rgba(0,180,255,0.45)"}}>
                  <span>{lbl}</span><span>{val}%</span>
                </div>
                <div className="h-1 rounded-sm overflow-hidden" style={{background:"rgba(0,180,255,0.08)"}}>
                  <motion.div className="h-full rounded-sm" style={{background:"rgba(0,180,255,0.55)"}}
                    initial={{width:0}} animate={{width:`${val}%`}}
                    transition={{delay:0.6+i*0.08,duration:0.9,ease:"easeOut"}} />
                </div>
              </div>
            );
          })}
          <div className="flex gap-1.5 mt-1">
            {["#00ccff","#00ff41","#ffaa00","#cc44ff"].map((c,i)=>(
              <div key={i} className="w-2 h-2 rounded-full" style={{
                background:c, boxShadow:`0 0 6px ${c}`,
                animation:`pulse 1.${i+3}s ease-in-out ${i*0.4}s infinite`,
              }}/>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DASHBOARD PANEL (bottom)
      ══════════════════════════════════════════ */}
      <div className="absolute left-0 right-0 bottom-0" style={{ height:"27%", zIndex:3 }}>
        {/* Angled panel face */}
        <div className="absolute inset-0" style={{
          background:"linear-gradient(175deg,#060d08 0%,#030809 60%,#020508 100%)",
          borderTop:"1px solid rgba(0,255,65,0.22)",
        }}/>

        {/* Dashboard top glow line */}
        <div className="absolute top-0 left-0 right-0" style={{
          height:"1px",
          background:"linear-gradient(90deg,transparent,rgba(0,255,65,0.5) 20%,rgba(255,170,0,0.7) 50%,rgba(0,255,65,0.5) 80%,transparent)",
          boxShadow:"0 0 12px rgba(0,255,65,0.25)",
        }}/>

        {/* Three MFD screens */}
        <div className="absolute top-4 bottom-4" style={{ left:"14%", right:"14%", display:"flex", gap:8 }}>
          {/* Left MFD — green */}
          <div className="flex-1 relative overflow-hidden" style={{
            border:"1px solid rgba(0,255,65,0.2)",
            background:"#020a04",
            boxShadow:"inset 0 0 30px rgba(0,255,65,0.06), 0 0 8px rgba(0,255,65,0.08)",
          }}>
            {/* Grid overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage:"linear-gradient(rgba(0,255,65,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.15) 1px,transparent 1px)",
              backgroundSize:"14px 14px",
            }}/>
            {/* Label */}
            <div className="absolute top-1 left-2 text-[7px] font-mono" style={{color:"rgba(0,255,65,0.5)"}}>NAV SYS</div>
            {/* Corner deco */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{borderColor:"rgba(0,255,65,0.4)"}}/>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{borderColor:"rgba(0,255,65,0.4)"}}/>
          </div>

          {/* Centre MFD — amber */}
          <div className="flex-1 relative overflow-hidden" style={{
            border:"1px solid rgba(255,170,0,0.22)",
            background:"#080600",
            boxShadow:"inset 0 0 30px rgba(255,170,0,0.06), 0 0 8px rgba(255,170,0,0.08)",
          }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Crosshair */}
              <div className="absolute w-full h-px" style={{background:"rgba(255,170,0,0.12)"}}/>
              <div className="absolute w-px h-full" style={{background:"rgba(255,170,0,0.12)"}}/>
              <div className="absolute w-6 h-6 rounded-full" style={{border:"1px solid rgba(255,170,0,0.25)"}}/>
            </div>
            <div className="absolute top-1 left-2 text-[7px] font-mono" style={{color:"rgba(255,170,0,0.5)"}}>TARGETING</div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{borderColor:"rgba(255,170,0,0.4)"}}/>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{borderColor:"rgba(255,170,0,0.4)"}}/>
          </div>

          {/* Right MFD — cyan */}
          <div className="flex-1 relative overflow-hidden" style={{
            border:"1px solid rgba(0,180,255,0.22)",
            background:"#020608",
            boxShadow:"inset 0 0 30px rgba(0,180,255,0.06), 0 0 8px rgba(0,180,255,0.08)",
          }}>
            <div className="absolute inset-0" style={{
              backgroundImage:"linear-gradient(rgba(0,180,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,255,0.1) 1px,transparent 1px)",
              backgroundSize:"14px 14px",
            }}/>
            <div className="absolute top-1 left-2 text-[7px] font-mono" style={{color:"rgba(0,180,255,0.5)"}}>RADAR SYS</div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{borderColor:"rgba(0,180,255,0.4)"}}/>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{borderColor:"rgba(0,180,255,0.4)"}}/>
          </div>
        </div>

        {/* Dashboard side details — left */}
        <div className="absolute top-4 bottom-4 flex flex-col gap-1.5 justify-center" style={{left:"1%",width:"12%",paddingLeft:8}}>
          {["ENG","HYD","FCS","ECS"].map((s,i)=>(
            <div key={s} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm" style={{background:"rgba(0,255,65,0.7)",boxShadow:"0 0 4px rgba(0,255,65,0.5)"}}/>
              <span className="text-[7px] font-mono" style={{color:"rgba(0,255,65,0.45)"}}>{s}</span>
            </div>
          ))}
        </div>

        {/* Dashboard side details — right */}
        <div className="absolute top-4 bottom-4 flex flex-col gap-1.5 justify-center items-end" style={{right:"1%",width:"12%",paddingRight:8}}>
          {["ARM","IFF","ECM","CNI"].map((s,i)=>(
            <div key={s} className="flex items-center gap-1.5">
              <span className="text-[7px] font-mono" style={{color:"rgba(0,180,255,0.45)"}}>{s}</span>
              <div className="w-2 h-2 rounded-sm" style={{background:"rgba(0,180,255,0.7)",boxShadow:"0 0 4px rgba(0,180,255,0.5)"}}/>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ATMOSPHERIC SCAN LINE
      ══════════════════════════════════════════ */}
      <motion.div className="absolute left-0 right-0 pointer-events-none" style={{
        height:"1px", zIndex:4,
        background:"rgba(0,255,65,0.12)",
        boxShadow:"0 0 10px rgba(0,255,65,0.18)",
      }}
        animate={{ top:["0%","100%"] }}
        transition={{ duration:7, repeat:Infinity, ease:"linear" }}
      />

      {/* ══════════════════════════════════════════
          VIGNETTE
      ══════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex:5,
        background:"radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, rgba(1,3,6,0.65) 100%)",
      }}/>

      <style>{`
        @keyframes twinkle {
          0%,100%{opacity:.25;transform:scale(1)}
          50%{opacity:1;transform:scale(1.5)}
        }
        @keyframes gridScroll {
          from{background-position:center 0}
          to{background-position:center 40px}
        }
        @keyframes pulse {
          0%,100%{opacity:.5}
          50%{opacity:1}
        }
      `}</style>
    </div>
  );
}

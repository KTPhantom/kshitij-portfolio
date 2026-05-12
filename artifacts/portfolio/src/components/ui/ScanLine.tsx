export default function ScanLine() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden mix-blend-overlay opacity-20">
      <div 
        className="w-full h-1 bg-foreground absolute top-0"
        style={{
          boxShadow: '0 0 10px 2px var(--color-foreground)',
          animation: 'scan 4s linear infinite',
        }}
      />
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

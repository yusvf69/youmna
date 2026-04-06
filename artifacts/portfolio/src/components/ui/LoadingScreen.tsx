import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = ["Y", "O", "U", "M", "N", "A"];

export function LoadingScreen() {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // letters finish animating in ~1.4s, then hold briefly, then exit
    const holdTimer = setTimeout(() => setPhase("hold"), 1500);
    const outTimer = setTimeout(() => setPhase("out"), 2200);
    const doneTimer = setTimeout(() => setVisible(false), 3000);
    return () => { clearTimeout(holdTimer); clearTimeout(outTimer); clearTimeout(doneTimer); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Ambient glow blobs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", top: "40%", left: "55%" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          />

          {/* Thin horizontal line that sweeps in first */}
          <motion.div
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={phase !== "out" ? { width: "60vw", opacity: 1 } : { width: "100vw", opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* Name letters */}
          <div className="relative flex items-center gap-1 md:gap-2">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={
                  phase === "out"
                    ? { opacity: 0, y: -30, filter: "blur(8px)", scale: 1.1 }
                    : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
                }
                transition={
                  phase === "out"
                    ? { duration: 0.5, ease: "easeIn", delay: i * 0.04 }
                    : { duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 + i * 0.09 }
                }
                className="relative text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                }}
              >
                {/* Filled version with gradient that flickers in */}
                <motion.span
                  className="absolute inset-0 text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, #8B5CF6 50%, #06B6D4 100%)", WebkitBackgroundClip: "text" }}
                  initial={{ opacity: 0 }}
                  animate={phase !== "out" ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 + i * 0.09, duration: 0.4 }}
                >
                  {letter}
                </motion.span>
                {letter}

                {/* Neon glow under each letter */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary blur-sm"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={phase !== "out" ? { scaleX: 1, opacity: 0.7 } : { scaleX: 0, opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.09, duration: 0.3 }}
                />
              </motion.span>
            ))}
          </div>

          {/* Tagline below */}
          <motion.p
            className="absolute bottom-[42%] text-xs font-mono tracking-[0.4em] text-muted-foreground/50 uppercase"
            initial={{ opacity: 0 }}
            animate={phase !== "out" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            Creative Technologist
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight, MousePointer2 } from "lucide-react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const COLORS = ["#8B5CF6", "#7C3AED", "#06B6D4", "#0EA5E9", "#a78bfa", "#22d3ee"];
    const PARTICLE_COUNT = 130;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string; alpha: number;
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.65 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.1;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />;
}

function PhotoCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const rotateXSpring = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(e.clientX - cx);
    y.set(e.clientY - cy);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 2.6, ease: [0.34, 1.56, 0.64, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative w-64 h-80 lg:w-72 lg:h-96 rounded-2xl cursor-pointer group flex-shrink-0"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-3 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Card border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/60 via-transparent to-secondary/60 p-[1.5px]">
        <div className="w-full h-full rounded-2xl overflow-hidden bg-card relative">
          <img
            src="/assets/youmna.png"
            alt="Youmna"
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Status badge on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-primary/30 rounded-full px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400 tracking-widest">AVAILABLE FOR WORK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating tag */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 bg-primary rounded-full px-3 py-1 text-xs font-mono text-white shadow-[0_0_14px_rgba(139,92,246,0.7)]"
      >
        3D + Dev
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["3D Artist", "Creative Developer", "UI Innovator", "WebGL Alchemist"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIdx];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && typed === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && typed === "") {
        setIsDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      } else {
        setTyped((t) =>
          isDeleting ? t.slice(0, -1) : currentRole.slice(0, t.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typed, isDeleting, roleIdx]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      <ParticleCanvas />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 pt-20">
        {/* Left: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="px-3 py-1 text-xs font-mono tracking-widest text-primary border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm">
              CREATIVE TECHNOLOGIST
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 leading-none"
          >
            YOUM
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">NA</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9 }}
            className="text-xl md:text-2xl font-light text-muted-foreground mb-6 h-8 flex items-center gap-1"
          >
            <span className="text-secondary font-mono">&gt;</span>
            <span>{typed}</span>
            <span className="w-0.5 h-6 bg-primary animate-pulse ml-0.5" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.7 }}
            className="text-muted-foreground text-base font-light leading-relaxed mb-10 max-w-md"
          >
            Crafting immersive digital experiences where code meets artistry. 
            From WebGL environments to responsive interfaces — I build what others only imagine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-medium tracking-wide uppercase text-sm rounded-full overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-medium tracking-wide uppercase text-sm rounded-full hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <MousePointer2 size={14} />
              Let's Collaborate
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6 }}
            className="flex gap-8 mt-12 justify-center lg:justify-start"
          >
            {[
              { val: "50+", label: "Projects" },
              { val: "3+", label: "Years Exp." },
              { val: "100%", label: "Dedication" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {stat.val}
                </div>
                <div className="text-xs font-mono text-muted-foreground tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo Card */}
        <div className="hidden md:flex">
          <PhotoCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground cursor-pointer hover:text-primary transition-colors group"
      >
        <span className="text-xs font-mono tracking-widest uppercase mb-2 group-hover:text-primary transition-colors">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,15,0.85)_100%)] z-0" />
    </section>
  );
}

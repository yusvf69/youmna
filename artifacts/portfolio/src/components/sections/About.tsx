import { motion } from "framer-motion";
import { Terminal, Hexagon, Code2, Cpu } from "lucide-react";

export function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const timeline = [
    {
      year: "2020",
      title: "The Genesis",
      desc: "Started journey in web development, building standard interfaces.",
      icon: Terminal,
    },
    {
      year: "2021",
      title: "Discovering 3D",
      desc: "Fell in love with Blender and started rendering abstract concepts.",
      icon: Hexagon,
    },
    {
      year: "2022",
      title: "The Intersection",
      desc: "Combined React with Three.js. The canvas became my playground.",
      icon: Code2,
    },
    {
      year: "Present",
      title: "Creative Technologist",
      desc: "Crafting bespoke digital experiences that blur the line between code and art.",
      icon: Cpu,
    },
  ];

  return (
    <section id="about" className="py-32 relative bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Left Column: Story */}
          <div className="flex flex-col justify-center">
            <motion.div variants={item} className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">ORIGIN STORY</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </motion.div>

            <motion.div variants={item} className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                I exist in the liminal space between logic and aesthetics. Where traditional developers see DOM elements, I see a canvas waiting for dimensions, lighting, and physics.
              </p>
              <p>
                My work focuses on escaping the flat web. By combining robust frontend frameworks with WebGL and complex 3D pipelines, I build experiences that don't just present information—they absorb the user.
              </p>
              <p className="border-l-2 border-secondary pl-4 text-foreground/90 italic">
                "The screen is not a boundary; it is a window into a synthesized reality."
              </p>
            </motion.div>
          </div>

          {/* Right Column: Timeline */}
          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border/50 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div key={idx} variants={item} className="relative flex gap-6 md:gap-8 group">
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-500">
                      <Icon size={20} />
                    </div>
                    <div className="flex flex-col pt-2">
                      <span className="text-sm font-mono tracking-widest text-secondary mb-1">{step.year}</span>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground font-light">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

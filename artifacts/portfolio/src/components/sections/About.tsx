import { motion } from "framer-motion";
import { Terminal, Hexagon, Code2, Cpu, Download, Mail } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const timeline = [
  {
    year: "2020",
    title: "First Line of Code",
    desc: "Started the journey with web development — turning ideas into interactive interfaces for the first time.",
    icon: Terminal,
  },
  {
    year: "2021",
    title: "Discovering 3D",
    desc: "Fell in love with Blender and began rendering abstract worlds, exploring dimension beyond the flat screen.",
    icon: Hexagon,
  },
  {
    year: "2022",
    title: "Code Meets Art",
    desc: "Merged React with Three.js — the browser became a canvas for living, breathing 3D experiences.",
    icon: Code2,
  },
  {
    year: "Now",
    title: "Creative Technologist",
    desc: "Building bespoke digital experiences that fuse engineering precision with visual storytelling.",
    icon: Cpu,
  },
];

export function About() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-32 relative bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-[300px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-secondary font-mono tracking-widest text-sm">// ABOUT ME</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left: Photo + Quick Info */}
          <motion.div variants={item} className="flex flex-col gap-8">
            {/* Photo */}
            <div className="relative group mx-auto lg:mx-0 w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 aspect-[4/3]">
                <img
                  src="/assets/youmna.png"
                  alt="Youmna"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-xl tracking-tight">Youmna</p>
                  <p className="text-primary text-sm font-mono">3D Artist & Developer</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-5 text-muted-foreground text-base font-light leading-relaxed">
              <p>
                I live in the liminal space between logic and aesthetics — where clean code becomes living art. Traditional developers see DOM elements; I see a canvas waiting for light, dimension, and physics.
              </p>
              <p>
                My passion is escaping the flat web. By fusing frontend engineering with WebGL and 3D pipelines, I craft experiences that don't just present information — they pull the viewer in.
              </p>
              <blockquote className="border-l-2 border-secondary pl-4 text-foreground/80 italic text-sm">
                "The screen is not a boundary — it is a window into a synthesized reality."
              </blockquote>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToContact}
                className="group flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-mono tracking-wider uppercase rounded-full hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-105"
              >
                <Mail size={14} />
                Work With Me
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 border border-border text-muted-foreground text-sm font-mono tracking-wider uppercase rounded-full hover:border-primary/50 hover:text-primary transition-all duration-300">
                <Download size={14} />
                Download CV
              </button>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div variants={item} className="relative">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10">MY JOURNEY</h2>

            <div className="absolute left-[27px] top-[72px] bottom-4 w-px bg-gradient-to-b from-primary/60 to-transparent hidden" />

            <div className="space-y-10">
              {timeline.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={item}
                    className="relative flex gap-6 group"
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/60 group-hover:shadow-[0_0_18px_rgba(139,92,246,0.3)] transition-all duration-500">
                      <Icon size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col pt-2 border-b border-border/30 pb-8 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono tracking-widest text-secondary">{step.year}</span>
                        <div className="h-px flex-1 bg-border/40" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

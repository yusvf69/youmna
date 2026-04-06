import { motion } from "framer-motion";
import { SiReact, SiThreedotjs, SiNodedotjs, SiPython, SiFigma, SiTypescript, SiWebgl, SiBlender } from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Three.js", icon: SiThreedotjs, color: "#8B5CF6" },
  { name: "Blender", icon: SiBlender, color: "#F5792A" },
  { name: "WebGL", icon: SiWebgl, color: "#990000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

export function Skills() {
  return (
    <section id="skills" className="py-32 relative bg-card/30 border-y border-border/50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <span className="text-secondary font-mono tracking-widest text-sm mb-2">// TOOLSET</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">ARSENAL</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group relative bg-background border border-border p-8 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                
                <div className="relative">
                  <div className="absolute inset-0 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{ backgroundColor: skill.color }} />
                  <Icon size={48} className="relative z-10 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                </div>
                
                <span className="font-mono text-sm tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/0 group-hover:border-primary transition-colors rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-secondary/0 group-hover:border-secondary transition-colors rounded-br-xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

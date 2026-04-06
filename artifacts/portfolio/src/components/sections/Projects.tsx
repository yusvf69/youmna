import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

// Using the generated images
const projectsData = [
  {
    id: 1,
    title: "Neon Nexus",
    description: "A cyberpunk-themed social dashboard with real-time 3D elements and dark mode aesthetics.",
    category: "3D",
    image: "/assets/projects/project1.png",
    tags: ["React", "Three.js", "Tailwind"],
  },
  {
    id: 2,
    title: "Quantum Analytics",
    description: "Futuristic data visualization platform for abstract datasets using WebGL.",
    category: "UI",
    image: "/assets/projects/project2.png",
    tags: ["Next.js", "D3.js", "Framer Motion"],
  },
  {
    id: 3,
    title: "HUD Interface",
    description: "Concept UI for a next-generation heads-up display with intricate geometric interactions.",
    category: "UI",
    image: "/assets/projects/project3.png",
    tags: ["TypeScript", "SVG", "CSS Animation"],
  },
  {
    id: 4,
    title: "AeroStep Configurator",
    description: "Interactive 3D product configurator for custom hovering sneakers.",
    category: "3D",
    image: "/assets/projects/project4.png",
    tags: ["React Three Fiber", "Zustand", "Blender"],
  },
  {
    id: 5,
    title: "Flux Particles",
    description: "Generative art sequences driven by audio input and complex math algorithms.",
    category: "Programming",
    image: "/assets/projects/project5.png",
    tags: ["WebGL", "GLSL", "Audio API"],
  },
  {
    id: 6,
    title: "Terra Nova",
    description: "Procedurally generated sci-fi landscapes with real-time day/night cycles.",
    category: "Programming",
    image: "/assets/projects/project6.png",
    tags: ["Three.js", "Procedural Gen", "React"],
  },
];

const categories = ["All", "Programming", "3D", "UI"];

export function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">SYSTEM_ARCHIVE</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            A selection of recent works exploring the boundaries between functional interfaces and artistic expression.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-2 text-sm font-mono tracking-widest uppercase rounded-full transition-colors cursor-pointer ${
                activeTab === cat ? "text-primary" : "text-muted-foreground hover:text-white"
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 border border-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-500"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center gap-4">
                    <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all cursor-pointer">
                      <ExternalLink size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer border border-white/20">
                      <Github size={20} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground border border-border px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm font-light mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-primary/80 bg-primary/10 px-2 py-1 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glowing border effect on hover */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 blur-sm -z-10 transition-opacity duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

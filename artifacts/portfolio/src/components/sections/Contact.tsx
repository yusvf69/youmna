import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SiGithub, SiX, SiBehance } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const socials = [
    { icon: SiGithub, name: "GitHub", href: "#" },
    { icon: FaLinkedin, name: "LinkedIn", href: "#" },
    { icon: SiX, name: "X", href: "#" },
    { icon: SiBehance, name: "Behance", href: "#" },
  ];

  return (
    <section id="contact" className="py-32 relative bg-card/30 border-t border-border/50">
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">INITIATE_CONTACT</h2>
            <p className="text-muted-foreground font-light text-lg mb-10 max-w-md">
              Whether you have a project in mind, want to collaborate, or just want to chat about the future of digital experiences. Let's connect.
            </p>

            <div className="space-y-6">
              <h3 className="text-sm font-mono text-secondary tracking-widest uppercase">Network Links</h3>
              <div className="flex gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <Icon size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-auto pt-16">
              <p className="text-sm text-muted-foreground/50 font-mono">
                © {new Date().getFullYear()} ALEX RIVERA. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-border p-8 rounded-2xl relative"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
              <div className="absolute top-0 right-0 w-2 h-16 bg-primary transform translate-x-1" />
              <div className="absolute top-0 right-0 w-16 h-2 bg-primary transform -translate-y-1" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono text-muted-foreground tracking-wider uppercase">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-card/50 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono text-muted-foreground tracking-wider uppercase">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-card/50 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-muted-foreground tracking-wider uppercase">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-card/50 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Transmission contents..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden bg-transparent border border-primary text-primary px-6 py-4 rounded-md font-mono tracking-widest uppercase transition-all hover:text-primary-foreground disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out z-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? "Transmitting..." : isSubmitted ? "Received" : "Send Message"}
                  {!isSubmitting && !isSubmitted && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

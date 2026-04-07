import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Mail, MessageSquare, User } from "lucide-react";
import { SiGithub, SiX, SiBehance } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const socials = [
  { icon: SiGithub, name: "GitHub", href: "#", color: "hover:text-white" },
  {
    icon: FaLinkedin,
    name: "LinkedIn",
    href: "#",
    color: "hover:text-blue-400",
  },
  { icon: SiX, name: "X", href: "#", color: "hover:text-white" },
  { icon: SiBehance, name: "Behance", href: "#", color: "hover:text-blue-500" },
];

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-primary/8 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles size={12} />
            Let's Create Together
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            START A{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              PROJECT
            </span>
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-md mx-auto">
            Have a vision? I transform ideas into immersive digital realities.
            Let's build something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info cards */}
            {[
              { icon: Mail, label: "Email", value: "youmnawork69@gmail.com" },
              {
                icon: MessageSquare,
                label: "Response",
                value: "Within 24 hours",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                    {label}
                  </p>
                  <p className="text-sm text-foreground font-medium mt-0.5">
                    {value}
                  </p>
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="p-5 bg-green-950/30 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-mono tracking-widest uppercase">
                  Available Now
                </span>
              </div>
              <p className="text-muted-foreground text-sm font-light">
                Currently open to freelance projects, collaborations, and
                full-time opportunities.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
                Find Me On
              </p>
              <div className="flex gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className={`w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground ${social.color} hover:border-primary/40 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all duration-300`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="relative bg-card border border-border rounded-2xl p-8 overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-0.5 h-16 bg-gradient-to-b from-primary/60 to-transparent" />
              <div className="absolute top-0 right-0 w-16 h-0.5 bg-gradient-to-l from-primary/60 to-transparent" />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(139,92,246,0.4)]">
                    <Sparkles size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
                  <p className="text-muted-foreground text-sm">
                    I'll get back to you within 24 hours. Can't wait to connect!
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 relative z-10"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
                      <User size={10} /> Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-background border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/40 ${
                        focused === "name"
                          ? "border-primary shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                          : "border-border"
                      }`}
                      placeholder="Jane Smith"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
                      <Mail size={10} /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-background border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/40 ${
                        focused === "email"
                          ? "border-primary shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                          : "border-border"
                      }`}
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
                      <MessageSquare size={10} /> Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-background border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/40 ${
                        focused === "message"
                          ? "border-primary shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                          : "border-border"
                      }`}
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden bg-primary text-white font-mono tracking-widest uppercase text-sm px-6 py-4 rounded-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send
                            size={15}
                            className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200"
                          />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs font-mono text-muted-foreground/50 tracking-widest">
            © {new Date().getFullYear()} YOUMNA — ALL RIGHTS RESERVED
          </p>
          <p className="text-xs font-mono text-muted-foreground/40">
            Designed & Built with <span className="text-primary">love</span> &{" "}
            <span className="text-secondary">code</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

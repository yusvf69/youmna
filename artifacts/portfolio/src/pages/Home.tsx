import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { useEffect } from "react";

export default function Home() {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      // Cleanup if needed, though this is a single page app meant to be dark
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <CustomCursor />
      <LoadingScreen />
      <Navbar />
      
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Gallery />
      <Contact />
    </main>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

const galleryImages = [
  { id: 1, src: "/assets/gallery/gallery1.png", alt: "Sci-fi interior", aspect: "aspect-[3/4]" },
  { id: 2, src: "/assets/gallery/gallery2.png", alt: "Abstract metallic shapes", aspect: "aspect-[4/3]" },
  { id: 3, src: "/assets/projects/project4.png", alt: "3D Product config", aspect: "aspect-square" },
  { id: 4, src: "/assets/gallery/gallery3.png", alt: "Glowing crystals", aspect: "aspect-square" },
  { id: 5, src: "/assets/gallery/gallery4.png", alt: "Deep space nebula", aspect: "aspect-[16/9]" },
  { id: 6, src: "/assets/projects/project1.png", alt: "Cyberpunk city", aspect: "aspect-[16/9]" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">RENDER_BAY</h2>
            <p className="text-muted-foreground font-light">Raw 3D output. No post-processing, pure light and geometry.</p>
          </div>
          <div className="hidden md:block w-32 h-px bg-gradient-to-r from-transparent to-primary/50" />
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-xl group cursor-pointer break-inside-avoid ${img.aspect} w-full`}
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <Maximize2 className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 delay-100" />
              </div>
              
              {/* Scanline overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Fullscreen view"
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-[0_0_50px_rgba(139,92,246,0.2)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import reportCover from "@/assets/report-cover.jpg";
import reportVision from "@/assets/report-vision.jpg";
import reportBorehole from "@/assets/report-borehole.jpg";
import reportSignboard from "@/assets/report-signboard-2023.jpg";
import reportCatalyst from "@/assets/report-catalyst-2024.jpg";
import reportValp from "@/assets/report-valp-2025.jpg";
import reportGovernance from "@/assets/report-governance.jpg";
import reportStrategy from "@/assets/report-strategy-2026.jpg";

const galleryItems = [
  { src: reportCover, caption: "WWF Impact Report 2023–2025 & Strategic Action Plan 2026" },
  { src: reportVision, caption: "Community engagement and stakeholder meetings" },
  { src: reportBorehole, caption: "Borehole construction — End Water Crisis Initiative" },
  { src: reportSignboard, caption: "Project signboard at Oberiakia Community, Akamkpa LGA" },
  { src: reportCatalyst, caption: "VALP 2024 — Catalysts for Change campaign in schools" },
  { src: reportValp, caption: "VALP 2025 — Students holding values-based message cards" },
  { src: reportGovernance, caption: "Audited Financial Reports — Governance & Accountability" },
  { src: reportStrategy, caption: "Strategic Intent for 2026 — Community facilitation" },
];

export function MediaGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % galleryItems.length : null));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-extrabold text-3xl text-foreground mb-3">Media Gallery</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Documenting our journey through authentic imagery from the field.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => openLightbox(i)}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-3">
                <p className="text-primary-foreground text-xs font-heading opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground z-10"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-primary-foreground/80 hover:text-primary-foreground z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-primary-foreground/80 hover:text-primary-foreground z-10"
              aria-label="Next"
            >
              <ChevronRight size={36} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].caption}
                className="max-h-[75vh] w-auto rounded-lg object-contain"
              />
              <p className="text-primary-foreground/90 text-sm font-heading mt-4 text-center max-w-md">
                {galleryItems[lightboxIndex].caption}
              </p>
              <p className="text-primary-foreground/50 text-xs mt-1">
                {lightboxIndex + 1} / {galleryItems.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

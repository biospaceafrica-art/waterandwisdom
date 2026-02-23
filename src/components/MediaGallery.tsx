import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import impactStudentsHall from "@/assets/impact-students-hall.jpg";
import impactStudentsOutdoor from "@/assets/impact-students-outdoor.jpg";
import impactNotebook from "@/assets/impact-notebook-distribution.jpg";
import impactWashMessage from "@/assets/impact-wash-message.jpg";
import impactCatalystGirl from "@/assets/impact-catalyst-girl.jpg";
import impactStudentsSigns from "@/assets/impact-students-signs.jpg";
import impactValpSession from "@/assets/impact-valp-session.jpg";
import impactCertificate from "@/assets/impact-certificate.jpg";

const galleryItems = [
  { src: impactStudentsHall, caption: "Students excited during a VALP values campaign session" },
  { src: impactStudentsOutdoor, caption: "Students gathered for outdoor VALP engagement programme" },
  { src: impactNotebook, caption: "Branded notebook and materials distribution across schools" },
  { src: impactWashMessage, caption: "Spread Love, Not Germs — WASH hygiene awareness campaign" },
  { src: impactCatalystGirl, caption: "Student declaring 'I Am a Catalyst for Change' at VALP" },
  { src: impactStudentsSigns, caption: "Students holding values-based message cards during campaign" },
  { src: impactValpSession, caption: "VALP facilitator addressing students during school session" },
  { src: impactCertificate, caption: "Certificate presentation at VALP programme completion" },
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

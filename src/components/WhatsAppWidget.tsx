import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "2348069387354";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I'd like to learn more about the Water and Wisdom Foundation.");

export function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg max-w-[200px]"
          >
            <p className="text-xs font-heading font-semibold text-foreground mb-0.5">Chat with us</p>
            <p className="text-xs text-muted-foreground">We typically respond within minutes on WhatsApp</p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}

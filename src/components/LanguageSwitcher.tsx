import { useTranslation } from "react-i18next";
import { languages } from "@/i18n";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus the active item when dropdown opens
  useEffect(() => {
    if (open) {
      const idx = languages.findIndex((l) => l.code === i18n.language);
      setFocusIndex(idx >= 0 ? idx : 0);
      setTimeout(() => itemsRef.current[idx >= 0 ? idx : 0]?.focus(), 0);
    } else {
      setFocusIndex(-1);
    }
  }, [open, i18n.language]);

  // Global keyboard shortcut: Alt+L to toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const selectLang = useCallback((code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  }, [i18n]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusIndex((prev) => {
          const next = (prev + 1) % languages.length;
          itemsRef.current[next]?.focus();
          return next;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusIndex((prev) => {
          const next = (prev - 1 + languages.length) % languages.length;
          itemsRef.current[next]?.focus();
          return next;
        });
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Home":
        e.preventDefault();
        setFocusIndex(0);
        itemsRef.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        setFocusIndex(languages.length - 1);
        itemsRef.current[languages.length - 1]?.focus();
        break;
    }
  };

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Change language (Alt+L)"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={15} />
        <span className="hidden sm:inline">{current.flag} {current.label}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-50"
          role="listbox"
          aria-label="Select language"
        >
          {languages.map((lang, i) => (
            <button
              key={lang.code}
              ref={(el) => { itemsRef.current[i] = el; }}
              role="option"
              aria-selected={lang.code === i18n.language}
              onClick={() => selectLang(lang.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectLang(lang.code);
                }
              }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors focus:outline-none focus:bg-muted ${
                lang.code === i18n.language ? "text-secondary font-semibold" : "text-foreground"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

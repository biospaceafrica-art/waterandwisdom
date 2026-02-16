import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import pcm from "./locales/pcm";
import ha from "./locales/ha";
import yo from "./locales/yo";
import ig from "./locales/ig";
import fr from "./locales/fr";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pcm: { translation: pcm },
    ha: { translation: ha },
    yo: { translation: yo },
    ig: { translation: ig },
    fr: { translation: fr },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;

export const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "pcm", label: "Pidgin", flag: "🇳🇬" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
  { code: "yo", label: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

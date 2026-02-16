import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface TranslateButtonProps {
  text: string;
  onTranslated: (translated: string) => void;
}

export function TranslateButton({ text, onTranslated }: TranslateButtonProps) {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState(false);

  const handleTranslate = async () => {
    if (i18n.language === "en" || translated) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("translate-story", {
        body: { text, targetLang: i18n.language },
      });
      if (error) throw error;
      if (data?.translated) {
        onTranslated(data.translated);
        setTranslated(true);
      }
    } catch (err) {
      console.error("Translation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (i18n.language === "en") return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleTranslate}
      disabled={loading || translated}
      className="gap-1.5 text-xs text-secondary hover:text-secondary/80"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />}
      {translated ? "Translated" : "Translate"}
    </Button>
  );
}

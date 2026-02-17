import { useTranslation } from "react-i18next";

interface StoryFiltersProps {
  sdgTags: string[];
  locations: string[];
  languages: string[];
  selectedSdg: string;
  selectedLocation: string;
  selectedLanguage: string;
  onSdgChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onLanguageChange: (val: string) => void;
}

export function StoryFilters({
  sdgTags,
  locations,
  languages,
  selectedSdg,
  selectedLocation,
  selectedLanguage,
  onSdgChange,
  onLocationChange,
  onLanguageChange,
}: StoryFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* SDG Filter */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="sdg-filter" className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
          {t("stories_filter_sdg")}
        </label>
        <select
          id="sdg-filter"
          value={selectedSdg}
          onChange={(e) => onSdgChange(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">{t("stories_filter_all_sdgs")}</option>
          {sdgTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Region Filter */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="region-filter" className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
          {t("stories_filter_region")}
        </label>
        <select
          id="region-filter"
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">{t("stories_filter_all_regions")}</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Language Filter */}
      {languages.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="language-filter" className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
            Language
          </label>
          <select
            id="language-filter"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      )}

      {/* Clear */}
      {(selectedSdg || selectedLocation || selectedLanguage) && (
        <button
          onClick={() => { onSdgChange(""); onLocationChange(""); onLanguageChange(""); }}
          className="self-end h-9 px-3 text-sm text-secondary hover:underline font-heading font-semibold"
        >
          {t("stories_filter_clear")}
        </button>
      )}
    </div>
  );
}

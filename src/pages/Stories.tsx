import { Layout } from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";
import { StoryFilters } from "@/components/StoryFilters";

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  image_url: string | null;
  featured: boolean;
  author_name: string | null;
  location: string | null;
  sdg_tags: string[] | null;
  published_at: string | null;
}

const Stories = () => {
  const { t } = useTranslation();
  const [stories, setStories] = useState<Story[]>([]);
  const [selected, setSelected] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSdg, setSelectedSdg] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("donor_stories")
        .select("*")
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false });
      if (data) setStories(data as Story[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const allSdgTags = useMemo(() => {
    const tags = new Set<string>();
    stories.forEach((s) => s.sdg_tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [stories]);

  const allLocations = useMemo(() => {
    const locs = new Set<string>();
    stories.forEach((s) => { if (s.location) locs.add(s.location); });
    return Array.from(locs).sort();
  }, [stories]);

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      if (selectedSdg && !(s.sdg_tags || []).includes(selectedSdg)) return false;
      if (selectedLocation && s.location !== selectedLocation) return false;
      return true;
    });
  }, [stories, selectedSdg, selectedLocation]);

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">
              {t("stories_title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("stories_subtitle")}
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-muted-foreground py-12">Loading stories…</div>
          ) : (
            <>
              <StoryFilters
                sdgTags={allSdgTags}
                locations={allLocations}
                selectedSdg={selectedSdg}
                selectedLocation={selectedLocation}
                onSdgChange={setSelectedSdg}
                onLocationChange={setSelectedLocation}
              />

              {/* Featured story */}
              {filtered.filter((s) => s.featured).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-12"
                >
                  {filtered
                    .filter((s) => s.featured)
                    .slice(0, 1)
                    .map((story) => (
                      <div
                        key={story.id}
                        className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-teal transition-shadow"
                        onClick={() => setSelected(story)}
                      >
                        <div className="grid md:grid-cols-2">
                          <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center">
                            {story.image_url ? (
                              <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" />
                            ) : (
                              <BookOpen className="text-muted-foreground" size={48} />
                            )}
                          </div>
                          <div className="p-8 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded font-heading font-semibold uppercase tracking-wider">
                                {t("stories_featured")}
                              </span>
                              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded font-heading font-semibold uppercase tracking-wider">
                                {story.category}
                              </span>
                            </div>
                            <h2 className="font-heading font-extrabold text-2xl text-foreground mb-3">
                              {story.title}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                              {story.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {story.author_name && <span>{story.author_name}</span>}
                              {story.location && <span>📍 {story.location}</span>}
                            </div>
                            {story.sdg_tags && story.sdg_tags.length > 0 && (
                              <div className="flex gap-1 mt-3">
                                {story.sdg_tags.map((tag) => (
                                  <span key={tag} className="text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded font-heading font-semibold">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </motion.div>
              )}

              {/* Stories grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered
                  .filter((s) => !s.featured || filtered.filter((x) => x.featured).indexOf(s) > 0)
                  .map((story, i) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-teal transition-shadow"
                      onClick={() => setSelected(story)}
                    >
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        {story.image_url ? (
                          <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="text-muted-foreground" size={32} />
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-heading font-semibold uppercase tracking-wider">
                            {story.category}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-foreground mb-2">{story.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{story.excerpt}</p>
                        <p className="text-xs text-secondary font-heading font-semibold mt-3">
                          {t("stories_read_more")} →
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Story Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded font-heading font-semibold uppercase tracking-wider">
                {selected.category}
              </span>
              {selected.sdg_tags?.map((tag) => (
                <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-heading font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-foreground mb-2">{selected.title}</h2>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              {selected.author_name && <span>By {selected.author_name}</span>}
              {selected.location && <span>📍 {selected.location}</span>}
              {selected.published_at && (
                <span>{new Date(selected.published_at).toLocaleDateString()}</span>
              )}
            </div>
            <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
              {selected.content}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 text-sm text-secondary font-heading font-semibold hover:underline"
            >
              ← Back to Stories
            </button>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default Stories;

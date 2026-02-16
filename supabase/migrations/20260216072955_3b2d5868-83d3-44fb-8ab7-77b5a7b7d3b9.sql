
-- Donor stories table
CREATE TABLE public.donor_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Impact',
    image_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    author_name TEXT,
    location TEXT,
    sdg_tags TEXT[],
    published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.donor_stories ENABLE ROW LEVEL SECURITY;

-- Anyone can read published stories
CREATE POLICY "Anyone can view published stories" ON public.donor_stories
  FOR SELECT TO anon, authenticated USING (published = true);

-- Admins can manage all stories
CREATE POLICY "Admins can manage stories" ON public.donor_stories
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE TRIGGER update_donor_stories_updated_at
  BEFORE UPDATE ON public.donor_stories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Story images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'story-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload story images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');
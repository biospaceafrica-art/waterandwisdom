import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { PillarsSection } from "@/components/PillarsSection";
import { StatsSection } from "@/components/StatsSection";
import { StoryTeaser } from "@/components/StoryTeaser";
import { VolunteerCarousel } from "@/components/VolunteerCarousel";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCTA } from "@/components/FinalCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PillarsSection />
      <StatsSection />
      <StoryTeaser />
      <TestimonialsSection />
      <VolunteerCarousel />
      <FinalCTA />
    </Layout>
  );
};

export default Index;

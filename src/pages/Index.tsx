import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { PillarsSection } from "@/components/PillarsSection";
import { StatsSection } from "@/components/StatsSection";
import { StoryTeaser } from "@/components/StoryTeaser";
import { FinalCTA } from "@/components/FinalCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PillarsSection />
      <StatsSection />
      <StoryTeaser />
      <FinalCTA />
    </Layout>
  );
};

export default Index;

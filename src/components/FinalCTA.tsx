import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="bg-cta-gradient py-24">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
          Join us in building a future where every child can learn, lead, and live well.
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-10 text-lg">
          Your partnership creates ripples of change that transform entire communities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-semibold px-8"
            asChild
          >
            <Link to="/contact">Partner With Us</Link>
          </Button>
          <Button
            size="lg"
            className="bg-wwf-amber hover:bg-wwf-amber/90 text-foreground font-heading font-semibold px-8"
            asChild
          >
            <Link to="/contact">Support Our Work</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-heading font-semibold px-8"
            asChild
          >
            <Link to="/impact">Explore Our Impact</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

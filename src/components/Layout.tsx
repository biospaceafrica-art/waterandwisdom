import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppWidget } from "./WhatsAppWidget";
import { ScrollToTop } from "./ScrollToTop";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-secondary focus:text-secondary-foreground focus:px-4 focus:py-2 focus:rounded-md font-heading font-semibold">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-16" role="main">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}

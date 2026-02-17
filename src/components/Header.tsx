import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DarkModeToggle } from "./DarkModeToggle";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo-official.jpeg";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav_home"), to: "/" },
    { label: t("nav_about"), to: "/about" },
    { label: t("nav_programmes"), to: "/programmes" },
    { label: t("nav_impact"), to: "/impact" },
    { label: t("nav_stories"), to: "/stories" },
    { label: t("nav_why_fund"), to: "/why-fund-us" },
    { label: t("nav_contact"), to: "/contact" },
    { label: t("nav_portal"), to: "/auth" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Water and Wisdom Foundation" className="h-12 w-auto rounded-md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-sm px-3 py-2 rounded-md transition-colors ${
                location.pathname === link.to
                  ? "text-secondary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons + Language + Dark Mode */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher />
          <DarkModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link to="/contact">{t("nav_partner")}</Link>
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
            <Link to="/donate">{t("nav_donate")}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <DarkModeToggle />
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`font-sans text-sm px-3 py-2 rounded-md ${
                  location.pathname === link.to
                    ? "text-secondary font-semibold bg-muted"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>{t("nav_partner")}</Link>
              </Button>
              <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <Link to="/donate" onClick={() => setIsOpen(false)}>{t("nav_donate")}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

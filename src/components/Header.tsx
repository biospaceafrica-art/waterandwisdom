import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programmes", to: "/programmes" },
  { label: "Impact", to: "/impact" },
  { label: "Why Fund Us", to: "/why-fund-us" },
  { label: "Contact", to: "/contact" },
  { label: "Donor Portal", to: "/auth" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <span className="font-heading font-bold text-secondary-foreground text-sm">W</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-sm text-foreground leading-tight block">Water & Wisdom</span>
            <span className="font-heading text-[10px] text-muted-foreground leading-tight block tracking-wider uppercase">Foundation</span>
          </div>
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

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/contact">Partner With Us</Link>
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
            <Link to="/contact">Donate</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
                <Link to="/contact" onClick={() => setIsOpen(false)}>Partner With Us</Link>
              </Button>
              <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>Donate</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

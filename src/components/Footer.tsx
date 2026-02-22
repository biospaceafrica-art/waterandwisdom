import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import logo from "@/assets/logo-official.jpeg";

const links = [
  { label: "About", to: "/about" },
  { label: "Programmes", to: "/programmes" },
  { label: "Impact", to: "/impact" },
  { label: "Stories", to: "/stories" },
  { label: "Contact", to: "/contact" },
  { label: "Donate", to: "/donate" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main row */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          {/* Logo + tagline */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Water and Wisdom Foundation" className="h-10 w-auto rounded" />
            <span className="text-xs opacity-70 max-w-[10rem] leading-tight hidden sm:block">
              Where clean water meets education.
            </span>
          </Link>

          {/* Nav links — horizontal wrap */}
          <nav className="flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Footer navigation">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs opacity-60 hover:opacity-100 transition-opacity"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact pills */}
          <div className="flex flex-wrap items-center gap-3 md:ml-auto text-xs">
            <a
              href="mailto:waterandwisdomfoundation@gmail.com"
              className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Mail size={13} className="shrink-0" />
              <span className="hidden sm:inline">waterandwisdomfoundation@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a
              href="https://wa.me/2348069387354"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Phone size={13} className="shrink-0" />
              <span>+234 806 938 7354</span>
            </a>
            <a
              href="https://www.instagram.com/the_waterandwisdomfoundation?igsh=cXliaGw4ZGVzMnNk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram size={13} className="shrink-0" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/share/188HiU9Qu1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook size={13} className="shrink-0" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>
        </div>

        {/* Newsletter + bottom bar */}
        <div className="border-t border-primary-foreground/10 mt-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto max-w-sm">
            <NewsletterForm variant="footer" />
          </div>
          <p className="text-[10px] opacity-50 text-center sm:text-right whitespace-nowrap">
            © {new Date().getFullYear()} Water & Wisdom Foundation · Registered NGO — Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

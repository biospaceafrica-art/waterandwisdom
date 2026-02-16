import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-heading font-bold text-secondary-foreground">W</span>
              </div>
              <div>
                <span className="font-heading font-bold text-sm block">Water & Wisdom</span>
                <span className="font-heading text-[10px] tracking-wider uppercase opacity-70 block">Foundation</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Where clean water meets education. Transforming lives through integrated, community-centred programmes across Nigeria.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "About Us", to: "/about" },
                { label: "Our Programmes", to: "/programmes" },
                { label: "Impact & Stories", to: "/impact" },
                { label: "Why Fund Us", to: "/why-fund-us" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:waterandwisdomfoundation@gmail.com" className="flex items-start gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>waterandwisdomfoundation@gmail.com</span>
              </a>
              <a href="https://wa.me/2348069387354" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span>+234 806 938 7354 (WhatsApp)</span>
              </a>
              <a href="https://instagram.com/thewaterandwisdomfoundation" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>@thewaterandwisdomfoundation</span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm opacity-70 mb-4">
              Subscribe for impact stories and programme updates.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-heading text-sm font-semibold hover:bg-secondary/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Water and Wisdom Foundation. All rights reserved.
          </p>
          <p className="text-xs opacity-60">
            Registered NGO — Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

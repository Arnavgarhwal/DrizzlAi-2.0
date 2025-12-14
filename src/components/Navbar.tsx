import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const navLinks = [
  { key: "services", href: "/services", isHash: false },
  { key: "work", href: "/work", isHash: false },
  { key: "blog", href: "/blog", isHash: false },
  { key: "about", href: "/about", isHash: false },
  { key: "contact", href: "/contact", isHash: false },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const handleNavClick = (href: string, isHash: boolean) => {
    setIsOpen(false);
    if (isHash && location.pathname === "/") {
      // If we're on the home page, scroll to section
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with 3D effect */}
          <Link to="/" className="flex items-center gap-3 group perspective-1000">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform transition-all duration-500 group-hover:rotate-y-12 group-hover:scale-110 group-hover:shadow-[0_20px_40px_hsl(var(--primary)/0.4)]">
              <span className="text-primary-foreground font-display font-bold text-xl">D</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground transition-all duration-300 group-hover:text-primary group-hover:tracking-wider">
              DrizzlAi
            </span>
          </Link>

          {/* Desktop Nav with 3D animated links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              link.isHash ? (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => handleNavClick(link.href, link.isHash)}
                  className="relative px-4 py-2 text-muted-foreground text-sm font-medium transition-all duration-300 hover:text-foreground group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {t(`nav.${link.key}`)}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:from-primary/10 group-hover:to-accent/10 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.1)] transform group-hover:scale-105" />
                  <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
                </a>
              ) : (
                <Link
                  key={link.key}
                  to={link.href}
                  className="relative px-4 py-2 text-muted-foreground text-sm font-medium transition-all duration-300 hover:text-foreground group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {t(`nav.${link.key}`)}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:from-primary/10 group-hover:to-accent/10 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.1)] transform group-hover:scale-105" />
                  <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
                </Link>
              )
            ))}
            <Link to="/get-started">
              <Button
                variant="hero" 
                size="sm" 
                className="ml-2 transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)]"
              >
                {t("nav.getStarted")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isHash ? (
                  <a
                    key={link.key}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2 text-lg"
                    onClick={() => handleNavClick(link.href, link.isHash)}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                ) : (
                  <Link
                    key={link.key}
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2 text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                )
              ))}
              <Link to="/get-started" onClick={() => setIsOpen(false)}>
                <Button variant="hero" className="mt-4">
                  {t("nav.getStarted")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with 3D effect */}
          <a href="#" className="flex items-center gap-3 group perspective-1000">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform transition-all duration-500 group-hover:rotate-y-12 group-hover:scale-110 group-hover:shadow-[0_20px_40px_hsl(var(--primary)/0.4)]">
              <span className="text-primary-foreground font-display font-bold text-xl">D</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground transition-all duration-300 group-hover:text-primary group-hover:tracking-wider">
              DrizzleAi
            </span>
          </a>

          {/* Desktop Nav with 3D animated links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-muted-foreground text-sm font-medium transition-all duration-300 hover:text-foreground group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  {link.name}
                </span>
                {/* 3D hover background */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:from-primary/10 group-hover:to-accent/10 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.1)] transform group-hover:scale-105" />
                {/* Animated underline */}
                <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
              </a>
            ))}
            <Button 
              variant="hero" 
              size="sm" 
              className="ml-4 transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)]"
            >
              Get Started
            </Button>
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="hero" className="mt-4">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

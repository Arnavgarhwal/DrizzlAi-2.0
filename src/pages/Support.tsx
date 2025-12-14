import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ParallaxBackground, FloatingParticles } from "@/components/ParallaxBackground";
import { Mail, MapPin, Instagram, MessageCircle, HelpCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// X (formerly Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our AI assistant for instant help",
    action: "Open Chat",
    type: "chat"
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Find answers to common questions",
    action: "View FAQ",
    href: "/faq"
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Learn about our services and process",
    action: "Read Docs",
    href: "/services"
  }
];

const Support = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <ParallaxBackground variant="gradient" intensity={0.5} />
        <FloatingParticles count={8} />
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="slideUp">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Help Center</span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
                How Can We <span className="gradient-text">Help?</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                We're here to assist you. Choose an option below or reach out directly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.1}>
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <StaggerItem key={option.title}>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 text-center hover:border-primary/50 transition-all">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                    {option.href ? (
                      <Link to={option.href}>
                        <Button variant="outline" size="sm">{option.action}</Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm">{option.action}</Button>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="slideUp">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                  Contact Us Directly
                </h2>
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
                  <StaggerItem>
                    <a href="mailto:hello.drizzlai@gmail.com" className="flex flex-col items-center gap-3 group">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">hello.drizzlai@gmail.com</div>
                      </div>
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium text-sm">Mumbai, India</div>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <a 
                      href="https://www.instagram.com/drizzlai/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Instagram className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Instagram</div>
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">@drizzlai</div>
                      </div>
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <a 
                      href="https://x.com/DrizzlAi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <XIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Twitter/X</div>
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">@DrizzlAi</div>
                      </div>
                    </a>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Support;

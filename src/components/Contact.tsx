import { ArrowRight, Mail, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export const Contact = () => {
  return (
    <section id="contact" className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* CTA Card */}
          <ScrollReveal animation="scale">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary p-px rounded-3xl">
                <div className="w-full h-full bg-card rounded-[23px]" />
              </div>
              
              <div className="relative p-12 md:p-16 text-center">
                <ScrollReveal animation="slideUp">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
                  <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
                    Ready to Start
                    <span className="gradient-text block">Your Project?</span>
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal animation="slideUp" delay={0.1}>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                    Let's collaborate to bring your vision to life. Whether you need a new website, 
                    a complete redesign, or ongoing support – we're here to help.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal animation="slideUp" delay={0.2}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Button variant="hero" size="lg">
                      Schedule a Call
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </ScrollReveal>

                {/* Contact Info */}
                <StaggerContainer className="grid md:grid-cols-3 gap-8 pt-10 border-t border-border/50 max-w-3xl mx-auto" staggerDelay={0.15}>
                  <StaggerItem>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email Us</div>
                        <div className="font-medium">hello.drizzlai@gmail.com</div>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium">Mumbai, India</div>
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
                      <div>
                        <div className="text-sm text-muted-foreground">Follow Us</div>
                        <div className="font-medium group-hover:text-primary transition-colors">@drizzlai</div>
                      </div>
                    </a>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

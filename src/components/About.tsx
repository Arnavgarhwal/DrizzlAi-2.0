import { Check } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground";

const features = [
  "Custom design tailored to your brand",
  "Mobile-first responsive development",
  "SEO optimized for maximum visibility",
  "Lightning-fast performance",
  "Ongoing support & maintenance",
  "Conversion-focused strategies",
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground variant="gradient" intensity={0.6} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <ScrollReveal animation="slideLeft">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Content */}
          <div>
            <ScrollReveal animation="slideRight">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
                Crafting Digital
                <span className="gradient-text"> Excellence</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal animation="slideUp" delay={0.1}>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                At DrizzlAi, we're passionate about creating digital experiences that leave lasting impressions. 
                Our team of designers and developers work together to transform your ideas into stunning, 
                functional websites that drive real results.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="slideUp" delay={0.2}>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                We believe in the power of thoughtful design and clean code. Every project we undertake 
                is an opportunity to push boundaries and deliver something truly exceptional.
              </p>
            </ScrollReveal>

            {/* Features List */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.08}>
              {features.map((feature) => (
                <StaggerItem key={feature}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

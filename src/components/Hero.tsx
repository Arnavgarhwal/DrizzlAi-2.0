import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground, FloatingParticles } from "@/components/ParallaxBackground";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background Effects */}
      <ParallaxBackground variant="orbs" intensity={1.5} />
      <FloatingParticles count={15} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Heading */}
          <ScrollReveal animation="scale" duration={0.8}>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">DrizzlAi</span>
            </h1>
          </ScrollReveal>

          {/* Subheading */}
          <ScrollReveal animation="slideUp" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Crafting digital experiences that inspire.
            </p>
          </ScrollReveal>

          {/* Single CTA */}
          <ScrollReveal animation="slideUp" delay={0.4}>
            <a href="/get-started">
              <Button variant="hero" size="lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

import { Check } from "lucide-react";

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
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
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
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-card border border-border rounded-2xl p-6 shadow-2xl animate-float">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground">5+</span>
                </div>
                <div>
                  <div className="font-display font-bold text-lg">Years of</div>
                  <div className="text-muted-foreground">Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Crafting Digital
              <span className="gradient-text"> Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At DrizzleAi, we're passionate about creating digital experiences that leave lasting impressions. 
              Our team of designers and developers work together to transform your ideas into stunning, 
              functional websites that drive real results.
            </p>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              We believe in the power of thoughtful design and clean code. Every project we undertake 
              is an opportunity to push boundaries and deliver something truly exceptional.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

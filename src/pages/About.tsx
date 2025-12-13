import { Check, ArrowRight, Users, Target, Lightbulb, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  "Custom design tailored to your brand",
  "Mobile-first responsive development",
  "SEO optimized for maximum visibility",
  "Lightning-fast performance",
  "Ongoing support & maintenance",
  "Conversion-focused strategies",
];

const values = [
  {
    icon: Target,
    title: "Mission Driven",
    description: "We're committed to delivering exceptional digital experiences that help businesses grow and succeed in the digital landscape.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead of trends and leverage cutting-edge technologies to create solutions that stand out from the competition.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description: "Your success is our success. We work closely with every client to understand their unique needs and deliver tailored solutions.",
  },
  {
    icon: Award,
    title: "Quality Obsessed",
    description: "We never compromise on quality. Every project receives our full attention to detail and commitment to excellence.",
  },
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
              Crafting Digital
              <span className="gradient-text block">Excellence</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              At DrizzlAi, we're passionate about creating digital experiences that leave lasting impressions. 
              We transform ideas into stunning, functional websites that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 relative">
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
            </div>

            {/* Right Column - Content */}
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                From Vision to
                <span className="gradient-text"> Reality</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Founded in Mumbai, DrizzlAi emerged from a simple belief: every business deserves a stunning 
                digital presence. Our team of passionate designers and developers came together with a shared 
                vision of transforming how brands connect with their audiences online.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
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
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-secondary/30 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
              What Drives <span className="gradient-text">Us Forward</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's collaborate to bring your vision to life. We're excited to hear about your ideas.
            </p>
            <Link to="/#contact">
              <Button variant="hero" size="lg">
                Get In Touch
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default About;

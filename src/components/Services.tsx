import { Globe, Palette, Code, Layers, Zap, Shield } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const services = [
  {
    icon: Globe,
    title: "Web Design",
    description: "Beautiful, responsive websites that captivate your audience and drive conversions.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive interfaces and seamless user experiences that keep users engaged.",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Clean, scalable code that brings your designs to life with peak performance.",
  },
  {
    icon: Layers,
    title: "Brand Identity",
    description: "Cohesive visual identities that communicate your brand's unique story.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Lightning-fast load times and optimized experiences across all devices.",
  },
  {
    icon: Shield,
    title: "Maintenance",
    description: "Ongoing support and updates to keep your digital presence running smoothly.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-32 relative">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal animation="slideUp" className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Services That
            <span className="gradient-text"> Transform</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to launch, we provide end-to-end digital solutions that elevate your brand.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 card-hover cursor-pointer h-full">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

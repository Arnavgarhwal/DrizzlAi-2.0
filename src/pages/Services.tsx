import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Palette, Code, Smartphone, Globe, Zap, Layers, 
  ArrowRight, Check, Sparkles, Monitor, PenTool, Figma
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Section Badge Component
const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.span 
    variants={fadeInUp}
    className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/50 text-sm font-medium text-muted-foreground mb-6"
  >
    {children}
  </motion.span>
);

// Animated Section Wrapper
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Services data
const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Create intuitive and beautiful user interfaces that delight your customers and drive conversions.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Build fast, responsive, and scalable websites using modern technologies and best practices.",
    features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Performance Optimization"],
  },
  {
    icon: Smartphone,
    title: "Mobile Design",
    description: "Design seamless mobile experiences that work flawlessly across all devices and platforms.",
    features: ["iOS Design", "Android Design", "Cross-Platform", "App Store Assets"],
  },
  {
    icon: Globe,
    title: "Brand Identity",
    description: "Develop a cohesive brand identity that tells your story and resonates with your audience.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    icon: Layers,
    title: "Design Systems",
    description: "Create scalable design systems that ensure consistency across all your digital products.",
    features: ["Component Library", "Style Guides", "Documentation", "Token Systems"],
  },
  {
    icon: Zap,
    title: "Landing Pages",
    description: "Design high-converting landing pages optimized for engagement and lead generation.",
    features: ["Conversion Optimization", "A/B Testing Ready", "Fast Loading", "SEO Optimized"],
  },
];

// Process steps
const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We dive deep into understanding your business, goals, and target audience to create a solid foundation.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Based on our findings, we develop a comprehensive strategy that aligns with your objectives.",
  },
  {
    step: "03",
    title: "Design",
    description: "Our designers create stunning visuals and intuitive interfaces that bring your vision to life.",
  },
  {
    step: "04",
    title: "Development",
    description: "We build your product using cutting-edge technologies, ensuring performance and scalability.",
  },
  {
    step: "05",
    title: "Launch",
    description: "After rigorous testing, we launch your product and provide ongoing support for success.",
  },
];

// Tools we use
const tools = [
  { icon: Figma, name: "Figma" },
  { icon: PenTool, name: "Illustrator" },
  { icon: Monitor, name: "VS Code" },
  { icon: Sparkles, name: "Framer" },
];

const Services = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const layer4Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Parallax Background Layers */}
        <motion.div style={{ y: layer1Y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[180px]" />
        </motion.div>

        <motion.div style={{ y: layer2Y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </motion.div>

        <motion.div style={{ y: layer3Y }} className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)] pointer-events-none" />

        {/* Floating Elements */}
        <motion.div 
          style={{ y: layer4Y, rotate: rotate1 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm"
        />
        <motion.div 
          style={{ y: layer4Y, rotate: rotate2 }}
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[12%] w-20 h-20 rounded-xl bg-gradient-to-br from-accent/25 to-primary/25 border border-accent/30 backdrop-blur-sm"
        />
        <motion.div 
          style={{ y: layer3Y }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[40%] w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_10px_hsl(var(--primary)/0.3)]"
        />
        <motion.div 
          style={{ y: layer2Y }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[35%] w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_8px_hsl(var(--accent)/0.3)]"
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/50 text-sm font-medium text-muted-foreground mb-8"
          >
            Our Services
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
          >
            What We
            <span className="gradient-text block">Create</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            From concept to launch, we offer comprehensive digital services to transform your ideas into reality.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Grid */}
      <AnimatedSection className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Services</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              Everything You Need
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              We offer a full range of digital services to help your business thrive in the digital age.
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-32 relative bg-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Our Process</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              How We Work
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              Our proven process ensures we deliver exceptional results, on time and on budget.
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index < process.length - 1 && (
                  <div className="absolute left-[27px] top-16 bottom-0 w-px bg-gradient-to-b from-primary/50 to-accent/50" />
                )}
                
                {/* Step number */}
                <div className="flex-shrink-0">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                  >
                    <span className="font-display font-bold text-primary-foreground">{item.step}</span>
                  </motion.div>
                </div>
                
                {/* Content */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex-1 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all"
                >
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Tools Section */}
      <AnimatedSection className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge>Our Tools</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              Powered By The Best
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              We use industry-leading tools to deliver exceptional quality.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={scaleIn}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-3 p-6 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 transition-all"
              >
                <tool.icon className="w-12 h-12 text-primary" />
                <span className="font-medium text-muted-foreground">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Ready to Get <span className="gradient-text">Started?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss your project and see how we can help bring your vision to life.
            </p>
            <Link to="/#contact">
              <Button variant="hero" size="lg">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Services;

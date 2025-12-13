import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  BarChart3, Clock, Zap, Lightbulb, Shield, Rocket, Users, 
  Check, X, ArrowRight, Linkedin, Calendar
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import arnavPhoto from "@/assets/arnav-garhwal.png";
import vedantPhoto from "@/assets/vedant-chavan.png";

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

// Stats data
const stats = [
  { icon: BarChart3, value: "50+", label: "Projects Delivered", description: "Successful digital transformations for businesses worldwide" },
  { icon: Clock, value: "10K+", label: "Hours Saved", description: "Helping clients focus on growth while we handle design" },
  { icon: Zap, value: "95%", label: "Client Satisfaction", description: "Our clients love working with us and come back for more" },
];

// Values data
const values = [
  {
    icon: Lightbulb,
    title: "Driving Innovation Forward",
    description: "We embrace cutting-edge technologies to create smarter, more efficient design solutions.",
  },
  {
    icon: Shield,
    title: "Committed to Integrity & Trust",
    description: "Trust and transparency are at the core of everything we do for our clients.",
  },
  {
    icon: Rocket,
    title: "Empowering Business Growth",
    description: "We help businesses scale faster with stunning designs, reducing time-to-market and unlocking opportunities.",
  },
  {
    icon: Users,
    title: "Putting Customers First",
    description: "Your success is our priority—we build solutions that truly make an impact.",
  },
];

// Comparison data
const manualWork = [
  "Generic template-based designs",
  "Slow iteration cycles",
  "Limited revisions & support",
  "Disconnected design & development",
  "Inconsistent brand identity",
  "No ongoing optimization",
];

const drizzlaiSolutions = [
  "Custom designs tailored to you",
  "Rapid prototyping & delivery",
  "Unlimited revisions included",
  "Seamless design-to-code handoff",
  "Cohesive brand experience",
  "Continuous improvement support",
];

// Timeline data
const timeline = [
  { year: "2022", title: "The Beginning", description: "DrizzlAi was founded in Mumbai with a vision to transform digital experiences." },
  { year: "2023", title: "Growing Strong", description: "Expanded our team and completed 25+ successful projects for clients across India." },
  { year: "2024", title: "Innovation Leap", description: "Launched AI-powered design tools and partnered with global brands." },
  { year: "2025", title: "The Future", description: "Scaling globally while maintaining our commitment to quality and innovation." },
];

// Team data
const team = [
  {
    name: "Arnav Garhwal",
    role: "CEO & Founder",
    image: arnavPhoto,
    linkedin: "https://www.linkedin.com/in/arnavgarhwal/",
  },
  {
    name: "Vedant Chavan",
    role: "CTO & Co-Founder",
    image: vedantPhoto,
    linkedin: "https://www.linkedin.com/in/vedantchavan0501",
  },
];

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms for different layers
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Multi-layer parallax speeds
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const layer4Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const layer5Y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  // Rotation parallax
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  
  // Scale parallax
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Full Page with Parallax */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Parallax Background Layer 1 - Deepest/Slowest */}
        <motion.div 
          style={{ y: layer1Y }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[180px]" />
        </motion.div>

        {/* Parallax Background Layer 2 */}
        <motion.div 
          style={{ y: layer2Y, scale: scale1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </motion.div>

        {/* Grid Pattern - Layer 3 */}
        <motion.div 
          style={{ y: layer3Y }}
          className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)] pointer-events-none"
        />

        {/* Floating 3D Elements - Layer 4 */}
        <motion.div 
          style={{ y: layer4Y, rotate: rotate1 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm"
        />
        <motion.div 
          style={{ y: layer4Y, rotate: rotate2, scale: scale2 }}
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[12%] w-20 h-20 rounded-xl bg-gradient-to-br from-accent/25 to-primary/25 border border-accent/30 backdrop-blur-sm"
        />
        <motion.div 
          style={{ y: layer5Y, rotate: rotate3 }}
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-[18%] w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 backdrop-blur-sm"
        />
        
        {/* Additional parallax floating elements */}
        <motion.div 
          style={{ y: layer3Y, rotate: rotate1 }}
          animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[25%] w-8 h-8 rounded-full bg-primary/30 blur-sm"
        />
        <motion.div 
          style={{ y: layer5Y, rotate: rotate2 }}
          animate={{ y: [-8, 8, -8], x: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[25%] right-[20%] w-6 h-6 rounded-full bg-accent/40 blur-sm"
        />
        <motion.div 
          style={{ y: layer2Y }}
          animate={{ y: [12, -12, 12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-[8%] w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 border border-border/20 backdrop-blur-sm rotate-45"
        />
        <motion.div 
          style={{ y: layer4Y, rotate: rotate3 }}
          animate={{ y: [-18, 18, -18] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[40%] left-[30%] w-16 h-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-transparent to-primary/5 backdrop-blur-sm"
        />
        <motion.div 
          style={{ y: layer3Y }}
          animate={{ y: [15, -15, 15], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] right-[10%] w-12 h-12 border border-accent/30 bg-accent/5 backdrop-blur-sm"
          // Diamond shape
        />

        {/* Floating orbs with glow */}
        <motion.div 
          style={{ y: layer1Y }}
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
        <motion.div 
          style={{ y: layer4Y }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[70%] left-[15%] w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_6px_hsl(var(--primary)/0.4)]"
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/50 text-sm font-medium text-muted-foreground mb-8"
          >
            About Us
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
          >
            Crafting Digital
            <span className="gradient-text block">Excellence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            DrizzlAi helps businesses transform their digital presence with stunning designs and seamless user experiences.
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

      {/* Visual Story Section - Bento Grid */}
      <AnimatedSection className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Large Portrait Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop"
                  alt="Team member working"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Text below portrait */}
              <motion.p 
                variants={fadeInUp}
                className="font-display text-2xl md:text-3xl leading-relaxed"
              >
                We believe that the human dimensions are essential to start any successful{" "}
                <em className="text-muted-foreground italic">project and that this is where splendid</em>{" "}
                emotional relationships between the company and people are born.
              </motion.p>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={fadeInUp} className="space-y-8 lg:pt-24">
              {/* Text with italic styling */}
              <motion.p 
                variants={fadeInUp}
                className="font-display text-2xl md:text-3xl leading-relaxed"
              >
                Intuition and strategy integrate the{" "}
                <em className="text-muted-foreground italic">research methodology</em>{" "}
                to traditional media, that we also apply
              </motion.p>
              
              {/* Team workspace image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Who We Are Section */}
      <AnimatedSection className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Who We Are</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              Who We Are
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              DrizzlAi is a team of innovators dedicated to making web design simple and effective. 
              We help businesses create stunning digital experiences that drive growth and engagement.
            </motion.p>
          </div>

          {/* Stats Cards */}
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-display text-3xl font-bold gradient-text">{stat.value}</span>
                    <span className="font-display text-xl font-semibold text-foreground">{stat.label}</span>
                  </div>
                  <p className="text-muted-foreground">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="py-32 relative bg-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Our Values</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              The Values Behind DrizzlAi
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              Our values shape everything we do. From innovation to integrity, we're committed to building solutions that empower businesses and drive real impact.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Why Us - Comparison Section */}
      <AnimatedSection className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Why Us</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              What Makes Us Stand<br />Out in the Industry
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              Discover how our innovative strategies, client-focused approach, and commitment to quality set us apart from the competition.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* Traditional Agencies */}
            <motion.div
              variants={fadeInUp}
              className="bg-card/40 border border-border/50 rounded-2xl p-8"
            >
              <h3 className="font-display text-2xl font-semibold mb-8 text-muted-foreground">Traditional Agencies</h3>
              <ul className="space-y-4">
                {manualWork.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-muted-foreground">
                    <X className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* DrizzlAi */}
            <motion.div
              variants={fadeInUp}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl" />
              <div className="relative bg-card/60 border border-primary/30 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-semibold mb-8 gradient-text">DrizzlAi Solutions</h3>
                <ul className="space-y-4">
                  {drizzlaiSolutions.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Timeline Section */}
      <AnimatedSection className="py-32 relative bg-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Our Journey</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              The DrizzlAi Story
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              From a small idea to a growing digital agency — here's how we got here.
            </motion.p>
          </div>

          {/* Timeline */}
          <motion.div variants={staggerContainer} className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 hidden md:block" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={fadeInUp}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all"
                  >
                    <span className="text-primary font-display font-bold text-lg">{item.year}</span>
                    <h3 className="font-display text-xl font-semibold mt-2 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent z-10">
                  <Calendar className="w-5 h-5 text-primary-foreground" />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Our Team</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              Meet the Minds Behind DrizzlAi
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              We bring together creativity and technology to create stunning digital solutions.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                  {/* Image Container */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* LinkedIn Button on Hover */}
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ scale: 1.05 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View LinkedIn Profile
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                  
                  {/* Info */}
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                      <p className="text-muted-foreground text-sm">{member.role}</p>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Digital Presence?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's collaborate to bring your vision to life. We're excited to hear about your ideas.
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

export default About;

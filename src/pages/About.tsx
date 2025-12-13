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
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Full Page */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Floating 3D Elements */}
        <motion.div 
          animate={{ y: [-20, 20, -20], rotateZ: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 backdrop-blur-sm"
          style={{ transform: "perspective(1000px) rotateX(15deg) rotateY(-15deg)" }}
        />
        <motion.div 
          animate={{ y: [20, -20, 20], rotateZ: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[15%] w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20 backdrop-blur-sm"
          style={{ transform: "perspective(1000px) rotateX(-10deg) rotateY(20deg)" }}
        />
        <motion.div 
          animate={{ y: [-15, 15, -15], rotateZ: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-[20%] w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/15 backdrop-blur-sm"
          style={{ transform: "perspective(1000px) rotateX(20deg) rotateY(10deg)" }}
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

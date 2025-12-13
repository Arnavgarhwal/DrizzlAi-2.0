import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Eye } from "lucide-react";
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

// Projects data
const projects = [
  {
    id: 1,
    title: "TechFlow Dashboard",
    category: "Web App",
    description: "A comprehensive analytics dashboard for SaaS businesses with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    id: 2,
    title: "Luxe Ecommerce",
    category: "E-commerce",
    description: "Premium fashion e-commerce platform with seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    tags: ["Next.js", "Stripe", "Supabase"],
    featured: true,
  },
  {
    id: 3,
    title: "Mindful App",
    category: "Mobile App",
    description: "Meditation and wellness app designed to promote mental health and mindfulness.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "Animations"],
    featured: true,
  },
  {
    id: 4,
    title: "FinanceHub",
    category: "Web App",
    description: "Personal finance management platform with budgeting tools and insights.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Node.js", "PostgreSQL"],
    featured: false,
  },
  {
    id: 5,
    title: "Foodie Delivery",
    category: "Mobile App",
    description: "Food delivery application with real-time tracking and restaurant discovery.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    tags: ["Flutter", "Maps API", "Firebase"],
    featured: false,
  },
  {
    id: 6,
    title: "Creative Studio",
    category: "Website",
    description: "Portfolio website for a creative agency showcasing their work and services.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Next.js", "Framer Motion", "GSAP"],
    featured: false,
  },
];

// Categories for filter
const categories = ["All", "Web App", "Mobile App", "E-commerce", "Website"];

// Testimonials
const testimonials = [
  {
    quote: "DrizzlAi transformed our digital presence completely. The attention to detail and creativity exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CEO, TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    quote: "Working with DrizzlAi was a game-changer for our business. They delivered a stunning e-commerce platform that our customers love.",
    author: "Michael Chen",
    role: "Founder, Luxe Fashion",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    quote: "The team's expertise in mobile design helped us create an app that users genuinely enjoy using every day.",
    author: "Emily Rodriguez",
    role: "Product Lead, Mindful",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

const Work = () => {
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
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

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
            Our Work
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
          >
            Featured
            <span className="gradient-text block">Projects</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Explore our portfolio of successful projects that showcase our expertise and creativity.
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

      {/* Filter & Projects Grid */}
      <AnimatedSection className="py-32 relative">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Eye className="w-5 h-5 text-foreground" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
                        >
                          <ExternalLink className="w-5 h-5 text-primary-foreground" />
                        </motion.button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-32 relative bg-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Testimonials</SectionBadge>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              Don't just take our word for it — hear from some of our amazing clients.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all"
              >
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Have a Project in <span className="gradient-text">Mind?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's create something amazing together. We'd love to hear about your ideas.
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

export default Work;

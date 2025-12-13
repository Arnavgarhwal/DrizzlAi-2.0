import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { getProjectById, projects } from "@/data/projects";

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

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  
  const project = getProjectById(id || "");
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Get next and previous projects
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/work")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Work
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-[80vh] overflow-hidden"
      >
        <motion.div 
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-end"
        >
          <div className="container mx-auto px-6 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/work" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Work
              </Link>
              
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
                {project.category}
              </span>
              
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
                {project.title}
              </h1>
              
              <p className="text-muted-foreground text-xl max-w-2xl">
                {project.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Project Details */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold mb-6">About the Project</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {project.details || project.description}
              </p>
              
              {/* Project Image Gallery */}
              <div className="grid gap-6">
                <motion.div 
                  variants={fadeInUp}
                  className="aspect-video rounded-2xl overflow-hidden border border-border/50"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Project Info Card */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold mb-6">Project Details</h3>
                
                <div className="space-y-4">
                  {project.client && (
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground block">Client</span>
                        <span className="font-medium">{project.client}</span>
                      </div>
                    </div>
                  )}
                  
                  {project.year && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground block">Year</span>
                        <span className="font-medium">{project.year}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <span className="text-sm text-muted-foreground block">Category</span>
                      <span className="font-medium">{project.category}</span>
                    </div>
                  </div>
                </div>

                {project.liveUrl && (
                  <Button className="w-full mt-6" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>

              {/* Technologies */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-secondary/50 text-sm text-muted-foreground border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Project Navigation */}
      <AnimatedSection className="py-20 border-t border-border/30">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
            <Link 
              to={`/work/${prevProject.id}`}
              className="group p-6 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 transition-all"
            >
              <span className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Previous Project
              </span>
              <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                {prevProject.title}
              </h3>
            </Link>
            
            <Link 
              to={`/work/${nextProject.id}`}
              className="group p-6 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 transition-all text-right"
            >
              <span className="text-sm text-muted-foreground flex items-center justify-end gap-2 mb-2">
                Next Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                {nextProject.title}
              </h3>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
          >
            Have a Project in Mind?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-muted-foreground text-lg max-w-xl mx-auto mb-8"
          >
            Let's work together to bring your vision to life.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button size="lg" asChild>
              <Link to="/contact">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default ProjectDetail;

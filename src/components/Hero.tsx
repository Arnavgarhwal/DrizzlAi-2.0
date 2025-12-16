import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground, FloatingParticles } from "@/components/ParallaxBackground";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for different layers
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), { stiffness: 50, damping: 30 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), { stiffness: 50, damping: 30 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 50, damping: 30 });
  const rotate1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), { stiffness: 50, damping: 30 });
  const rotate2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), { stiffness: 50, damping: 30 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.9]), { stiffness: 100, damping: 30 });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background Effects */}
      <ParallaxBackground variant="orbs" intensity={1.5} />
      <FloatingParticles count={30} />

      {/* Grid Pattern with Parallax */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" 
      />

      {/* 3D Floating Geometric Shapes */}
      {/* Cube 1 */}
      <motion.div
        style={{ 
          y: y1, 
          rotateX: rotate1, 
          rotateY: rotate2,
          scale: scale
        }}
        animate={{ 
          rotateZ: [0, 360],
          y: [-30, 30, -30],
          x: [-20, 20, -20]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[15%] left-[10%] w-32 h-32 pointer-events-none"
      >
        <div className="relative w-full h-full preserve-3d">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/40 rounded-lg backdrop-blur-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]" 
               style={{ transform: 'translateZ(32px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 rounded-lg"
               style={{ transform: 'rotateY(90deg) translateZ(32px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent border border-accent/30 rounded-lg"
               style={{ transform: 'rotateX(90deg) translateZ(32px)' }} />
        </div>
      </motion.div>

      {/* Floating Sphere */}
      <motion.div
        style={{ y: y2, x: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[25%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20 blur-xl pointer-events-none"
      />

      {/* 3D Pyramid */}
      <motion.div
        style={{ 
          y: y3, 
          rotateY: rotate1,
          rotateX: useTransform(rotate2, (r) => -r * 0.5)
        }}
        animate={{ 
          rotateZ: [0, -360],
          y: [20, -20, 20]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[20%] left-[15%] w-24 h-24 pointer-events-none"
      >
        <div className="relative w-full h-full preserve-3d">
          <div 
            className="absolute w-full h-full bg-gradient-to-b from-primary/30 to-accent/20 border border-primary/40"
            style={{ 
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transform: 'translateZ(20px)'
            }}
          />
          <div 
            className="absolute w-full h-full bg-gradient-to-b from-accent/25 to-primary/15 border border-accent/30"
            style={{ 
              clipPath: 'polygon(50% 0%, 0% 100%, 50% 100%)',
              transform: 'rotateY(-60deg) translateZ(20px)'
            }}
          />
        </div>
      </motion.div>

      {/* Floating Hexagon */}
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[35%] right-[25%] w-28 h-28 pointer-events-none"
      >
        <div 
          className="w-full h-full bg-gradient-to-br from-primary/25 to-accent/15 border-2 border-primary/30 backdrop-blur-sm"
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}
        />
      </motion.div>

      {/* Floating Card 1 */}
      <motion.div
        style={{ y: y2, rotate: rotate1 }}
        animate={{ 
          y: [-25, 25, -25],
          rotateZ: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[30%] right-[10%] w-36 h-36 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-br from-card/40 to-card/20 border border-border/30 rounded-2xl backdrop-blur-md shadow-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl" />
      </motion.div>

      {/* Floating Card 2 */}
      <motion.div
        style={{ y: y3, rotate: useTransform(rotate2, (r) => -r) }}
        animate={{ 
          y: [25, -25, 25],
          rotateZ: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-[50%] left-[5%] w-32 h-32 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-br from-accent/30 to-primary/20 border border-accent/30 rounded-xl backdrop-blur-md shadow-lg" />
      </motion.div>

      {/* Animated Orbs with Glow */}
      <motion.div
        style={{ y: y1 }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[40%] w-6 h-6 rounded-full bg-primary shadow-[0_0_30px_15px_hsl(var(--primary)/0.5)] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-[25%] right-[30%] w-5 h-5 rounded-full bg-accent shadow-[0_0_25px_12px_hsl(var(--accent)/0.5)] pointer-events-none"
      />
      <motion.div
        style={{ y: y3 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[60%] right-[40%] w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_10px_hsl(var(--primary)/0.4)] pointer-events-none"
      />

      {/* Floating Lines/Wires */}
      <motion.svg
        style={{ y: y2 }}
        className="absolute top-[30%] right-[20%] w-64 h-64 pointer-events-none opacity-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M 50 50 Q 100 100 150 50 T 250 50"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
      </motion.svg>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ scale, y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Heading */}
          <ScrollReveal animation="scale" duration={0.8}>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">DrizzlAi</span>
            </h1>
          </ScrollReveal>

          {/* Subheading */}
          <ScrollReveal animation="slideUp" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Built with Precision. Designed for Performance.
            </p>
          </ScrollReveal>

          {/* Single CTA */}
          <ScrollReveal animation="slideUp" delay={0.4}>
            <Link to="/get-started">
              <Button variant="hero" size="lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
};

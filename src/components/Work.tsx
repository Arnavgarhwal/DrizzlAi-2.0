import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TiltCard } from "./TiltCard";

const projects = [
  {
    title: "Nova Finance",
    category: "Web Design & Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    title: "Bloom Health",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
  },
  {
    title: "TechVerse",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
  },
  {
    title: "ArtFlow Studio",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    title: "Quantum Labs",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
  },
];

export const Work = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + projects.length) % projects.length);
    const adjustedDiff = normalizedDiff > projects.length / 2 ? normalizedDiff - projects.length : normalizedDiff;
    
    const isActive = index === activeIndex;
    const absOffset = Math.abs(adjustedDiff);
    
    // Calculate position, rotation and scale based on distance from active card
    const xOffset = adjustedDiff * 280;
    const zOffset = -absOffset * 150;
    const rotateY = adjustedDiff * -15;
    const scale = 1 - absOffset * 0.15;
    const opacity = 1 - absOffset * 0.3;
    
    return {
      transform: `
        perspective(1200px)
        translateX(${xOffset}px)
        translateZ(${zOffset}px)
        rotateY(${rotateY}deg)
        scale(${Math.max(scale, 0.7)})
      `,
      opacity: Math.max(opacity, 0.4),
      zIndex: 10 - absOffset,
      filter: isActive ? 'none' : `blur(${absOffset * 1.5}px)`,
    };
  };

  return (
    <section id="work" className="py-32 relative bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
              Featured
              <span className="gradient-text"> Work</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0 flex items-center gap-2 group"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* 3D Floating Cards */}
        <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1200px' }}>
          {/* Ambient glow behind cards */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[400px] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
          </div>
          
          {projects.map((project, index) => (
            <TiltCard
              key={project.title}
              index={index}
              floatAnimation={false}
              className="absolute cursor-pointer transition-all duration-700 ease-out"
              style={{
                ...getCardStyle(index),
                transformStyle: 'preserve-3d',
              }}
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border/50 w-[320px] md:w-[400px] shadow-2xl transition-all duration-500 ${
                  index === activeIndex 
                    ? 'shadow-[0_30px_60px_-15px_hsl(var(--primary)/0.4)]' 
                    : 'hover:shadow-[0_25px_50px_-12px_hsl(var(--primary)/0.25)]'
                }`}
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary text-sm font-medium uppercase tracking-wider">{project.category}</span>
                    <h3 className="font-display text-xl md:text-2xl font-bold mt-2 text-foreground drop-shadow-lg">{project.title}</h3>
                  </div>
                  
                  {/* Arrow Button */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100 shadow-[0_10px_30px_hsl(var(--primary)/0.4)]">
                    <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-primary scale-125 shadow-[0_0_15px_hsl(var(--primary)/0.6)]' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="h-12 w-12 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.3)]"
          >
            <ArrowUpRight className="w-5 h-5 rotate-[225deg]" />
          </button>
          <button
            onClick={handleNext}
            className="h-12 w-12 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.3)]"
          >
            <ArrowUpRight className="w-5 h-5 rotate-45" />
          </button>
        </div>
      </div>
    </section>
  );
};
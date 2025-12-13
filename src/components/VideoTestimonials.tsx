import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const videoTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    company: "TechStart Inc.",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "DrizzlAi transformed our digital presence completely. The attention to detail was remarkable and exceeded all expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder",
    company: "InnovateLab",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Working with DrizzlAi was an absolute pleasure. They delivered a stunning platform that our customers love.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Marketing Director",
    company: "GrowthCo",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "The team at DrizzlAi delivered a stunning website that boosted our conversions by 150%. Highly recommended!",
    rating: 5,
  },
];

export const VideoTestimonials = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && !selectedVideo) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating, selectedVideo]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % videoTestimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + videoTestimonials.length) % videoTestimonials.length);
    
    // Center card
    if (normalizedDiff === 0) {
      return {
        transform: "translateX(0) translateZ(0) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: 30,
        filter: "brightness(1)",
      };
    }
    // Right card
    if (normalizedDiff === 1) {
      return {
        transform: "translateX(70%) translateZ(-100px) rotateY(-15deg) scale(0.85)",
        opacity: 0.7,
        zIndex: 20,
        filter: "brightness(0.7)",
      };
    }
    // Left card
    if (normalizedDiff === videoTestimonials.length - 1) {
      return {
        transform: "translateX(-70%) translateZ(-100px) rotateY(15deg) scale(0.85)",
        opacity: 0.7,
        zIndex: 20,
        filter: "brightness(0.7)",
      };
    }
    // Hidden cards
    return {
      transform: "translateX(0) translateZ(-200px) scale(0.6)",
      opacity: 0,
      zIndex: 0,
      filter: "brightness(0.5)",
    };
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
      
      {/* Floating particles */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-[15%] w-16 h-16 rounded-xl bg-gradient-to-br from-accent/25 to-primary/25 border border-accent/30 backdrop-blur-sm"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {t("testimonials.subtitle")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {t("testimonials.title")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.description")}
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div 
          ref={containerRef}
          className="relative h-[500px] md:h-[550px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {/* Cards */}
          <div className="relative w-full max-w-lg md:max-w-xl" style={{ transformStyle: "preserve-3d" }}>
            {videoTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute left-1/2 top-0 w-full cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  marginLeft: "-50%",
                }}
                animate={getCardStyle(index)}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => index === activeIndex && setSelectedVideo(testimonial)}
              >
                <motion.div
                  animate={index === activeIndex ? { 
                    y: [0, -10, 0],
                    rotateX: [0, 2, 0],
                    rotateY: [0, -2, 2, 0],
                  } : {}}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-2xl"
                  style={{
                    boxShadow: index === activeIndex 
                      ? "0 30px 60px -15px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.1)"
                      : "0 20px 40px -20px hsl(0 0% 0% / 0.5)",
                  }}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    
                    {/* Play Button */}
                    {index === activeIndex && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.6)]"
                        >
                          <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 flex gap-1 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Quote className="w-8 h-8 text-primary/40 flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                        <img 
                          src={testimonial.thumbnail} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all z-40"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all z-40"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {videoTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 h-3 bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  : "w-3 h-3 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-card border border-border/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                title={selectedVideo.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

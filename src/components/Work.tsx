import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
];

export const Work = () => {
  return (
    <section id="work" className="py-32 relative bg-secondary/30">
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

        {/* Projects Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project, index) => (
              <CarouselItem key={project.title} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <div
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_hsl(var(--primary)/0.25)]"
                  style={{
                    animation: `float-3d ${3 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {/* 3D Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-primary text-sm font-medium uppercase tracking-wider">{project.category}</span>
                      <h3 className="font-display text-2xl font-bold mt-2 text-foreground drop-shadow-lg">{project.title}</h3>
                    </div>
                    
                    {/* Arrow Button */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100 shadow-[0_10px_30px_hsl(var(--primary)/0.4)]">
                      <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.3)]" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.3)]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

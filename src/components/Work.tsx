import { ArrowUpRight } from "lucide-react";

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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border card-hover cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-primary text-sm font-medium">{project.category}</span>
                <h3 className="font-display text-2xl font-bold mt-2 text-foreground">{project.title}</h3>
              </div>
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

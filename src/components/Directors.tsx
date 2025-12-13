import { Linkedin, Twitter, Instagram } from "lucide-react";

const directors = [
  {
    name: "Alexander Mitchell",
    role: "CEO & Founder",
    post: "Chief Executive Officer",
    badge: "Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
  {
    name: "Sarah Williams",
    role: "Creative Director",
    post: "Chief Creative Officer",
    badge: "Co-Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
];

export const Directors = () => {
  return (
    <section id="directors" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Leadership
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Director's <span className="gradient-text">Vision</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Meet the visionaries behind DrizzleAi who drive innovation and excellence
          </p>
        </div>

        {/* Directors Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {directors.map((director, index) => (
            <div
              key={director.name}
              className="group relative"
              style={{
                animation: `float-3d ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`,
              }}
            >
              {/* 3D Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:border-primary/30">
                {/* Image Container */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-secondary">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-4 py-1.5 rounded-full">
                    <span className="text-sm font-semibold text-primary-foreground">{director.badge}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    Hello I am <span className="gradient-text">{director.name.split(' ')[0]}</span>
                  </h3>
                  <p className="text-primary/80 text-sm mb-6">
                    {director.role} • {director.post}
                  </p>

                  {/* Social Links with Dividers */}
                  <div className="flex items-center justify-center gap-0">
                    <a
                      href={director.twitter}
                      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <div className="w-px h-6 bg-border/50" />
                    <a
                      href={director.instagram}
                      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <div className="w-px h-6 bg-border/50" />
                    <a
                      href={director.linkedin}
                      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

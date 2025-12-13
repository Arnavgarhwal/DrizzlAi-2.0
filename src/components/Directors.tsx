import { Linkedin, Twitter } from "lucide-react";

const directors = [
  {
    name: "Alexander Mitchell",
    role: "CEO & Founder",
    post: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    vision: "Building digital experiences that transform businesses and inspire innovation.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sarah Williams",
    role: "Creative Director",
    post: "Chief Creative Officer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    vision: "Crafting visual narratives that connect brands with their audiences meaningfully.",
    linkedin: "#",
    twitter: "#",
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
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:border-primary/30">
                <div className="flex flex-col items-center text-center">
                  {/* Photo */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
                      <img
                        src={director.image}
                        alt={director.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow" />
                  </div>

                  {/* Info */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    {director.name}
                  </h3>
                  <p className="text-primary font-semibold mb-1">{director.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{director.post}</p>

                  {/* Vision Quote */}
                  <p className="text-muted-foreground italic text-sm leading-relaxed mb-6">
                    "{director.vision}"
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a
                      href={director.linkedin}
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={director.twitter}
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      <Twitter className="w-5 h-5" />
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

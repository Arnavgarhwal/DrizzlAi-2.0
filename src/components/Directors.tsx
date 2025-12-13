import { Linkedin, Instagram } from "lucide-react";
import { TiltCard } from "./TiltCard";
import arnavPhoto from "@/assets/arnav-garhwal.png";
import vedantPhoto from "@/assets/vedant-chavan.png";

const directors = [
  {
    name: "Arnav Garhwal",
    role: "CEO & Director",
    post: "Chief Executive Officer",
    badge: "Founder",
    image: arnavPhoto,
    linkedin: "https://www.linkedin.com/in/arnavgarhwal/",
    instagram: "https://www.instagram.com/arnavgarhwal/",
  },
  {
    name: "Vedant Chavan",
    role: "CTO & Director",
    post: "Chief Technology Officer",
    badge: "Co-Founder",
    image: vedantPhoto,
    linkedin: "https://www.linkedin.com/in/vedantchavan0501",
    instagram: "https://www.instagram.com/vedant_0501/",
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
            Meet the visionaries behind DrizzlAi who drive innovation and excellence
          </p>
        </div>

        {/* Directors Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {directors.map((director, index) => (
            <TiltCard
              key={director.name}
              className="group relative"
              index={index}
            >
              {/* Card */}
              <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-6 transition-all duration-300 hover:border-primary/30">
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
                      href={director.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <div className="w-px h-6 bg-border/50" />
                    <a
                      href={director.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

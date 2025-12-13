export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  client?: string;
  year?: string;
  liveUrl?: string;
  details?: string;
}

export const projects: Project[] = [
  {
    id: "techflow-dashboard",
    title: "TechFlow Dashboard",
    category: "Web App",
    description: "A comprehensive analytics dashboard for SaaS businesses with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    featured: true,
    client: "TechFlow Inc.",
    year: "2024",
    liveUrl: "https://techflow.example.com",
    details: "We partnered with TechFlow to create a powerful analytics dashboard that helps SaaS businesses track their key metrics in real-time. The dashboard features interactive charts, customizable widgets, and seamless integrations with popular tools.",
  },
  {
    id: "financehub",
    title: "FinanceHub",
    category: "Web App",
    description: "Personal finance management platform with budgeting tools and insights.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Node.js", "PostgreSQL"],
    featured: true,
    client: "FinanceHub Ltd.",
    year: "2024",
    liveUrl: "https://financehub.example.com",
    details: "FinanceHub needed a modern platform that makes personal finance management accessible to everyone. We built a comprehensive solution with budgeting tools, expense tracking, and AI-powered insights.",
  },
  {
    id: "creative-studio",
    title: "Creative Studio",
    category: "Website",
    description: "Portfolio website for a creative agency showcasing their work and services.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Next.js", "Framer Motion", "GSAP"],
    featured: true,
    client: "Creative Studio Agency",
    year: "2023",
    liveUrl: "https://creativestudio.example.com",
    details: "Creative Studio wanted a portfolio that would stand out in the competitive creative industry. We delivered an immersive experience with stunning animations, smooth transitions, and a bold visual identity.",
  },
  {
    id: "nova-finance",
    title: "Nova Finance",
    category: "Web Design & Development",
    description: "Modern fintech platform with secure payment processing and user-friendly interface.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "Stripe"],
    featured: false,
    client: "Nova Finance Corp.",
    year: "2024",
    details: "Nova Finance required a secure and intuitive platform for their fintech services. We built a robust solution with seamless payment integration and enterprise-grade security.",
  },
  {
    id: "bloom-health",
    title: "Bloom Health",
    category: "UI/UX Design",
    description: "Healthcare app design focused on patient experience and accessibility.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    tags: ["Figma", "User Research", "Prototyping"],
    featured: false,
    client: "Bloom Health Systems",
    year: "2023",
    details: "Bloom Health needed a patient-centric app that makes healthcare accessible to everyone. Our design prioritizes ease of use, accessibility, and a calming user experience.",
  },
  {
    id: "techverse",
    title: "TechVerse",
    category: "Brand Identity",
    description: "Complete brand identity system for an innovative tech startup.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    tags: ["Branding", "Logo Design", "Guidelines"],
    featured: false,
    client: "TechVerse Innovations",
    year: "2023",
    details: "TechVerse approached us to create a brand identity that reflects their innovative spirit. We developed a comprehensive brand system including logo, color palette, typography, and brand guidelines.",
  },
  {
    id: "artflow-studio",
    title: "ArtFlow Studio",
    category: "Web Design",
    description: "Creative portfolio platform for digital artists and designers.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    tags: ["Web Design", "CMS", "Animation"],
    featured: false,
    client: "ArtFlow Creative",
    year: "2024",
    details: "ArtFlow Studio needed a platform that lets artists showcase their work beautifully. We created a customizable portfolio system with stunning gallery layouts and smooth interactions.",
  },
  {
    id: "quantum-labs",
    title: "Quantum Labs",
    category: "App Development",
    description: "Cross-platform mobile app for scientific data visualization.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    tags: ["React Native", "D3.js", "Firebase"],
    featured: false,
    client: "Quantum Labs Research",
    year: "2024",
    details: "Quantum Labs required a mobile app that could handle complex scientific data and present it in an understandable way. We built a cross-platform solution with interactive visualizations.",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

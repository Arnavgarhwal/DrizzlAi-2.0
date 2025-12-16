import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

const blogPosts = [
  {
    id: 1,
    slug: "how-drizzlai-was-founded",
    title: "How DrizzlAi Was Founded",
    subtitle: "From a student idea to a studio",
    excerpt: "DrizzlAi started as a shared ambition between two classmates—to combine engineering precision with design craftsmanship and build websites that feel premium and perform flawlessly.",
    secondExcerpt: "In early 2025, Arnav Garhwal and Vedant Chavan began taking on real projects alongside their Computer Science & Design Engineering coursework. What began as small experiments quickly turned into a clear model: outcomes-first, speed-optimized, beautifully designed sites that help businesses grow.",
    thirdExcerpt: "We didn't want to wait for a degree to start solving real-world problems. The industry is moving fast, and as second-year students, we are at the cutting edge of both code and design. DrizzlAi is our commitment to bringing that fresh, uncompromised knowledge directly to our clients.",
    image: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?w=1200&h=800&fit=crop",
    category: "Company",
    tags: ["Founding", "Story", "Culture"],
    author: "Arnav Garhwal",
    date: "Dec 14, 2025",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "background-of-our-directors",
    title: "Background of Our Directors",
    subtitle: "Arnav Garhwal & Vedant Chavan",
    excerpt: "Our two directors share a unique blend of engineering and design excellence, shaping DrizzlAi’s outcomes-first approach.",
    secondExcerpt: "Both are students of Computer Science & Design Engineering, merging technical rigor with creative vision to deliver fast, beautiful, and effective websites.",
    thirdExcerpt: "Arnav leads engineering and operations; Vedant drives design and experience. Together, they produce sites that load fast, look beautiful, and convert.",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200&h=800&fit=crop",
    category: "Company",
    tags: ["Leadership", "Directors", "Team"],
    author: "Team DrizzlAi",
    date: "Dec 10, 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 3,
    slug: "our-vision",
    title: "Our Vision",
    subtitle: "Build better, not just more",
    excerpt: "We combine technical excellence with world-class design to create digital assets that perform and delight.",
    secondExcerpt: "A results-oriented approach anchored in performance, accessibility, and brand clarity.",
    thirdExcerpt: "The next era of web success is data-informed design and speed-first engineering.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=800&fit=crop",
    category: "Company",
    tags: ["Vision", "Mission", "Future"],
    author: "DrizzlAi Editorial",
    date: "Dec 8, 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 4,
    slug: "optimizing-core-web-vitals",
    title: "Optimizing Core Web Vitals for Business Growth",
    subtitle: "Performance that drives conversions",
    excerpt: "Improve LCP, CLS, and INP in modern React sites so pages load fast, feel stable, and convert better.",
    secondExcerpt: "From image optimization and critical CSS to caching and prefetching—actionable steps across devices.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    category: "Web",
    tags: ["Performance", "Core Web Vitals", "SEO"],
    author: "DrizzlAi Editorial",
    date: "Dec 3, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 5,
    slug: "designing-accessible-websites",
    title: "Designing Accessible Websites That Convert",
    subtitle: "Accessibility as a competitive advantage",
    excerpt: "Color contrast, keyboard navigation, semantic markup, and ARIA patterns make experiences usable and boost conversions.",
    secondExcerpt: "A design-first checklist and developer practices to meet WCAG while maintaining brand expression and speed.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=800&fit=crop",
    category: "Design",
    tags: ["Accessibility", "UX", "WCAG"],
    author: "DrizzlAi Editorial",
    date: "Dec 2, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 6,
    slug: "modern-web-architecture",
    title: "Modern Web Architecture: Jamstack, SSR, and You",
    subtitle: "Choosing the right stack for your goals",
    excerpt: "Decide between static, SSR, and hybrid approaches for speed, SEO, and maintainability.",
    secondExcerpt: "Compare deployment models, edge rendering, and caching strategies—grounded in business outcomes.",
    image: "https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?w=1200&h=800&fit=crop",
    category: "Architecture",
    tags: ["Jamstack", "SSR", "React"],
    author: "DrizzlAi Editorial",
    date: "Dec 1, 2025",
    readTime: "7 min read",
    featured: false,
  },
];

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const articleSlug = useMemo(() => new URLSearchParams(location.search).get("article"), [location.search]);
  const activePost = useMemo(() => blogPosts.find(p => p.slug === articleSlug) || null, [articleSlug]);
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fallbackImage = useMemo(() => '/og-da.svg', []);
  
  useEffect(() => {
    if (activePost) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [activePost]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {!activePost && (
        <>
          <section className="pt-20">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{blogPosts[0].date}</p>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 underline decoration-foreground/60">
                    {blogPosts[0].title}
                  </h1>
                  <motion.button
                    className="px-5 py-2 rounded-lg border bg-card hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/blog?article=${blogPosts[0].slug}`)}
                  >
                    Read article
                  </motion.button>
                </div>
                <div className="relative">
                  <motion.div
                    className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
                    style={{ y: bgY }}
                  />
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"
                    style={{ y: fgY }}
                  />
                  <motion.img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl will-change-transform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ rotateX: -3, rotateY: 6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-14">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-semibold mb-8">Latest stories</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.article
                  className="md:col-span-2 rounded-2xl overflow-hidden bg-card border will-change-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ rotateY: 3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 160, damping: 16 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  <img src={blogPosts[1].image} alt={blogPosts[1].title} className="w-full h-72 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold underline decoration-foreground/60 mb-2">
                      {blogPosts[1].title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{blogPosts[1].date}</p>
                    <button
                      className="px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
                      onClick={() => navigate(`/blog?article=${blogPosts[1].slug}`)}
                    >
                      Read article
                    </button>
                  </div>
                </motion.article>

                <div className="grid gap-8">
                  {[blogPosts[2], blogPosts[3]].map((post) => (
                    <motion.article
                      key={post.id}
                      className="rounded-2xl overflow-hidden bg-card border will-change-transform"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ rotateY: 3, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 160, damping: 16 }}
                      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    >
                      <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-semibold underline decoration-foreground/60 mb-1">{post.title}</h4>
                        <p className="text-xs text-muted-foreground mb-3">{post.date}</p>
                        <button
                          className="px-3 py-2 rounded-lg border hover:bg-muted transition-colors text-sm"
                          onClick={() => navigate(`/blog?article=${post.slug}`)}
                        >
                          Read article
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {[blogPosts[4], blogPosts[5]].map((post) => (
                  <motion.article
                    key={post.id}
                    className="rounded-2xl overflow-hidden bg-card border will-change-transform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ rotateY: 3, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 160, damping: 16 }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  >
                    <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
                    <div className="p-6">
                      <h4 className="text-lg font-semibold underline decoration-foreground/60 mb-2">{post.title}</h4>
                      <button
                        className="px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
                        onClick={() => navigate(`/blog?article=${post.slug}`)}
                      >
                        Read article
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activePost && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <button
                className="mb-6 text-sm text-muted-foreground hover:underline"
                onClick={() => navigate("/blog")}
              >
                ← Back to Blog
              </button>
              <motion.img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl mb-6 will-change-transform"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = fallbackImage; }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ rotateX: -2, rotateY: 4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 170, damping: 17 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              />
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {activePost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {activePost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {activePost.readTime}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{activePost.title}</h2>
              {activePost.subtitle && <p className="text-muted-foreground mb-4">{activePost.subtitle}</p>}
              {activePost.excerpt && <p className="text-lg text-muted-foreground mb-6">{activePost.excerpt}</p>}
              {activePost.secondExcerpt && <p className="text-lg text-muted-foreground mb-6">{activePost.secondExcerpt}</p>}
              {activePost.thirdExcerpt && <p className="text-lg text-muted-foreground mb-6">{activePost.thirdExcerpt}</p>}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Blog;

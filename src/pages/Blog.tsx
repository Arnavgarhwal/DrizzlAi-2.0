import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, Search, Tag, X, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Input } from "@/components/ui/input";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Design: AI-Powered Experiences",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we design and build websites, from automated layouts to personalized user experiences.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    category: "Technology",
    tags: ["AI", "Web Design", "Innovation", "UX"],
    author: "Arnav Garhwal",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Mastering 3D Animations in Modern Web Development",
    excerpt: "A comprehensive guide to implementing stunning 3D animations using CSS transforms, WebGL, and popular libraries like Three.js and Framer Motion.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    category: "Development",
    tags: ["3D", "Animation", "CSS", "Three.js"],
    author: "Vedant Chavan",
    date: "Dec 8, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Building Scalable Design Systems",
    excerpt: "Learn how to create and maintain design systems that scale with your organization while ensuring consistency across all digital products.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    category: "Design",
    tags: ["Design System", "UI", "Components", "Scalability"],
    author: "Arnav Garhwal",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "The Psychology of Color in UI Design",
    excerpt: "Discover how color choices impact user behavior and learn to leverage color psychology to create more engaging interfaces.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=500&fit=crop",
    category: "Design",
    tags: ["Color Theory", "Psychology", "UI", "UX"],
    author: "Vedant Chavan",
    date: "Dec 2, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Performance Optimization Techniques for React Apps",
    excerpt: "Essential strategies and best practices for optimizing React applications to deliver lightning-fast user experiences.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    category: "Development",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    author: "Arnav Garhwal",
    date: "Nov 28, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Crafting Memorable Brand Identities",
    excerpt: "A deep dive into the process of creating brand identities that resonate with audiences and stand the test of time.",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=500&fit=crop",
    category: "Branding",
    tags: ["Branding", "Identity", "Logo", "Strategy"],
    author: "Vedant Chavan",
    date: "Nov 25, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 7,
    title: "Responsive Design Best Practices for 2024",
    excerpt: "Modern techniques for creating truly responsive websites that work seamlessly across all devices and screen sizes.",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&h=500&fit=crop",
    category: "Development",
    tags: ["Responsive", "Mobile", "CSS", "Design"],
    author: "Arnav Garhwal",
    date: "Nov 20, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 8,
    title: "Typography Trends Shaping Digital Design",
    excerpt: "Explore the latest typography trends and learn how to choose and pair fonts that elevate your digital designs.",
    image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=800&h=500&fit=crop",
    category: "Design",
    tags: ["Typography", "Fonts", "Design", "Trends"],
    author: "Vedant Chavan",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    featured: false,
  },
];

const categories = ["All", "Technology", "Development", "Design", "Branding"];

const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      
      return matchesCategory && matchesSearch && matchesTags;
    });
  }, [selectedCategory, searchQuery, selectedTags]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const getRelatedPosts = (post: typeof blogPosts[0]) => {
    return blogPosts
      .filter(p => p.id !== post.id && 
        (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
      .slice(0, 3);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Blog
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Insights & Ideas
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the latest trends, tutorials, and insights from our team of designers and developers.
            </p>

            {/* Search Bar */}
            <motion.div
              className="max-w-xl mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-card/50 border-border/50 rounded-2xl focus:border-primary/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tags Cloud */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
              <Tag className="w-4 h-4" /> Popular tags:
            </span>
            {allTags.slice(0, 12).map((tag) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                #{tag}
              </motion.button>
            ))}
          </motion.div>

          {selectedTags.length > 0 && (
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setSelectedTags([])}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Clear all filters <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Posts */}
      {!searchQuery && selectedTags.length === 0 && selectedCategory === "All" && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Articles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-primary/80">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <motion.div
                      className="flex items-center gap-2 text-primary font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter & All Posts */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card/50 border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Results count */}
          {(searchQuery || selectedTags.length > 0) && (
            <motion.p
              className="text-center text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
            </motion.p>
          )}

          {/* Posts Grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  layout
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-primary/70">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <motion.span
                        className="flex items-center gap-1 text-primary text-sm font-medium"
                        whileHover={{ x: 3 }}
                      >
                        Read <ArrowRight className="w-3 h-3" />
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Article Modal with Related Posts */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-card border border-border/50 rounded-2xl shadow-2xl my-8"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
              />

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-4">{selectedPost.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{selectedPost.excerpt}</p>
                <p className="text-foreground/80 mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                {/* Related Posts */}
                <div className="border-t border-border/50 pt-8">
                  <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {getRelatedPosts(selectedPost).map((post) => (
                      <motion.div
                        key={post.id}
                        className="group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedPost(post)}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {post.readTime}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-12 text-center overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter and never miss the latest insights, tutorials, and design inspiration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
                />
                <motion.button
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--primary), 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Blog;

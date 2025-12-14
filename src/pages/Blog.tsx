import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, Search, Tag, X, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { CRMLeadCapture } from "@/components/CRMLeadCapture";
import { Input } from "@/components/ui/input";

const blogPosts = [
  {
    id: 1,
    title: "How DrizzlAi Was Founded",
    excerpt: "The origin story of DrizzlAi — from a small idea to a growing digital studio focused on stunning, modern experiences.",
    image: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?w=800&h=500&fit=crop",
    category: "Company",
    tags: ["Founding", "Story", "Culture"],
    author: "Arnav Garhwal",
    date: "Dec 14, 2025",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Background of Our Directors",
    excerpt: "Meet the leadership behind DrizzlAi and learn about their backgrounds, inspirations, and vision for the future.",
    image: "https://images.unsplash.com/photo-1515165562835-c4c7b8e2161d?w=800&h=500&fit=crop",
    category: "Company",
    tags: ["Leadership", "Directors", "Team"],
    author: "Team DrizzlAi",
    date: "Dec 10, 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Our Vision",
    excerpt: "What drives DrizzlAi — a bold vision for crafting immersive, modern, and delightful web experiences.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop",
    category: "Company",
    tags: ["Vision", "Mission", "Future"],
    author: "DrizzlAi Editorial",
    date: "Dec 8, 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Building for the Future at DrizzlAi",
    excerpt: "An inside look at our approach to innovation, 3D UI, and performance for next‑gen websites.",
    image: "https://images.unsplash.com/photo-1537498425277-480e5eafbb5b?w=800&h=500&fit=crop",
    category: "Company",
    tags: ["Innovation", "3D UI", "Performance"],
    author: "DrizzlAi Editorial",
    date: "Dec 5, 2025",
    readTime: "5 min read",
    featured: false,
  },
];

const categories = ["All", "Company"];

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

      {/* Diagonal 3D Floating Tabs */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="relative flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="px-6 py-3 rounded-2xl bg-card/60 border border-border/50 shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.25)] backdrop-blur-sm text-sm font-medium hover:border-primary/50 hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.35)]"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ x: -40 * i, y: 20 * i, rotateZ: -6 }}
                animate={{ x: [ -40 * i, 40 * i ], y: [ 20 * i, -20 * i ], rotateZ: [-6, 6, -6] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {post.title}
              </motion.button>
            ))}
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

      {/* CRM Lead Capture Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <CRMLeadCapture source="blog" variant="inline" />
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Blog;

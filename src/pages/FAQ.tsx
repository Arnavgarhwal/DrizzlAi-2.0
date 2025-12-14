import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQ as FAQSection } from "@/components/FAQ";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground, FloatingParticles } from "@/components/ParallaxBackground";

const FAQ = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <ParallaxBackground variant="gradient" intensity={0.5} />
        <FloatingParticles count={8} />
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="slideUp">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Support</span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Find answers to common questions about our services
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Content */}
      <FAQSection />

      <Footer />
    </main>
  );
};

export default FAQ;

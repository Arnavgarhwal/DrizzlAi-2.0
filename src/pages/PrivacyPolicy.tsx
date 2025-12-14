import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground, FloatingParticles } from "@/components/ParallaxBackground";

const PrivacyPolicy = () => {
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
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Legal</span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
                Privacy <span className="gradient-text">Policy</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated: December 2024
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <ScrollReveal animation="slideUp">
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-12 space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us, such as when you fill out a contact form, 
                    book a consultation, or communicate with us. This may include your name, email address, 
                    phone number, company name, and project details.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services, 
                    respond to your inquiries, send you updates about your projects, and communicate 
                    with you about promotions, upcoming events, and other news about DrizzlAi.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Information Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties. 
                    We may share information with trusted service providers who assist us in operating our 
                    website and conducting our business, so long as those parties agree to keep this 
                    information confidential.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of 
                    transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies to enhance your experience on our website. Cookies are small files that 
                    a site or its service provider transfers to your computer's hard drive through your 
                    web browser that enables the site to recognize your browser.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You have the right to access, correct, or delete your personal information. 
                    You may also opt out of receiving promotional communications from us at any time 
                    by following the unsubscribe link in our emails or contacting us directly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:hello.drizzlai@gmail.com" className="text-primary hover:underline">
                      hello.drizzlai@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;

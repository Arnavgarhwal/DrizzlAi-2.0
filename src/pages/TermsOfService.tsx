import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground, FloatingParticles } from "@/components/ParallaxBackground";

const TermsOfService = () => {
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
                Terms of <span className="gradient-text">Service</span>
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
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using DrizzlAi's services, you accept and agree to be bound by these 
                    Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    DrizzlAi provides web design, UI/UX design, development, and branding services. 
                    The specific scope, deliverables, timeline, and pricing for each project will be 
                    outlined in a separate agreement or proposal.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Client Responsibilities</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Clients are responsible for providing accurate information, timely feedback, and all 
                    necessary content (text, images, etc.) required for project completion. Delays in 
                    providing materials may affect project timelines.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Payment Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Payment terms will be specified in the project proposal. Typically, a deposit is 
                    required before work begins, with the remaining balance due upon project completion. 
                    Late payments may incur additional fees.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Upon full payment, clients receive ownership of the final deliverables. DrizzlAi 
                    retains the right to display completed work in our portfolio and promotional materials 
                    unless otherwise agreed in writing.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Revisions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The number of revision rounds included in a project will be specified in the proposal. 
                    Additional revisions beyond the agreed scope may incur extra charges.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    DrizzlAi shall not be liable for any indirect, incidental, or consequential damages 
                    arising from the use of our services. Our total liability shall not exceed the amount 
                    paid by the client for the specific service in question.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Either party may terminate the agreement with written notice. Upon termination, 
                    the client shall pay for all work completed up to the termination date.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Contact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact us at{" "}
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

export default TermsOfService;

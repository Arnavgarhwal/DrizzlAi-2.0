import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ParallaxBackground, FloatingParticles } from "@/components/ParallaxBackground";
import { Mail, MapPin, Instagram, Linkedin, MessageCircle, HelpCircle, FileText, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// X (formerly Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const supportOptions = [
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Find answers to common questions",
    action: "View FAQ",
    href: "/faq"
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Learn about our services and process",
    action: "Read Docs",
    href: "/services"
  }
];

const Support = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      toast({ title: "Fill required fields", description: "Name, Email and Issue are required." });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('discord-notify', {
        body: {
          type: 'contact',
          data: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || 'Not provided',
            message: `Subject: ${formData.subject.trim() || 'Support Inquiry'}\n\nIssue: ${formData.details.trim()}`,
          },
        },
      });
      if (error) {
        console.error('Discord notification error:', error);
      }
      toast({ title: "Support request sent", description: "Our team will contact you soon." });
      setFormData({ name: "", email: "", phone: "", subject: "", details: "" });
    } catch (err) {
      console.error('Error sending support:', err);
      toast({ title: "Support request sent", description: "Our team will contact you soon." });
      setFormData({ name: "", email: "", phone: "", subject: "", details: "" });
    } finally {
      setIsSubmitting(false);
    }
  };
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
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Help Center</span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
                How Can We <span className="gradient-text">Help?</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                We're here to assist you. Choose an option below or reach out directly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Support Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Left: Contact Cards */}
            <ScrollReveal animation="slideLeft" className="lg:col-span-2">
              <div className="space-y-6">
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary p-px rounded-3xl">
                    <div className="w-full h-full bg-card rounded-[23px]" />
                  </div>
                  <div className="relative p-6 md:p-8">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-muted-foreground mb-3">Facing technical challenges or product concerns? We're here to assist.</p>
                    <a href="mailto:hello.drizzlai@gmail.com" className="text-primary hover:underline">hello.drizzlai@gmail.com</a>
                  </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary p-px rounded-3xl">
                    <div className="w-full h-full bg-card rounded-[23px]" />
                  </div>
                  <div className="relative p-6 md:p-8">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">Contact Sales</h3>
                    <p className="text-muted-foreground mb-3">Let's collaborate on custom solutions or discuss product insights.</p>
                    <button className="text-primary hover:underline" onClick={() => window.dispatchEvent(new Event('booking:open'))}>Book a call</button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Smooth 3D Floating Form */}
            <ScrollReveal animation="slideRight" className="lg:col-span-3">
              <div className="relative bg-card/80 backdrop-blur-2xl border border-border/30 rounded-3xl p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-bold">We'd love to help! Let us know how</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm">Full Name *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="mt-2 bg-background/50 backdrop-blur-sm border-border/50" required />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm">Email Address *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="mt-2 bg-background/50 backdrop-blur-sm border-border/50" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" className="mt-2 bg-background/50 backdrop-blur-sm border-border/50" />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-sm">Subject Of Interest</Label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Regarding Product" className="mt-2 bg-background/50 backdrop-blur-sm border-border/50" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="details" className="text-sm">How may we assist you? *</Label>
                      <Textarea id="details" name="details" value={formData.details} onChange={handleChange} rows={5} placeholder="Describe your issue or request..." className="mt-2 bg-background/50 backdrop-blur-sm border-border/50 resize-none" required />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Your Message'}
                    </Button>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="slideUp">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                  Contact Us Directly
                </h2>
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
                  <StaggerItem>
                    <a href="mailto:hello.drizzlai@gmail.com" className="flex flex-col items-center gap-3 group">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">hello.drizzlai@gmail.com</div>
                      </div>
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium text-sm">Mumbai, India</div>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <a 
                      href="https://www.instagram.com/drizzlai/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Instagram className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Instagram</div>
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">@drizzlai</div>
                      </div>
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <a 
                      href="https://www.linkedin.com/company/drizzlai/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Linkedin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">LinkedIn</div>
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">DrizzlAi</div>
                      </div>
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <a 
                      href="https://x.com/DrizzlAi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <XIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Twitter/X</div>
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">@DrizzlAi</div>
                      </div>
                    </a>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

  <Footer />
    </main>
  );
};

export default Support;

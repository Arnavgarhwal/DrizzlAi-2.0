import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check, Sparkles, Zap, Target, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { supabase } from "@/integrations/supabase/client";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Tell Us Your Vision",
    description: "Share your project goals, target audience, and design preferences with us."
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get a Custom Proposal",
    description: "We'll craft a tailored strategy and quote based on your unique requirements."
  },
  {
    number: "03",
    icon: Zap,
    title: "Collaborate & Create",
    description: "Work closely with our team through iterative design and development cycles."
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Grow",
    description: "Go live with your stunning new digital presence and watch your business thrive."
  }
];

const services = [
  "Website Design",
  "Web Development",
  "E-commerce",
  "Mobile App",
  "Branding",
  "UI/UX Design",
  "Other"
];

const GetStarted = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send Discord notification
      const { error } = await supabase.functions.invoke('discord-notify', {
        body: {
          type: 'inquiry',
          data: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            company: formData.company.trim() || 'Not provided',
            service: formData.service || 'Not specified',
            budget: formData.budget.trim() || 'Not provided',
            message: formData.message.trim(),
          },
        },
      });

      if (error) {
        console.error('Discord notification error:', error);
      }

      toast({
        title: "Request Submitted!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Request Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20">
        {/* Background Elements */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[15%] w-16 h-16 border border-primary/30 rounded-xl bg-primary/5 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[10%] w-20 h-20 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Start Your Journey</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-bold mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Amazing
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your digital presence? Tell us about your project and let's create something extraordinary together.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-display font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold mb-6">
                Tell Us About Your Project
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </motion.p>
            </motion.div>

            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="h-14 bg-card/50 border-border/50 focus:border-primary"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="h-14 bg-card/50 border-border/50 focus:border-primary"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company"
                    className="h-14 bg-card/50 border-border/50 focus:border-primary"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g., $5,000 - $10,000"
                    className="h-14 bg-card/50 border-border/50 focus:border-primary"
                  />
                </motion.div>
              </div>

              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium mb-4">What service are you interested in? *</label>
                <div className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setFormData({ ...formData, service })}
                      className={`px-5 py-3 rounded-full border transition-all duration-300 ${
                        formData.service === service
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border/50 hover:border-primary/50 bg-card/50"
                      }`}
                    >
                      {formData.service === service && <Check className="w-4 h-4 inline mr-2" />}
                      {service}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium mb-2">Project Details *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                  className="min-h-[180px] bg-card/50 border-border/50 focus:border-primary resize-none"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full group"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default GetStarted;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, Building2, MessageSquare, X, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CRMLeadCaptureProps {
  source?: string; // "blog" or "work"
  trigger?: React.ReactNode;
  variant?: "inline" | "modal" | "floating";
}

export const CRMLeadCapture = ({ 
  source = "general", 
  trigger,
  variant = "inline" 
}: CRMLeadCaptureProps) => {
  const [isOpen, setIsOpen] = useState(variant === "inline");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    interest: source === "blog" ? "Content/Resources" : "Portfolio/Projects"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('discord-notify', {
        body: {
          type: 'crm-lead',
          data: {
            source: source,
            name: formData.name.trim(),
            email: formData.email.trim(),
            company: formData.company.trim() || 'Not provided',
            phone: formData.phone.trim() || 'Not provided',
            interest: formData.interest,
            message: formData.message.trim() || 'No message provided',
          },
        },
      });

      if (error) {
        console.error('CRM lead capture error:', error);
      }

      setIsSuccess(true);
      toast({
        title: "Thank you for your interest!",
        description: "We'll contact you within 24 hours.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          interest: source === "blog" ? "Content/Resources" : "Portfolio/Projects"
        });
        setIsSuccess(false);
        if (variant === "modal") {
          setIsOpen(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Error submitting CRM form:', error);
      toast({
        title: "Thank you!",
        description: "We'll get back to you soon.",
        variant: "default",
      });
      setIsSuccess(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          interest: source === "blog" ? "Content/Resources" : "Portfolio/Projects"
        });
        setIsSuccess(false);
        if (variant === "modal") {
          setIsOpen(false);
        }
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "floating") {
    return (
      <>
        {!isOpen && trigger && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail className="w-6 h-6" />
          </motion.button>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
            >
              <div className="bg-gradient-to-r from-primary to-accent p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Let's Connect</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                {renderForm()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (variant === "modal") {
    return (
      <>
        {trigger && (
          <div onClick={() => setIsOpen(true)}>
            {trigger}
          </div>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-primary to-accent p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <p className="text-white/80 mt-2">
                    Interested in working with us? Let's start a conversation.
                  </p>
                </div>
                <div className="p-6">
                  {renderForm()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Inline variant
  function renderForm() {
    if (isSuccess) {
      return (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            We'll be in touch soon.
          </p>
        </motion.div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="bg-background"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company
            </label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project or inquiry..."
            rows={4}
            className="bg-background resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          size="lg"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Inquiry
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By submitting, you agree to our privacy policy. We'll never spam you.
        </p>
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-card/50 to-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm"
    >
      {!(source === "blog" || source === "work") && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Interested in Working Together?</h3>
          <p className="text-muted-foreground">
            Let's discuss how we can help bring your vision to life.
          </p>
        </div>
      )}
      {renderForm()}
    </motion.div>
  );
};


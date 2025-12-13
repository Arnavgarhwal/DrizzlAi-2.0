import { HelpCircle, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const faqs = [
  {
    question: "What types of websites can you build?",
    answer: "We specialize in building custom websites including corporate sites, e-commerce platforms, web applications, landing pages, and portfolio websites using modern technologies.",
  },
  {
    question: "Do I need technical knowledge to work with you?",
    answer: "Not at all! We handle all the technical aspects while keeping you informed throughout the process. Our team translates your vision into reality without requiring any coding knowledge from you.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer: "Yes, we can integrate with most popular tools and platforms including CRMs, payment gateways, analytics tools, and third-party APIs to ensure seamless workflow.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. A simple landing page might take 1-2 weeks, while a full web application could take 2-3 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Absolutely! We offer various maintenance packages to keep your website secure, updated, and running smoothly. This includes regular backups, security updates, and technical support.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="slideUp" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card/80 border border-border/50 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">FAQ'S</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="gradient-text italic">Questions</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Find quick answers to the most common support questions
          </p>
        </ScrollReveal>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Contact Card */}
          <ScrollReveal animation="slideLeft" className="lg:col-span-2">
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-border/50 flex items-center justify-center mb-6">
                <HelpCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Still have questions? Feel free to get in touch with us today!
              </p>
              
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-card border border-border/50 hover:border-primary/50 rounded-full px-6 py-3 text-foreground hover:text-primary transition-all duration-300 group"
              >
                <ArrowUpRight className="w-4 h-4 rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                Ask A Question
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-3">
            <StaggerContainer staggerDelay={0.1}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <StaggerItem key={index}>
                    <AccordionItem
                      value={`item-${index}`}
                      className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors duration-300"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base md:text-lg font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </StaggerItem>
                ))}
              </Accordion>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

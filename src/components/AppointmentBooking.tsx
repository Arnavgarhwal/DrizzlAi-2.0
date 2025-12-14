import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, User, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const timezones = [
  { id: "Asia/Kolkata", label: "IST (India)", offset: "+05:30" },
  { id: "America/New_York", label: "EST (New York)", offset: "-05:00" },
  { id: "America/Los_Angeles", label: "PST (Los Angeles)", offset: "-08:00" },
  { id: "Europe/London", label: "GMT (London)", offset: "+00:00" },
  { id: "Europe/Paris", label: "CET (Paris)", offset: "+01:00" },
  { id: "Asia/Dubai", label: "GST (Dubai)", offset: "+04:00" },
  { id: "Asia/Singapore", label: "SGT (Singapore)", offset: "+08:00" },
  { id: "Australia/Sydney", label: "AEST (Sydney)", offset: "+11:00" },
];

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = ["00", "15", "30", "45"];

export const AppointmentBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "general",
    date: "",
    hour: "10",
    minute: "00",
    period: "AM",
    timezone: "Asia/Kolkata",
  });

  const consultationTypes = [
    { id: "general", label: "General Consultation", duration: "30 min", durationMinutes: 30 },
    { id: "project", label: "Project Discussion", duration: "45 min", durationMinutes: 45 },
    { id: "strategy", label: "Strategy Session", duration: "60 min", durationMinutes: 60 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const getFormattedTime = () => {
    return `${formData.hour}:${formData.minute} ${formData.period}`;
  };

  const getTimezoneLabel = () => {
    return timezones.find(tz => tz.id === formData.timezone)?.label || formData.timezone;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const consultationType = consultationTypes.find(c => c.id === formData.consultationType);
    const consultationLabel = consultationType?.label || formData.consultationType;
    const durationMinutes = consultationType?.durationMinutes || 30;
    const formattedTime = getFormattedTime();
    const timezoneInfo = timezones.find(tz => tz.id === formData.timezone);

    try {
      // Send Discord notification
      const discordPromise = supabase.functions.invoke('discord-notify', {
        body: {
          type: 'booking',
          data: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || 'Not provided',
            consultationType: consultationLabel,
            date: formData.date,
            time: `${formattedTime} (${getTimezoneLabel()})`,
          },
        },
      });

      // Send confirmation email with .ics attachment
      const emailPromise = supabase.functions.invoke('send-booking-confirmation', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          consultationType: consultationLabel,
          date: formData.date,
          time: formattedTime,
          timezone: formData.timezone,
          timezoneOffset: timezoneInfo?.offset || "+05:30",
          durationMinutes,
        },
      });

      // Execute both in parallel
      const [discordResult, emailResult] = await Promise.all([discordPromise, emailPromise]);

      if (discordResult.error) {
        console.error('Discord notification error:', discordResult.error);
      }
      if (emailResult.error) {
        console.error('Email confirmation error:', emailResult.error);
      }

      toast({
        title: "Call Booked!",
        description: "We've sent you a confirmation email with calendar invite.",
      });

      setIsOpen(false);
      setStep(1);
      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationType: "general",
        date: "",
        hour: "10",
        minute: "00",
        period: "AM",
        timezone: "Asia/Kolkata",
      });
    } catch (error) {
      console.error('Error booking call:', error);
      toast({
        title: "Booking Submitted",
        description: "We'll get back to you soon!",
      });
      setIsOpen(false);
      setStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Select Consultation Type</h3>
            <div className="space-y-3">
              {consultationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setFormData({ ...formData, consultationType: type.id });
                    setStep(2);
                  }}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                    formData.consultationType === type.id
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{type.label}</span>
                    <span className="text-sm text-muted-foreground">{type.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Choose Date & Time</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Preferred Time</Label>
                <div className="flex gap-2 mt-1">
                  <Select value={formData.hour} onValueChange={(v) => handleSelectChange("hour", v)}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((h) => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="flex items-center text-muted-foreground">:</span>
                  <Select value={formData.minute} onValueChange={(v) => handleSelectChange("minute", v)}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={formData.period} onValueChange={(v) => handleSelectChange("period", v)}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Timezone</Label>
                <Select value={formData.timezone} onValueChange={(v) => handleSelectChange("timezone", v)}>
                  <SelectTrigger className="mt-1">
                    <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.id} value={tz.id}>
                        {tz.label} ({tz.offset})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                className="flex-1"
                disabled={!formData.date}
              >
                Next
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Your Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1"
                disabled={!formData.name || !formData.email || isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Book Call"}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Floating Book Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-full shadow-lg shadow-primary/30"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(var(--primary), 0.4)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Calendar className="w-5 h-5" />
        Book a Call
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h2 className="text-xl font-bold text-foreground">Book a Call</h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setStep(1);
                  }}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="px-6 pt-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`flex-1 h-1 rounded-full transition-colors ${
                        s <= step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {renderStep()}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <motion.div 
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -top-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

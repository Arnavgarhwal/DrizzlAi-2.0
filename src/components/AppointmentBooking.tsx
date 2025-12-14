import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, X, User, Mail, Phone, Globe, Sparkles, Video, MessageSquare, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

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

// 3D Floating Tab Component
const FloatingTab = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
}) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.4, 0.7, 0.4],
      scale: [1, 1.05, 1],
      y: [0, -10, 0],
      rotateX: [0, 5, 0],
      rotateY: [0, 10, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
  >
    {children}
  </motion.div>
);

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
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [_, setExternalOpenSignal] = useState(0);

  const getTZParts = (d: Date, tz: string) => {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).formatToParts(d);
    const map: Record<string, string> = {};
    for (const p of parts) map[p.type] = p.value;
    return {
      ymd: `${map.year}-${map.month}-${map.day}`,
      hour: parseInt(map.hour, 10),
      minute: parseInt(map.minute, 10),
      period: map.dayPeriod as 'AM' | 'PM',
    };
  };

  const toMinutes = (hourStr: string, minuteStr: string, periodStr: string) => {
    let h = parseInt(hourStr, 10) % 12;
    if (periodStr === 'PM') h += 12;
    if (periodStr === 'AM' && hourStr === '12') h = 0;
    if (periodStr === 'PM' && hourStr === '12') h = 12;
    const m = parseInt(minuteStr, 10);
    return h * 60 + m;
  };

  const isTodayInTZ = (ymd: string, tz: string) => {
    return ymd && ymd === getTZParts(new Date(), tz).ymd;
  };

  const isHourDisabled = (h: string, p: string) => {
    if (!formData.date || !isTodayInTZ(formData.date, formData.timezone)) return false;
    const now = getTZParts(new Date(), formData.timezone);
    const nowTotal = toMinutes(String(now.hour).padStart(2, '0'), String(now.minute).padStart(2, '0'), now.period);
    const selHourStart = toMinutes(h, '00', p);
    return selHourStart + 59 < nowTotal;
  };

  const isMinuteDisabled = (m: string) => {
    if (!formData.date || !isTodayInTZ(formData.date, formData.timezone)) return false;
    const now = getTZParts(new Date(), formData.timezone);
    const nowTotal = toMinutes(String(now.hour).padStart(2, '0'), String(now.minute).padStart(2, '0'), now.period);
    const selTotal = toMinutes(formData.hour, m, formData.period);
    return selTotal < nowTotal;
  };

  const isAMDisabled = () => {
    if (!formData.date || !isTodayInTZ(formData.date, formData.timezone)) return false;
    const now = getTZParts(new Date(), formData.timezone);
    return now.period === 'PM';
  };

  const isPMDisabled = () => {
    if (!formData.date || !isTodayInTZ(formData.date, formData.timezone)) return false;
    return false;
  };

  useEffect(() => {
    const handler = () => {
      setExternalOpenSignal((v) => v + 1);
      setIsOpen(true);
    };
    window.addEventListener('booking:open', handler as EventListener);
    return () => window.removeEventListener('booking:open', handler as EventListener);
  }, []);

  const consultationTypes = [
    { id: "general", label: "General Consultation", duration: "30 min", durationMinutes: 30, icon: MessageSquare, color: "from-cyan-500 to-blue-500" },
    { id: "project", label: "Project Discussion", duration: "45 min", durationMinutes: 45, icon: Rocket, color: "from-purple-500 to-pink-500" },
    { id: "strategy", label: "Strategy Session", duration: "60 min", durationMinutes: 60, icon: Sparkles, color: "from-orange-500 to-red-500" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      const dateString = `${y}-${m}-${d}`;
      // Toggle deselect if clicking the same date
      setFormData({ ...formData, date: formData.date === dateString ? "" : dateString });
    } else {
      setFormData({ ...formData, date: "" });
    }
  };

  const toLocalDate = (ymd: string) => {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const resetForm = () => {
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
    setStep(1);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form when closing without booking
    setTimeout(() => {
      resetForm();
    }, 300); // Small delay to allow close animation
  };

  const getFormattedTime = () => {
    return `${formData.hour}:${formData.minute} ${formData.period}`;
  };

  const getTimezoneLabel = () => {
    return timezones.find(tz => tz.id === formData.timezone)?.label || formData.timezone;
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, scalar: 0.8, colors: ['#00D4FF', '#00FF88'] });
    fire(0.2, { spread: 60, scalar: 1.2, colors: ['#FF00FF', '#00D4FF'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FFD700', '#FF6B6B'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#00FF88', '#00D4FF'] });
    fire(0.1, { spread: 120, startVelocity: 45, scalar: 1.1, colors: ['#FF00FF', '#FFD700'] });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (formData.date && isTodayInTZ(formData.date, formData.timezone)) {
      const now = getTZParts(new Date(), formData.timezone);
      const nowTotal = toMinutes(String(now.hour).padStart(2, '0'), String(now.minute).padStart(2, '0'), now.period);
      const selTotal = toMinutes(formData.hour, formData.minute, formData.period);
      if (selTotal < nowTotal) {
        toast({
          title: "Select a future time",
          description: "Please choose a time later today or another date.",
        });
        setIsSubmitting(false);
        return;
      }
    }

    const consultationType = consultationTypes.find(c => c.id === formData.consultationType);
    const consultationLabel = consultationType?.label || formData.consultationType;
    const formattedTime = getFormattedTime();

    try {
      // Send Discord notification only
      const { error } = await supabase.functions.invoke('discord-notify', {
        body: {
          type: 'booking',
          data: {
            name: formData.name.trim() || 'Not provided',
            email: formData.email.trim(),
            phone: formData.phone.trim() || 'Not provided',
            consultationType: consultationLabel,
            date: formData.date || 'Not selected',
            time: formData.date ? `${formattedTime} (${getTimezoneLabel()})` : 'Not selected',
          },
        },
      });

      if (error) {
        console.error('Discord notification error:', error);
      }

      // Trigger confetti celebration
      triggerConfetti();

      toast({
        title: "🎉 Call Booked!",
        description: "We'll get back to you shortly to confirm.",
      });

      setIsOpen(false);
      if (formData.date) {
        setBookedDates((prev) => (prev.includes(formData.date) ? prev : [...prev, formData.date]));
      }
      // Reset form after successful booking
      setTimeout(() => {
        resetForm();
      }, 300);
    } catch (error) {
      console.error('Error booking call:', error);
      triggerConfetti();
      toast({
        title: "🎉 Booking Submitted",
        description: "We'll get back to you soon!",
      });
      setIsOpen(false);
      if (formData.date) {
        setBookedDates((prev) => (prev.includes(formData.date) ? prev : [...prev, formData.date]));
      }
      // Reset form after booking (even if there was an error, we still reset)
      setTimeout(() => {
        resetForm();
      }, 300);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        // Step 1: Date, Time, and Timezone selection
        return (
          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Pick Your Slot</h3>
            <div className="space-y-4">
              {/* 3D Floating Calendar Container - Compact */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative bg-card/80 backdrop-blur-2xl border border-border/50 rounded-xl p-3 overflow-hidden"
                  whileHover={{ scale: 1.01, rotateY: 2 }}
                  animate={{
                    y: [0, -2, 0],
                    boxShadow: [
                      "0 10px 30px rgba(0, 212, 255, 0.1)",
                      "0 15px 40px rgba(0, 212, 255, 0.15)",
                      "0 10px 30px rgba(0, 212, 255, 0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glassmorphic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.3) 50%, transparent 70%)",
                      backgroundSize: "200% 200%"
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 200%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Floating calendar icon */}
                  <motion.div
                    className="absolute -top-1 -right-1 z-10 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      y: [0, -3, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <CalendarIcon className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    {formData.date ? (
                      // Compact view when date is selected
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Selected Date</p>
                            <p className="font-semibold text-sm">
                              {toLocalDate(formData.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => setFormData({ ...formData, date: "" })}
                          className="p-1.5 hover:bg-background/50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ) : (
                      // Full calendar when no date selected
                      <>
                        <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          Preferred Date
                        </Label>
                        
                        <div className="bg-background/30 backdrop-blur-sm rounded-lg p-2 border border-border/30">
                          <Calendar
                            mode="single"
                            selected={formData.date ? toLocalDate(formData.date) : undefined}
                            onSelect={handleDateSelect}
                            fromMonth={new Date()}
                            toMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              const checkDate = new Date(date);
                              checkDate.setHours(0, 0, 0, 0);
                              const todayTime = today.getTime();
                              const checkTime = checkDate.getTime();
                              const y = checkDate.getFullYear();
                              const m = String(checkDate.getMonth() + 1).padStart(2, '0');
                              const d = String(checkDate.getDate()).padStart(2, '0');
                              const ymd = `${y}-${m}-${d}`;
                              const isBooked = bookedDates.includes(ymd);
                              return checkTime < todayTime || isBooked;
                            }}
                            className="rounded-lg scale-90 origin-top-left"
                            classNames={{
                              months: "flex flex-col space-y-2",
                              month: "space-y-2",
                              caption: "flex justify-center pt-1 relative items-center",
                              caption_label: "text-xs font-medium",
                              nav: "space-x-1 flex items-center",
                              nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 border border-border/50 rounded-md text-xs",
                              nav_button_previous: "absolute left-1",
                              nav_button_next: "absolute right-1",
                              table: "w-full border-collapse space-y-0.5",
                              head_row: "flex",
                              head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.7rem]",
                              row: "flex w-full mt-1",
                              cell: "h-7 w-7 text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent/50 transition-colors text-xs",
                              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md",
                              day_today: "bg-accent text-accent-foreground font-semibold",
                              day_outside: "text-muted-foreground opacity-50",
                              day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                              day_hidden: "invisible",
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Decorative floating elements - smaller */}
                  <motion.div
                    className="absolute top-2 left-2 w-10 h-10 bg-primary/10 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                      x: [0, 5, 0],
                      y: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-2 right-2 w-8 h-8 bg-accent/10 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                      x: [0, -4, 0],
                      y: [0, -4, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label className="text-sm font-medium">Preferred Time</Label>
                <div className="flex gap-2 mt-2">
                  <Select value={formData.hour} onValueChange={(v) => handleSelectChange("hour", v)}>
                    <SelectTrigger className="w-20 bg-background/50 backdrop-blur-sm border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((h) => (
                        <SelectItem key={h} value={h} disabled={isHourDisabled(h, formData.period)}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="flex items-center text-muted-foreground text-xl">:</span>
                  <Select value={formData.minute} onValueChange={(v) => handleSelectChange("minute", v)}>
                    <SelectTrigger className="w-20 bg-background/50 backdrop-blur-sm border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((m) => (
                        <SelectItem key={m} value={m} disabled={isMinuteDisabled(m)}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={formData.period} onValueChange={(v) => handleSelectChange("period", v)}>
                    <SelectTrigger className="w-20 bg-background/50 backdrop-blur-sm border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM" disabled={isAMDisabled()}>AM</SelectItem>
                      <SelectItem value="PM" disabled={isPMDisabled()}>PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label className="text-sm font-medium">Timezone</Label>
                <Select value={formData.timezone} onValueChange={(v) => handleSelectChange("timezone", v)}>
                  <SelectTrigger className="mt-2 bg-background/50 backdrop-blur-sm border-border/50">
                    <Globe className="w-4 h-4 mr-2 text-primary" />
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
              </motion.div>
            </div>
            <div className="flex gap-3 mt-6 relative z-50">
              <Button 
                onClick={() => setStep(2)} 
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 relative z-50"
                type="button"
              >
                Next
              </Button>
            </div>
          </motion.div>
        );
      case 2:
        // Step 2: Name, Email, Phone entry
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Your Information</h3>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
                    required
                    autoFocus
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
                    required
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  We'll use this to confirm your booking and send you meeting details.
                </p>
              </motion.div>
            </div>
            <div className="flex gap-3 mt-6 relative z-50">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 bg-background/50 backdrop-blur-sm">
                Back
              </Button>
              <motion.div className="flex-1 relative z-[100]">
                <Button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit();
                  }}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[0_0_30px_hsl(var(--primary)/0.4)] relative z-[100] cursor-pointer"
                  disabled={!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim() || isSubmitting}
                  size="lg"
                  type="button"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mx-auto"
                    />
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Book Call Now
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        );
      case 3:
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Floating Book Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-full shadow-lg shadow-primary/30"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(var(--primary), 0.4)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
                <CalendarIcon className="w-5 h-5" />
        Book a Call
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* 3D Floating Background Elements */}
            <FloatingTab delay={0} className="-top-10 -left-10 hidden md:block">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-sm flex items-center justify-center">
                <CalendarIcon className="w-8 h-8 text-cyan-400" />
              </div>
            </FloatingTab>
            
            <FloatingTab delay={0.5} className="-top-5 -right-5 hidden md:block">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-400" />
              </div>
            </FloatingTab>
            
            <FloatingTab delay={1} className="-bottom-10 -left-5 hidden md:block">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
            </FloatingTab>
            
            <FloatingTab delay={1.5} className="-bottom-5 -right-10 hidden md:block">
              <div className="w-18 h-18 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm flex items-center justify-center p-4">
                <MessageSquare className="w-6 h-6 text-green-400" />
              </div>
            </FloatingTab>

            <motion.div
              className="relative w-full max-w-md bg-card/80 backdrop-blur-2xl border border-border/30 rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {/* Animated gradient border */}
              <motion.div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                  backgroundSize: "200% 100%",
                  padding: "1px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Video className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-foreground">Book a Call</h2>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="p-2 hover:bg-muted/50 rounded-full transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Step Indicator */}
              <div className="px-6 pt-5">
                <div className="flex items-center gap-2">
                  {[1, 2].map((s) => (
                    <motion.div
                      key={s}
                      className={`flex-1 h-1.5 rounded-full transition-colors relative overflow-hidden ${
                        s <= step ? "bg-primary" : "bg-muted/50"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: s * 0.1 }}
                    >
                      {s <= step && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: s * 0.2 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span className={step >= 1 ? "text-primary" : ""}>Schedule</span>
                  <span className={step >= 2 ? "text-primary" : ""}>Your Info</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[320px]">
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>
              </div>

              {/* Decorative background elements */}
              <motion.div 
                className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -top-32 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

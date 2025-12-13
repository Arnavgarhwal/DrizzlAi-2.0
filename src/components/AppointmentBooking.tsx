import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, Check, ChevronLeft, ChevronRight, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const consultationTypes = [
  { id: "discovery", name: "Discovery Call", duration: "30 min", description: "Quick intro to discuss your project" },
  { id: "consultation", name: "Full Consultation", duration: "60 min", description: "In-depth project planning session" },
  { id: "technical", name: "Technical Review", duration: "45 min", description: "Review technical requirements" },
];

export const AppointmentBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);
  const today = new Date();

  const isDateAvailable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6;
  };

  const handleDateSelect = (day: number) => {
    if (isDateAvailable(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
  };

  const handleSubmit = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
      setIsOpen(false);
      setStep(1);
      setSelectedType("");
      setSelectedDate(null);
      setSelectedTime("");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
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
              className="relative w-full max-w-2xl bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Schedule a Consultation</h2>
                  <p className="text-sm text-muted-foreground">Step {step} of 3</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-muted">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {isConfirmed ? (
                    <motion.div
                      key="confirmed"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <motion.div
                        className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10 }}
                      >
                        <Check className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                      <p className="text-muted-foreground">
                        We'll send you a confirmation email shortly.
                      </p>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold mb-4">Select Consultation Type</h3>
                      {consultationTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            selectedType === type.id
                              ? "border-primary bg-primary/10"
                              : "border-border/50 hover:border-primary/50"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{type.name}</h4>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                            <span className="flex items-center gap-1 text-sm text-primary">
                              <Clock className="w-4 h-4" />
                              {type.duration}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : step === 2 ? (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold">Select Date & Time</h3>
                      
                      {/* Calendar */}
                      <div className="bg-muted/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={prevMonth} className="p-2 hover:bg-muted rounded-lg">
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <span className="font-medium">
                            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </span>
                          <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-lg">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="py-2 text-muted-foreground font-medium">
                              {day}
                            </div>
                          ))}
                          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isAvailable = isDateAvailable(day);
                            const isSelected = selectedDate?.getDate() === day &&
                              selectedDate?.getMonth() === currentMonth.getMonth();
                            
                            return (
                              <button
                                key={day}
                                onClick={() => handleDateSelect(day)}
                                disabled={!isAvailable}
                                className={`py-2 rounded-lg transition-all ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : isAvailable
                                    ? "hover:bg-primary/20 text-foreground"
                                    : "text-muted-foreground/40 cursor-not-allowed"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <h4 className="font-medium mb-3">Available Times</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                  selectedTime === time
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted/50 hover:bg-primary/20"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold">Your Information</h3>
                      
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                          <Textarea
                            placeholder="Tell us about your project..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="pl-10 min-h-[100px]"
                          />
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                        <h4 className="font-medium">Booking Summary</h4>
                        <p className="text-sm text-muted-foreground">
                          {consultationTypes.find(t => t.id === selectedType)?.name} • {consultationTypes.find(t => t.id === selectedType)?.duration}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {!isConfirmed && (
                <div className="flex items-center justify-between p-6 border-t border-border/50">
                  <Button
                    variant="ghost"
                    onClick={() => step > 1 && setStep(step - 1)}
                    disabled={step === 1}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (step < 3) {
                        setStep(step + 1);
                      } else {
                        handleSubmit();
                      }
                    }}
                    disabled={
                      (step === 1 && !selectedType) ||
                      (step === 2 && (!selectedDate || !selectedTime)) ||
                      (step === 3 && (!formData.name || !formData.email))
                    }
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    {step === 3 ? "Confirm Booking" : "Continue"}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

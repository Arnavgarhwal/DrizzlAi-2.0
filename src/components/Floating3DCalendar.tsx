import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, X, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Floating3DCalendarProps {
  onDateSelect?: (date: Date | undefined) => void;
}

export const Floating3DCalendar = ({ onDateSelect }: Floating3DCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && onDateSelect) {
      onDateSelect(date);
      toast({
        title: "Date Selected!",
        description: `Selected: ${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
      });
    }
  };

  return (
    <>
      {/* Floating Calendar Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 z-40 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/90 via-primary/80 to-accent/90 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/30 flex items-center justify-center group overflow-hidden"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: [0, -10, 0],
          boxShadow: [
            "0 20px 40px rgba(0, 212, 255, 0.3)",
            "0 25px 50px rgba(0, 212, 255, 0.4)",
            "0 20px 40px rgba(0, 212, 255, 0.3)"
          ]
        }}
        transition={{ 
          scale: { duration: 0.5, type: "spring" },
          rotate: { duration: 0.5 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-50"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 200%"
          }}
        />
        
        <CalendarIcon className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
        
        {/* Notification badge if date is selected */}
        {selectedDate && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>

      {/* 3D Floating Calendar Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-background/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Calendar Container */}
            <motion.div
              className="fixed bottom-32 right-6 z-50 origin-bottom-right"
              initial={{ 
                opacity: 0, 
                scale: 0.5, 
                rotateX: 90,
                rotateY: -20,
                x: 100,
                y: 100
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5,
                rotateX: 90,
                rotateY: -20,
                x: 100,
                y: 100
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              <motion.div
                className="relative bg-card/80 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                style={{
                  backdropFilter: "blur(20px) saturate(180%)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                }}
              >
                {/* Glassmorphic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
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

                {/* Close button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background/80 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>

                {/* Header */}
                <div className="relative z-10 p-6 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <CalendarIcon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Choose Your Preferred Date</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select a date to schedule your consultation
                  </p>
                </div>

                {/* Calendar */}
                <div className="relative z-10 p-6">
                  <div className="bg-background/30 backdrop-blur-sm rounded-2xl p-4 border border-border/30">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="rounded-lg"
                      classNames={{
                        months: "flex flex-col space-y-4",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-border/50 rounded-md",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent/50 transition-colors",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-lg",
                        day_today: "bg-accent text-accent-foreground font-semibold",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                  </div>
                </div>

                {/* Selected Date Display */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 px-6 pb-6"
                  >
                    <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Selected Date</p>
                        <p className="font-semibold">
                          {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="relative z-10 p-6 pt-4 border-t border-border/50 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedDate(undefined);
                      if (onDateSelect) onDateSelect(undefined);
                    }}
                    className="flex-1"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                  >
                    Confirm Date
                  </Button>
                </div>

                {/* Decorative floating elements inside */}
                <motion.div
                  className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 20, 0],
                    y: [0, 20, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-10 right-10 w-16 h-16 bg-accent/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, -15, 0],
                    y: [0, -15, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


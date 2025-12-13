import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MapPin } from "lucide-react";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "New York", "London", "Dubai", 
  "Singapore", "Tokyo", "Sydney", "Berlin", "Paris", "Toronto",
  "Los Angeles", "Chicago", "San Francisco", "Seattle", "Austin"
];

const actions = [
  "just visited the site",
  "is viewing our work",
  "is exploring services",
  "checked out our portfolio"
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateNotification = () => ({
  id: Date.now(),
  city: getRandomItem(cities),
  action: getRandomItem(actions),
  timeAgo: `${Math.floor(Math.random() * 5) + 1} min ago`
});

export const SocialProofWidget = () => {
  const [notification, setNotification] = useState<ReturnType<typeof generateNotification> | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, []);

  const showNotification = () => {
    const newNotification = generateNotification();
    setNotification(newNotification);
    setIsVisible(true);

    // Hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Show next notification after random interval (15-30 seconds)
      const nextDelay = Math.floor(Math.random() * 15000) + 15000;
      setTimeout(showNotification, nextDelay);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-6 z-40 max-w-xs"
        >
          <div className="bg-card/95 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl shadow-black/20">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Someone from <span className="text-primary">{notification.city}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.action}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{notification.timeAgo}</span>
                </div>
              </div>
            </div>
            
            {/* Live indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-green-500 font-medium">Live</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Skeleton className="w-11 h-11 rounded-xl" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="hidden md:flex items-center gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-16 h-4" />
              ))}
              <Skeleton className="w-24 h-9 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Skeleton className="w-48 h-8 mx-auto rounded-full" />
            <Skeleton className="w-96 h-16 mx-auto max-w-full" />
            <Skeleton className="w-72 h-6 mx-auto" />
            <Skeleton className="w-32 h-12 mx-auto rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              <Skeleton className="w-full h-48 rounded-2xl" />
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-2/3 h-4" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </motion.div>
      </div>
    </div>
  );
};

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxLayerProps {
  children?: ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const ParallaxLayer = ({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const yRange = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const xRange = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  const y = useSpring(
    direction === "up" ? yRange : direction === "down" ? useTransform(yRange, (v) => -v) : 0,
    springConfig
  );
  const x = useSpring(
    direction === "left" ? xRange : direction === "right" ? useTransform(xRange, (v) => -v) : 0,
    springConfig
  );

  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  );
};

interface ParallaxBackgroundProps {
  variant?: "orbs" | "grid" | "shapes" | "gradient";
  className?: string;
  intensity?: number;
}

export const ParallaxBackground = ({
  variant = "orbs",
  className = "",
  intensity = 1,
}: ParallaxBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 20 };

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150 * intensity]), springConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80 * intensity]), springConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200 * intensity]), springConfig);
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30 * intensity]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.2]), springConfig);

  if (variant === "orbs") {
    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
          style={{ y: y1, scale }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px]"
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
          style={{ y: y3 }}
        />
      </div>
    );
  }

  if (variant === "shapes") {
    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-2xl"
          style={{ y: y1, rotate }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 border border-accent/20 rounded-full"
          style={{ y: y2, rotate: useTransform(rotate, (r) => -r) }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-lg"
          style={{ y: y3, rotate }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-dashed border-primary/10 rounded-full"
          style={{ y: y2, rotate: useTransform(rotate, (r) => r * 2) }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-accent/10 rounded-full"
          style={{ y: y1 }}
        />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          style={{ scale }}
        />
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent"
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent"
          style={{ y: useTransform(y2, (v) => -v) }}
        />
      </div>
    );
  }

  // Grid variant
  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{ y: y2 }}
      />
    </div>
  );
};

// Floating particles effect
export const FloatingParticles = ({ count = 20, className = "" }: { count?: number; className?: string }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

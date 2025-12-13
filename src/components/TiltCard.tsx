import { useState, useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
  floatAnimation?: boolean;
  onClick?: () => void;
}

export const TiltCard = ({ children, className, style, index = 0, floatAnimation = true, onClick }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("");
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transform || style?.transform || undefined,
        transition: transform ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        animation: floatAnimation && !transform ? `float-3d ${3 + index * 0.5}s ease-in-out infinite` : "none",
        animationDelay: floatAnimation ? `${index * 0.3}s` : undefined,
      }}
    >
      {/* Dynamic Glow */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 rounded-3xl blur-xl transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: transform ? 0.7 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.3), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};

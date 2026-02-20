import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

function Counter({ end, suffix = "", prefix = "", label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-bold text-4xl md:text-5xl text-secondary">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="mt-2 text-sm text-muted-foreground font-sans">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="bg-stats py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <Counter end={3} suffix="+" label="States Reached" />
          <Counter end={14} label="Schools Engaged" />
          <Counter end={3200} suffix="+" label="Students Reached" />
          <Counter end={2} label="Water Facilities" />
          <Counter end={116} label="Values-Based Decisions" />
          <Counter prefix="₦" end={1382000} suffix="" label="Programme Spend" />
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export function Reveal({ children, delay = 0, y = 34, className, once = true }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word masked reveal driven by CSS transitions (stable across SSR
 * hydration and paint, unlike transform keyframes on inline elements).
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  ember = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  ember?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em" }}
        >
          <span
            className={`inline-block will-change-transform${ember ? " text-ember" : ""}`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(105%)",
              transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay + i * 0.07}s, transform .95s cubic-bezier(.22,1,.36,1) ${delay + i * 0.07}s`,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  size?: "sm" | "md" | "lg";
  arrow?: "up-right" | "down" | "none";
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const sizes = {
  sm: "px-4 py-2 text-[0.72rem]",
  md: "px-6 py-3 text-[0.78rem]",
  lg: "px-8 py-4 text-sm",
};

export function GlowButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  arrow = "up-right",
  className,
  target,
  rel,
  ariaLabel,
}: Props) {
  const base = cn(
    "group relative inline-flex items-center gap-2 rounded-full font-semibold uppercase tracking-[0.16em]",
    "shimmer border-live transition-all duration-500",
    sizes[size],
    variant === "solid"
      ? "bg-ember text-primary-foreground glow-ring hover:shadow-[0_0_44px_-8px_var(--amber-glow)]"
      : "glass text-foreground hover:border-primary/50 hover:text-primary",
    className,
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow === "up-right" && (
        <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      )}
      {arrow === "down" && (
        <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0.5">
          ↓
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={base}
        whileHover={{ scale: 1.035 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={base}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
    >
      {inner}
    </motion.button>
  );
}

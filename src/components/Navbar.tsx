import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { sections, site } from "@/lib/site";
import { GlowButton } from "./GlowButton";
import { cn } from "@/lib/utils";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 280 : 0);
  };

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="bg-ember fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            scrolled
              ? "glass-strong scale-[0.985] px-3 py-2 sm:px-4"
              : "glass px-4 py-3 sm:px-5 sm:py-3.5",
          )}
        >
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 pl-1 text-left"
          >
            <span className="bg-ember glow-ring relative flex h-8 w-8 items-center justify-center rounded-full">
              <span className="font-display text-primary-foreground text-sm font-extrabold">O</span>
            </span>
            <span className="hidden leading-none sm:block">
              <span className="font-display block text-[0.82rem] font-extrabold tracking-tight">
                OSBORN ROOFING
              </span>
              <span className="text-muted-foreground block text-[0.58rem] tracking-[0.3em]">
                WA PTY LTD
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[0.72rem] font-semibold tracking-[0.13em] uppercase transition-colors duration-300",
                  active === s.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="bg-ember absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <GlowButton size="sm" onClick={() => go("contact")}>
                Get a Free Quote
              </GlowButton>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="glass hover:border-primary/50 relative flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden"
            >
              <span className="flex h-3 w-4 flex-col justify-between">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="bg-foreground block h-[1.5px] w-full origin-center"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="bg-foreground block h-[1.5px] w-full"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="bg-foreground block h-[1.5px] w-full origin-center"
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-background/92 fixed inset-0 z-40 flex flex-col justify-center px-7 backdrop-blur-2xl lg:hidden"
          >
            <div className="veil pointer-events-none absolute inset-0" />
            <div className="relative space-y-1">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => go(s.id)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group border-border/60 flex w-full items-baseline gap-4 border-b py-4 text-left"
                >
                  <span className="text-primary/70 font-display text-xs">
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-3xl font-extrabold tracking-tight transition-colors",
                      active === s.id ? "text-ember" : "group-hover:text-primary",
                    )}
                  >
                    {s.label}
                  </span>
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="pt-8"
              >
                <GlowButton size="lg" onClick={() => go("contact")}>
                  Get a Free Quote
                </GlowButton>
                <p className="text-muted-foreground mt-6 text-xs tracking-[0.25em] uppercase">
                  {site.tagline}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

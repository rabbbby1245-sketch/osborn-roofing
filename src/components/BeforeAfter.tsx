import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import { Reveal, RevealWords } from "./Reveal";

// Placeholder images — swap these two imports for real project photos.
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => move(e.clientX);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) move(t.clientX);
    };
    const stop = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, move]);

  return (
    <section id="before-after" className="grain relative overflow-hidden py-24 sm:py-36">
      <div className="bg-primary/10 pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="text-primary/80 text-[0.62rem] tracking-[0.4em] uppercase">
                04 — Before &amp; After
              </span>
            </Reveal>
            <h2 className="font-display mt-5 text-[2.1rem] leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              <RevealWords text="THE" /> <RevealWords text="TRANSFORMATION" delay={0.1} ember />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Drag the handle to reveal the difference. Placeholder images until real project
              photos are added.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong mt-12 rounded-[2rem] p-1.5"
        >
          <div
            ref={ref}
            onMouseDown={(e) => {
              setDragging(true);
              move(e.clientX);
            }}
            onTouchStart={(e) => {
              setDragging(true);
              const t = e.touches[0];
              if (t) move(t.clientX);
            }}
            className="relative h-[320px] w-full cursor-ew-resize overflow-hidden rounded-[1.65rem] select-none sm:h-[480px] lg:h-[560px]"
          >
            <img
              src={beforeImg}
              alt="Roof before the work"
              loading="lazy"
              width={1600}
              height={1000}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <img
                src={afterImg}
                alt="Roof after the work"
                loading="lazy"
                width={1600}
                height={1000}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>

            <span className="glass absolute top-4 left-4 rounded-full px-3 py-1.5 text-[0.58rem] tracking-[0.28em] uppercase">
              Before
            </span>
            <span className="glass absolute top-4 right-4 rounded-full px-3 py-1.5 text-[0.58rem] tracking-[0.28em] uppercase">
              After
            </span>

            <div
              className="pointer-events-none absolute inset-y-0"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div className="bg-ember h-full w-[2px] shadow-[0_0_28px_var(--amber-glow)]" />
              <motion.div
                animate={{ scale: dragging ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="glass-strong absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm shadow-[0_0_46px_-6px_var(--amber-glow)]"
              >
                <span className="text-primary">⇄</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

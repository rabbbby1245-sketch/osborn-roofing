import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";
import w7 from "@/assets/work-7.jpg";
import w8 from "@/assets/work-8.jpg";
import w9 from "@/assets/work-9.jpg";
import { Reveal, RevealWords } from "./Reveal";

// Replace these 9 entries with real project photos at any time.
export const workImages = [
  { src: w3, caption: "Coastal home re-roof" },
  { src: w1, caption: "Ridge capping detail" },
  { src: w2, caption: "Sunset install" },
  { src: w9, caption: "Modern roof line" },
  { src: w5, caption: "New build framing" },
  { src: w4, caption: "Gutter & downpipe" },
  { src: w6, caption: "Patio roofing" },
  { src: w7, caption: "Tile restoration" },
  { src: w8, caption: "Safety setup" },
];

// slot 0 = front/centre, slots 1-8 = surrounding, in x/y fractions of the stage
const slots = [
  { x: 0, y: 0, r: 0, s: 1 },
  { x: -0.345, y: -0.3, r: -9, s: 0.4 },
  { x: 0, y: -0.36, r: 4, s: 0.4 },
  { x: 0.345, y: -0.3, r: 9, s: 0.4 },
  { x: 0.415, y: 0.02, r: 5, s: 0.4 },
  { x: 0.325, y: 0.33, r: -6, s: 0.4 },
  { x: 0, y: 0.38, r: 3, s: 0.4 },
  { x: -0.325, y: 0.33, r: 7, s: 0.4 },
  { x: -0.415, y: 0.02, r: -5, s: 0.4 },
];

export function WorkGallery() {
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 900, h: 560 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % workImages.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + workImages.length) % workImages.length),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const cardW = Math.min(size.w * 0.44, 360);
  const cardH = cardW * 1.3;

  return (
    <section id="work" className="grain relative overflow-hidden py-24 sm:py-36">
      <div className="veil pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="text-primary/80 text-[0.62rem] tracking-[0.4em] uppercase">
                03 — Work
              </span>
            </Reveal>
            <h2 className="font-display mt-5 text-[2.1rem] leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              <RevealWords text="SELECTED" />
              <br />
              <span className="text-ember">
                <RevealWords text="ROOFS" delay={0.1} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm tracking-[0.2em]">
                {String(index + 1).padStart(2, "0")}
                <span className="text-muted-foreground"> / 09</span>
              </span>
              <div className="flex gap-2">
                <GalleryBtn onClick={prev} label="Previous image">
                  ←
                </GalleryBtn>
                <GalleryBtn onClick={next} label="Next image">
                  →
                </GalleryBtn>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          ref={stageRef}
          className="relative mt-12 h-[420px] w-full select-none sm:h-[560px] lg:h-[620px]"
        >
          {workImages.map((img, i) => {
            const slotIndex = (i - index + workImages.length) % workImages.length;
            const slot = slots[slotIndex] ?? slots[0]!;
            const isFront = slotIndex === 0;
            return (
              <motion.div
                key={img.caption}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) next();
                  else if (info.offset.x > 70) prev();
                }}
                animate={{
                  x: slot.x * size.w,
                  y: slot.y * size.h,
                  rotate: slot.r,
                  scale: slot.s,
                  opacity: isFront ? 1 : 0.62,
                  zIndex: isFront ? 30 : 10 - Math.abs(4 - slotIndex),
                }}
                transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.9 }}
                style={{
                  width: cardW,
                  height: cardH,
                  left: "50%",
                  top: "50%",
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  cursor: isFront ? "grab" : "pointer",
                }}
                onClick={() => {
                  if (!isFront) setIndex(i);
                }}
                className="group absolute overflow-hidden rounded-3xl"
              >
                <div className="glass-strong absolute inset-0 rounded-3xl p-1">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    width={912}
                    height={1200}
                    draggable={false}
                    className="h-full w-full rounded-[1.35rem] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                </div>
                <div className="from-background/85 pointer-events-none absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t to-transparent p-4 pt-12">
                  {isFront && (
                    <motion.span
                      key={img.caption}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.6 }}
                      className="block text-[0.68rem] tracking-[0.22em] uppercase"
                    >
                      {img.caption}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="text-muted-foreground mt-8 text-center text-[0.6rem] tracking-[0.3em] uppercase">
          Drag, tap a photo or use the arrows
        </p>
      </div>
    </section>
  );
}

function GalleryBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className="glass border-live hover:bg-ember hover:text-primary-foreground hover:glow-ring flex h-12 w-12 items-center justify-center rounded-full text-lg transition-colors duration-500"
    >
      {children}
    </motion.button>
  );
}

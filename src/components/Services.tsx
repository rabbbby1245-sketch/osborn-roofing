import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import s1 from "@/assets/work-2.jpg";
import s2 from "@/assets/work-5.jpg";
import s3 from "@/assets/work-4.jpg";
import s4 from "@/assets/work-7.jpg";
import s5 from "@/assets/work-6.jpg";
import { Reveal, RevealWords } from "./Reveal";

// Edit these items freely — titles, copy and images are all replaceable.
export const services = [
  {
    title: "Roof Replacement",
    text: "Full re-roofs with clean lines, tidy sites and careful attention to detail.",
    image: s1,
  },
  {
    title: "New Builds",
    text: "Roofing for new homes and extensions, coordinated around your build schedule.",
    image: s2,
  },
  {
    title: "Gutters & Downpipes",
    text: "Guttering, fascia and downpipe work that moves water where it should go.",
    image: s3,
  },
  {
    title: "Repairs & Maintenance",
    text: "Leak investigation, repairs and upkeep to keep a roof performing for longer.",
    image: s4,
  },
  {
    title: "Patios & Sheds",
    text: "Metal roofing for patios, carports and sheds, finished to the same standard.",
    image: s5,
  },
];

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="grain relative overflow-hidden py-24 sm:py-36">
      <div className="bg-primary/10 pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="text-primary/80 text-[0.62rem] tracking-[0.4em] uppercase">
                02 — Services
              </span>
            </Reveal>
            <h2 className="font-display mt-5 text-[2.1rem] leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              <RevealWords text="ROOFING" />
              <br />
              <RevealWords text="SOLUTIONS" delay={0.1} ember />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              A South West team handling the full scope of residential and light commercial
              roofing.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group border-border/70 border-live relative flex cursor-pointer items-center gap-5 border-t py-7 transition-colors duration-500 last:border-b sm:gap-10 sm:py-9"
              >
                <span
                  className={`font-display w-12 shrink-0 text-2xl font-extrabold transition-colors duration-500 sm:text-3xl ${
                    hovered === i ? "text-ember" : "text-muted-foreground/45"
                  }`}
                >
                  0{i + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-display text-xl font-bold tracking-tight transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:text-3xl ${
                      hovered === i ? "translate-x-2 text-primary" : ""
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed sm:mt-3">
                    {s.text}
                  </p>
                </div>

                <div className="relative hidden h-24 w-40 shrink-0 overflow-hidden rounded-2xl lg:block">
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.img
                        key="img"
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="glow-ring h-full w-full rounded-2xl object-cover"
                      />
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className={`glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    hovered === i
                      ? "bg-ember text-primary-foreground glow-ring translate-x-1 -translate-y-1"
                      : ""
                  }`}
                >
                  ↗
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

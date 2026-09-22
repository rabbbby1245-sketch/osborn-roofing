import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import img1 from "@/assets/work-3.jpg";
import img2 from "@/assets/work-1.jpg";
import img3 from "@/assets/work-9.jpg";
import { Reveal, RevealWords } from "./Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-6%", "14%"]);
  const yC = useTransform(scrollYProgress, [0, 1], ["12%", "-8%"]);

  return (
    <section id="about" className="grain relative overflow-hidden py-24 sm:py-36">
      <div className="veil pointer-events-none absolute inset-0" />
      <div ref={ref} className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="text-primary/80 text-[0.62rem] tracking-[0.4em] uppercase">
            01 — About
          </span>
        </Reveal>

        <h2 className="font-display mt-6 max-w-4xl text-[2.1rem] leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          <RevealWords text="QUALITY." />
          <span className="text-ember">
            {" "}
            <RevealWords text="RELIABILITY." delay={0.1} />
          </span>{" "}
          <RevealWords text="SAFETY." delay={0.2} />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="relative h-[420px] sm:h-[540px]">
            <motion.div
              style={{ y: yA }}
              className="glow-ring absolute top-0 left-0 w-[62%] overflow-hidden rounded-3xl"
            >
              <img
                src={img1}
                alt="Coastal home with a completed roof"
                loading="lazy"
                width={912}
                height={1200}
                className="h-[300px] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-110 sm:h-[380px]"
              />
            </motion.div>

            <motion.div
              style={{ y: yB }}
              className="glow-ring absolute top-[26%] right-0 w-[46%] overflow-hidden rounded-3xl"
            >
              <img
                src={img2}
                alt="Metal roof ridge capping detail"
                loading="lazy"
                width={912}
                height={1200}
                className="h-[230px] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-110 sm:h-[300px]"
              />
            </motion.div>

            <motion.div
              style={{ y: yC }}
              className="glass-strong absolute bottom-0 left-[12%] w-[52%] overflow-hidden rounded-3xl p-1.5"
            >
              <img
                src={img3}
                alt="Modern dark roof line at dusk"
                loading="lazy"
                width={912}
                height={1200}
                className="h-[170px] w-full rounded-[1.4rem] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-110 sm:h-[210px]"
              />
            </motion.div>
          </div>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <p className="text-foreground/90 text-xl leading-relaxed sm:text-2xl">
                Osborn Roofing WA Pty Ltd is an{" "}
                <span className="text-ember font-semibold">experienced and vibrant team</span>{" "}
                based in the South West.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                We work across Busselton and the wider South West, bringing a careful, safety-first
                approach to every roof we touch — from new builds to replacements, repairs and
                maintenance. Straight lines, clean sites, honest advice.
              </p>
            </Reveal>

            <div className="grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3">
              {["Quality", "Reliability", "Safety"].map((v, i) => (
                <Reveal key={v} delay={0.25 + i * 0.1}>
                  <div className="glass border-live group h-full rounded-2xl p-5 transition-colors duration-500 hover:bg-white/[0.04]">
                    <span className="text-primary/70 font-display block text-xs">
                      0{i + 1}
                    </span>
                    <span className="font-display mt-2 block text-lg font-bold">{v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

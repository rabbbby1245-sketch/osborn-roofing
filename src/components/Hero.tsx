import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroRoof from "@/assets/hero-roof.jpg";
import { site } from "@/lib/site";
import { GlowButton } from "./GlowButton";
import { RevealWords } from "./Reveal";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="grain relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img
          src={heroRoof}
          alt="Roofers finishing a metal roof at sunset"
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="from-background via-background/55 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="from-background/90 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
      <div className="veil absolute inset-0" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass float-slow mb-7 inline-flex items-center gap-3 rounded-full px-4 py-2"
        >
          <span className="bg-ember h-1.5 w-1.5 rounded-full" />
          <span className="text-[0.62rem] tracking-[0.3em] uppercase">
            South West · Busselton, WA
          </span>
        </motion.div>

        <h1 className="font-display max-w-4xl text-[2.6rem] leading-[0.94] font-extrabold tracking-[-0.03em] sm:text-7xl lg:text-8xl">
          <RevealWords text="QUALITY ABOVE." delay={0.4} />
          <br />
          <span className="text-ember">
            <RevealWords text="ROOFING BUILT TO LAST." delay={0.6} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="text-muted-foreground mt-7 text-sm tracking-[0.35em] uppercase sm:text-base"
        >
          Quality. Reliability. Safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <GlowButton size="lg" onClick={() => scrollToId("contact")}>
            Get a Free Quote
          </GlowButton>
          <GlowButton size="lg" variant="ghost" arrow="down" onClick={() => scrollToId("work")}>
            Explore Our Work
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="border-border/60 mt-14 flex flex-wrap gap-3 border-t pt-7"
        >
          {["Experienced team", "Vibrant crew", "Based in the South West"].map((t, i) => (
            <motion.span
              key={t}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
              className="glass rounded-full px-4 py-2 text-[0.62rem] tracking-[0.2em] uppercase"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href={site.facebook}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="text-muted-foreground hover:text-primary absolute right-6 bottom-24 hidden rotate-90 text-[0.6rem] tracking-[0.35em] uppercase transition-colors lg:block"
      >
        Facebook
      </motion.a>
    </section>
  );
}

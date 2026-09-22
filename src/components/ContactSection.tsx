import { motion } from "motion/react";
import { site } from "@/lib/site";
import { GlowButton } from "./GlowButton";
import { Reveal, RevealWords } from "./Reveal";

const details = [
  { label: "Location", value: site.address, href: site.mapHref, external: true },
  { label: "Phone", value: site.phone, href: site.phoneHref, external: false },
  { label: "Email", value: site.email, href: site.emailHref, external: false },
];

export function ContactSection() {
  return (
    <section id="contact" className="grain relative overflow-hidden py-24 sm:py-36">
      <div className="veil pointer-events-none absolute inset-0" />
      <motion.div
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="bg-primary/20 pointer-events-none absolute top-1/4 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[150px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="text-primary/80 text-[0.62rem] tracking-[0.4em] uppercase">
            05 — Contact
          </span>
        </Reveal>

        <h2 className="font-display mx-auto mt-6 max-w-4xl text-[2.3rem] leading-[0.94] font-extrabold tracking-[-0.03em] sm:text-7xl lg:text-8xl">
          <RevealWords text="READY FOR A" />{" "}
          <RevealWords text="BETTER ROOF?" delay={0.15} ember />
        </h2>

        <Reveal delay={0.25}>
          <p className="text-muted-foreground mx-auto mt-7 max-w-lg text-sm leading-relaxed sm:text-base">
            Tell us about your roof and we&apos;ll come back with a straight answer and a free
            quote.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-11 flex flex-wrap justify-center gap-3">
            <GlowButton size="lg" href={site.phoneHref}>
              Call {site.phone}
            </GlowButton>
            <GlowButton size="lg" variant="ghost" href={site.emailHref}>
              Send Email
            </GlowButton>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={0.15 + i * 0.1}>
              <motion.a
                href={d.href}
                target={d.external ? "_blank" : undefined}
                rel={d.external ? "noreferrer" : undefined}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass border-live shimmer group flex h-full flex-col items-center gap-2 rounded-3xl p-7 transition-colors duration-500 hover:bg-white/[0.04]"
              >
                <span className="text-muted-foreground text-[0.58rem] tracking-[0.32em] uppercase">
                  {d.label}
                </span>
                <span className="group-hover:text-ember text-sm font-semibold transition-colors duration-500 sm:text-base">
                  {d.value}
                </span>
                <span className="text-primary/70 mt-1 text-xs transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

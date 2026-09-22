import { motion } from "motion/react";
import { sections, site } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="grain border-border/70 relative overflow-hidden border-t pt-20 pb-10">
      <div className="veil pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Reveal>
              <h3 className="font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
                Osborn Roofing
                <br />
                <span className="text-ember">WA Pty Ltd</span>
              </h3>
            </Reveal>
            <p className="text-muted-foreground mt-5 text-[0.65rem] tracking-[0.3em] uppercase">
              {site.tagline}
            </p>
            <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
              {site.description}
            </p>
          </div>

          <div>
            <span className="text-muted-foreground text-[0.58rem] tracking-[0.32em] uppercase">
              Navigate
            </span>
            <ul className="mt-5 space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() =>
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="link-underline hover:text-primary text-sm transition-colors duration-300"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-muted-foreground text-[0.58rem] tracking-[0.32em] uppercase">
              Get in touch
            </span>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={site.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline hover:text-primary transition-colors duration-300"
                >
                  {site.address}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="link-underline hover:text-primary transition-colors duration-300"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="link-underline hover:text-primary transition-colors duration-300 break-all"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <motion.a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="glass border-live shimmer hover:text-primary mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-500"
            >
              Facebook <span>↗</span>
            </motion.a>
          </div>
        </div>

        <div className="border-border/70 mt-16 flex flex-wrap items-center justify-between gap-5 border-t pt-7">
          <p className="text-muted-foreground text-[0.62rem] tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} {site.name}
          </p>
          <motion.button
            onClick={toTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            aria-label="Back to top"
            className="glass border-live group hover:bg-ember hover:text-primary-foreground flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-500"
          >
            Back to top
            <span className="transition-transform duration-500 group-hover:-translate-y-0.5">↑</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

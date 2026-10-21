import type { Metadata } from "next";
import { PageHero, R, Arrow } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Alphapick: info@alphapick.in for general enquiries, careers@alphapick.in for applications.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  const items = [
    { k: "General", e: SITE.emailGeneral, b: "For general enquiries about the firm." },
    { k: "Applications", e: SITE.emailCareers, b: "Send your resume and a short note about your trading approach." },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Write to us. <em className="text-gold">We read everything.</em></>} lead="The fastest way to reach Alphapick is by email." />
      <section className="wrap py-24 md:py-32" aria-label="Email addresses">
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <R key={it.e} d={i * 100}>
              <a href={`mailto:${it.e}`} className="card group relative block h-full overflow-hidden p-8 transition-colors hover:border-gold/60 md:p-12">
                <div aria-hidden className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/0 blur-3xl transition-colors duration-700 group-hover:bg-gold/15" />
                <p className="eyebrow relative">{it.k}</p>
                <p className="relative mt-10 font-display text-[1.9rem] break-all text-ivory transition-colors group-hover:text-gold-soft sm:text-4xl md:text-[2.6rem]">{it.e}</p>
                <p className="relative mt-5 text-mute">{it.b}</p>
                <span className="relative mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-gold">Send email <Arrow className="transition-transform group-hover:translate-x-1" /></span>
              </a>
            </R>
          ))}
        </div>
        <R d={200}><p className="mt-12 max-w-2xl text-sm text-faint">Alphapick trades only its own capital and does not take on clients or outside capital. We are unable to respond to requests for investment recommendations.</p></R>
      </section>
    </>
  );
}

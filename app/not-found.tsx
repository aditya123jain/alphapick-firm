import Link from "next/link";
import { Arrow } from "@/components/ui";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-center pt-32 pb-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-6xl md:text-8xl">This page is <em className="text-gold">off the tape.</em></h1>
      <p className="mt-8 max-w-lg text-lg text-mute">The page you are looking for does not exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-gold">Back to home <Arrow /></Link>
        <Link href="/careers/" className="btn btn-ghost">Careers</Link>
      </div>
    </section>
  );
}

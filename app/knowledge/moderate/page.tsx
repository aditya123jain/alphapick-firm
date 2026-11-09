import type { Metadata } from "next";
import ModerationPanel from "@/components/ModerationPanel";

export const metadata: Metadata = {
  title: "Moderate comments",
  robots: { index: false, follow: false, nocache: true },
};

export default function Moderate() {
  return (
    <section className="wrap pt-32 pb-24 md:pt-40">
      <p className="eyebrow">Knowledge</p>
      <h1 className="mt-4 text-4xl md:text-6xl">Moderate comments</h1>
      <p className="mt-4 max-w-2xl text-mute">
        Enter the admin password to review comments. New comments are checked automatically: clean ones go live, anything with links, contact details, sales pitches or rough language waits here as Pending, and clear spam or abuse is rejected. The password stays in this browser tab only (session storage) and is sent only to the comments service.
      </p>
      <ModerationPanel />
    </section>
  );
}

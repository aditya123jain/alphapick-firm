import type { ReactNode } from "react";

export type Col = { key: string; label: string; align?: "left" | "right" | "center"; className?: string };

export function StudyTable({
  caption,
  columns,
  rows,
  rowKey,
}: {
  caption?: string;
  columns: Col[];
  rows: Record<string, ReactNode>[];
  rowKey: (row: Record<string, ReactNode>, i: number) => string;
}) {
  return (
    <div className="study-table-wrap my-8">
      <table className="study-table">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={alignClass(c.align) + (c.className ? ` ${c.className}` : "")}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)}>
              {columns.map((c, ci) => {
                const Tag = ci === 0 ? "th" : "td";
                return (
                  <Tag
                    key={c.key}
                    {...(ci === 0 ? { scope: "row" as const } : {})}
                    className={alignClass(c.align) + (c.className ? ` ${c.className}` : "")}
                  >
                    {row[c.key]}
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function alignClass(a?: "left" | "right" | "center") {
  if (a === "right") return "text-right";
  if (a === "center") return "text-center";
  return "text-left";
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="my-10 rounded-2xl border border-gold/35 bg-gold/5 px-6 py-5 text-sm leading-relaxed text-ivory md:px-8 md:text-base">
      {children}
    </aside>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-line bg-char/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={1365} height={840} className="h-auto w-full bg-ivory" loading="lazy" />
      <figcaption className="border-t border-line px-5 py-4 text-sm text-mute md:px-7">{caption}</figcaption>
    </figure>
  );
}

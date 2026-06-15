import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children,
  muted = false
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-panel" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {(eyebrow || title) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-bold leading-tight text-navy md:text-5xl">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

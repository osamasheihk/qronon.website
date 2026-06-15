import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-wide text-green">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        <div className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{children}</div>
      </div>
    </section>
  );
}

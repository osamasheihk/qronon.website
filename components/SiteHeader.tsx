"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link href="/" aria-label="Qronon home" className="shrink-0">
          <img src="/qronon-transparent.png" alt="Qronon" className="h-10 w-auto max-w-[170px]" />
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line md:hidden"
          aria-label="Toggle navigation"
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="grid gap-1.5">
            <span className="block h-0.5 w-5 bg-navy" />
            <span className="block h-0.5 w-5 bg-navy" />
            <span className="block h-0.5 w-5 bg-navy" />
          </span>
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`${isOpen ? "flex" : "hidden"} absolute left-5 right-5 top-[76px] flex-col gap-2 rounded-lg border border-line bg-white p-4 shadow-soft md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition md:px-0 ${
                  active ? "text-navy" : "text-slate-600 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

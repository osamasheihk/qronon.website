import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-white text-navy hover:bg-green/20",
  secondary: "border border-white/30 text-white hover:border-white hover:bg-white/10",
  dark: "bg-navy text-white hover:bg-ink"
};

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}

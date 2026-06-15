import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>&copy; {new Date().getFullYear()} Qronon. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/technology" className="hover:text-navy">Technology</Link>
          <Link href="/validation" className="hover:text-navy">Validation</Link>
          <Link href="/contact" className="hover:text-navy">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

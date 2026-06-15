import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Qronon about pilots, partnerships, investor materials, research collaborations or careers."
};

const intents = ["Pilot", "Partnership", "Investor", "Research", "Careers"];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Route your request to the right conversation.">
        <p>
          Use the form for pilots, validation context, partnerships, investment materials, research
          collaborations or careers.
        </p>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-lg bg-navy p-8 text-white">
            <h2 className="text-2xl font-bold">Professional routing</h2>
            <div className="mt-6 space-y-4 leading-7 text-slate-200">
              <p><strong className="text-white">General:</strong> info@qronon.ai</p>
            </div>
          </aside>

          <form className="rounded-lg border border-line bg-white p-6 shadow-sm" action="https://formspree.io/f/mrbrwbnj" method="POST">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-navy">
                Name *
                <input className="rounded-md border border-line px-4 py-3" name="name" autoComplete="name" required />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy">
                Email *
                <input className="rounded-md border border-line px-4 py-3" type="email" name="email" autoComplete="email" required />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy">
                Organisation *
                <input className="rounded-md border border-line px-4 py-3" name="organisation" autoComplete="organization" required />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy">
                Role
                <input className="rounded-md border border-line px-4 py-3" name="role" autoComplete="organization-title" />
              </label>
            </div>

            <label className="mt-5 grid gap-2 text-sm font-semibold text-navy">
              Contact intent *
              <select className="rounded-md border border-line px-4 py-3" name="intent" required defaultValue="">
                <option value="" disabled>Select one</option>
                {intents.map((intent) => <option key={intent} value={intent}>{intent}</option>)}
              </select>
            </label>

            <label className="mt-5 grid gap-2 text-sm font-semibold text-navy">
              Use case or collaboration details
              <input className="rounded-md border border-line px-4 py-3" name="use_case" placeholder="Insurance, energy, public-sector validation, research..." />
            </label>

            <label className="mt-5 grid gap-2 text-sm font-semibold text-navy">
              Message *
              <textarea className="min-h-36 rounded-md border border-line px-4 py-3" name="message" required />
            </label>

            <label className="mt-5 flex gap-3 text-sm leading-6 text-slate-700">
              <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 rounded border-line" />
              I consent to Qronon using this information to respond to my enquiry.
            </label>

            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <button className="mt-6 inline-flex min-h-12 rounded-md bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-ink" type="submit">
              Submit request
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}

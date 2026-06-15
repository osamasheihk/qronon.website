import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { publications } from "@/data/site";

export const metadata: Metadata = {
  title: "Research",
  description: "Peer-reviewed quantum-enhanced machine learning publications and their relevance to Qronon's forecasting engine."
};

export default function ResearchPage() {
  return (
    <>
      <PageHero eyebrow="Research" title="Peer-reviewed work translated into product credibility.">
        <p>
          Qronon's research highlights the translation of cutting-edge quantum-enhanced machine learning into practical forecasting solutions.
        </p>
      </PageHero>

      <Section eyebrow="Publications" title="What the papers show, and why it matters.">
        <div className="grid gap-6">
          {publications.map((publication) => (
            <Card key={publication.doi}>
              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <img
                  src={publication.image}
                  alt=""
                  className="aspect-[4/3] w-full rounded-md border border-line object-cover"
                  loading="lazy"
                />
                <div>
                  <h2 className="text-2xl font-bold leading-tight text-navy">{publication.title}</h2>
                  <p className="mt-3 text-slate-600">{publication.venue} · {publication.date}</p>
                  <p className="mt-4 leading-7 text-slate-700"><strong className="text-navy">Summary:</strong> {publication.summary}</p>
                  <p className="mt-3 leading-7 text-slate-700"><strong className="text-navy">What this enables:</strong> {publication.enables}</p>
                  <a
                    href={publication.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex font-bold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                  >
                    DOI: {publication.doi}
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { useCases } from "@/data/site";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Commercial use cases for Qronon's forecast-engine layer across insurance, energy, logistics and resilience."
};

export default function UseCasesPage() {
  return (
    <>
      <PageHero eyebrow="Use cases" title="Forecasting products for teams exposed to volatility.">
        <p>
          Qronon replaces the single retrospective disaster story with a multi-sector pilot hub
          focused on measurable operating pain and success metrics.
        </p>
      </PageHero>

      <Section eyebrow="Pilot design" title="Each use case starts with a measurable forecasting task.">
        <div className="grid gap-5 lg:grid-cols-2">
          {useCases.map((useCase) => (
            <Card key={useCase.title}>
              <h3 className="text-2xl font-bold text-navy">{useCase.title}</h3>
              <div className="mt-5 grid gap-4 text-slate-600">
                <p><strong className="text-navy">Pain point:</strong> {useCase.pain}</p>
                <p><strong className="text-navy">Qronon angle:</strong> {useCase.angle}</p>
                <p><strong className="text-navy">Pilot metric:</strong> {useCase.metric}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">Choose a first wedge. Validate one decision loop.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            The first pilot should define geography, variables, lead-time target, baseline model and operational threshold before claims are marketed.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">Start pilot discussion</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { claimRegister, validationMetrics } from "@/data/site";

export const metadata: Metadata = {
  title: "Validation",
  description: "Evidence status, benchmark categories and validation roadmap for Qronon's forecasting engine."
};

export default function ValidationPage() {
  return (
    <>
      <PageHero eyebrow="Validation" title="A clear evidence hierarchy for every forecasting claim.">
        <p>
          Qronon should be judged on measurable forecast skill, calibration, lead time and compute.
          This page keeps current claims separate from roadmap targets and partner validation.
        </p>
      </PageHero>

      <Section eyebrow="Claim register" title="Claims are labelled before they are marketed.">
        <div className="grid gap-5">
          {claimRegister.map((item) => (
            <Card key={item.claim}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy">{item.claim}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.note}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Benchmark categories" title="What validation should measure." muted>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {validationMetrics.map((metric) => (
            <Card key={metric.metric}>
              <h3 className="text-xl font-bold text-navy">{metric.metric}</h3>
              <p className="mt-3 leading-7 text-slate-600">{metric.purpose}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Limitations" title="Useful forecasts are probabilistic, scoped and continuously tested.">
        <div className="rounded-lg border border-line bg-white p-8 shadow-sm">
          <p className="max-w-4xl text-lg leading-8 text-slate-700">
            Current results should be presented as selected-task evidence unless externally confirmed.
            Qronon does not claim certainty, universal superiority over operational models, or replacement
            of meteorological agencies. The product direction is a complementary engine layer for calibrated
            risk signals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="dark">Request validation memo</ButtonLink>
            <ButtonLink href="/research" variant="dark">Review research basis</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

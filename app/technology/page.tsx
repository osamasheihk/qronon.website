import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { faqs } from "@/data/site";

export const metadata: Metadata = {
  title: "Technology",
  description: "How Qronon's quantum-enhanced forecasting engine turns atmospheric data into probabilistic risk signals."
};

export default function TechnologyPage() {
  const steps = [
    ["Data inputs", "Reanalyses, observations, EO imagery, operational model outputs and domain-specific time series."],
    ["Quantum-enhanced circuit", "A high-dimensional dynamic encoding layer tuned for nonlinear and chaotic systems."],
    ["Calibrated ensembles", "Fast scenario generation with uncertainty tracked as a first-class output."],
    ["Risk signals/API", "Forecast outputs translated into thresholds, probability bands and workflow-ready signals."]
  ];

  return (
    <>
      <PageHero eyebrow="Technology" title="Quantum-enhanced forecasting, explained for applied forecasting.">
        <p>
          Qronon positions QRC as a forecast-engine layer: practical, measurable and designed to
          complement existing operational systems rather than replace them.
        </p>
      </PageHero>

      <Section eyebrow="Architecture" title="From atmospheric data to decision signals.">
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map(([title, body], index) => (
            <Card key={title}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">{index + 1}</span>
              <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Capabilities" title="A model layer for uncertainty, compute efficiency and deployment." muted>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Uncertainty-first", "Probability distributions, scenario bands and reliability checks are treated as product outputs."],
            ["Compute-efficient thesis", "Selected QRC tasks are presented as internally demonstrated until external baselines are confirmed."],
            ["Quantum-ready path", "Runs on classical infrastructure today while preserving a route toward hardware acceleration."]
          ].map(([title, body]) => (
            <Card key={title}>
              <h3 className="text-xl font-bold text-navy">{title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Technical questions buyers and partners ask first.">
        <div className="grid gap-5">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h3 className="text-xl font-bold text-navy">{faq.question}</h3>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { productCards, proofClaims, publications, useCases } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <video
          className="hero-video absolute inset-y-0 right-0 -z-10 hidden h-full w-3/5 object-cover opacity-35 lg:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/climate_resiliance.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_20%,rgba(50,212,223,0.22),transparent_30%),linear-gradient(135deg,#07111f_0%,#0b132b_55%,#14312f_100%)]" />
        <div className="atmospheric-grid mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-wide text-green">Quantum-enhanced weather intelligence</p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              The forecast-engine layer for extreme weather and climate risk.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Qronon builds proprietary quantum-enhanced machine learning models for nowcasting, hindcasting,
              high-resolution and 15-45 day probabilistic forecasts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Start a pilot</ButtonLink>
              <ButtonLink href="/validation" variant="secondary">Request validation context</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-px border-x border-line bg-line px-0 md:grid-cols-4">
          {proofClaims.map((claim) => (
            <div key={claim.label} className="bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{claim.label}</p>
              <p className="mt-3 min-h-14 text-lg font-bold leading-snug text-navy">{claim.value}</p>
              <div className="mt-4"><StatusBadge status={claim.status} /></div>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow="What Qronon does" title="Compute-efficient probabilistic signals for volatile decisions.">
        <div className="grid gap-5 md:grid-cols-3">
          {productCards.map((card) => (
            <Card key={card.title}>
              <h3 className="text-xl font-bold text-navy">{card.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{card.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Use cases" title="Built for teams exposed to weather-linked volatility." muted>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.slice(0, 5).map((useCase) => (
            <Card key={useCase.title} className="bg-white/90">
              <h3 className="text-xl font-bold text-navy">{useCase.title}</h3>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Pilot angle</p>
              <p className="mt-2 leading-7 text-slate-600">{useCase.angle}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/use-cases" variant="dark">Explore use cases</ButtonLink>
        </div>
      </Section>

      <Section eyebrow="Validation" title="Evidence-led by design, with clear claim status.">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg bg-navy p-8 text-white">
            <h3 className="text-2xl font-bold">Built for external validation</h3>
            <p className="mt-4 leading-8 text-slate-200">
              Qronon separates internally demonstrated work, partner validation, roadmap targets and
              published research. The site avoids implying deterministic disaster prediction or
              replacement of operational systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StatusBadge status="Internally demonstrated" />
              <StatusBadge status="Under validation" />
              <StatusBadge status="Roadmap" />
            </div>
          </div>
          <Card>
            <h3 className="text-2xl font-bold text-navy">Research trust asset</h3>
            <p className="mt-4 leading-7 text-slate-600">
              The research page describes our recent publications into commercial relevance of our proprietary quantum-enhanced models: stability,
              finite-sample training and extreme-event forecasting.
            </p>
            <p className="mt-5 font-semibold text-navy">{publications.length} peer-reviewed publications listed</p>
          </Card>
        </div>
      </Section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-green">Pilots and partnerships</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">Forecast earlier. Compute less. Act with confidence.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              Talk to Qronon about pilot design, validation context, research collaborations or investor materials.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Contact Qronon</ButtonLink>
              <ButtonLink href="/research" variant="secondary">Read the research</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

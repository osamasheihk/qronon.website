import { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { mlRole } from './content/jobs.js';
import { applications } from './content/applications.js';
import { research } from './content/research.js';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrbrwbnj';

function Icon({ name, size = 24 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.35, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'arrow') return <svg {...common}><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></svg>;
  if (name === 'menu') return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
  if (name === 'close') return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
  if (name === 'cloud') return <svg {...common}><path d="M6.8 17.3h9.9a3.7 3.7 0 0 0 .7-7.33A5.5 5.5 0 0 0 7 8.65a4.4 4.4 0 0 0-.2 8.65Z" /><path d="M8 20.2h.01M12 20.2h.01M16 20.2h.01" /></svg>;
  if (name === 'globe') return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M3.8 9h16.4M3.8 15h16.4M12 3.5c2.2 2.3 3.25 5.1 3.25 8.5S14.2 18.2 12 20.5C9.8 18.2 8.75 15.4 8.75 12S9.8 5.8 12 3.5Z" /></svg>;
  if (name === 'grid') return <svg {...common}><path d="M12 3v18M3 12h18" /><path d="m7 7 5 5 5-5M7 17l5-5 5 5" /><circle cx="12" cy="12" r="1.3" /></svg>;
  if (name === 'shield') return <svg {...common}><path d="M12 3.1 19 6v5.25c0 4.25-2.4 7.8-7 9.65-4.6-1.85-7-5.4-7-9.65V6l7-2.9Z" /><path d="m8.8 12 2.1 2.1 4.4-4.4" /></svg>;
  if (name === 'atom') return <svg {...common}><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><ellipse cx="12" cy="12" rx="9" ry="3.5" /><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" /></svg>;
  if (name === 'wave') return <svg {...common}><path d="M3 12c2.4 0 2.4-5 4.8-5s2.4 10 4.8 10 2.4-10 4.8-10S19.8 12 22 12" /></svg>;
  if (name === 'cube') return <svg {...common}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /><path d="m8 5.2 8 4.6" /></svg>;
  if (name === 'book') return <svg {...common}><path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h4.2a1 1 0 0 1 1 1v15.7a1 1 0 0 0-1-1H7a2.5 2.5 0 0 0-2.5 2V5.5Z" /><path d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-4.8v15.7a1 1 0 0 1 1-1H17a2.5 2.5 0 0 1 2.5 2V5.5Z" /></svg>;
  if (name === 'chart') return <svg {...common}><path d="M4 19.5V4.5M4 19.5h16" /><path d="m7 15 3.2-3.5 2.8 2 4.4-6" /><path d="M15.5 7.5h1.9v1.9" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function Wordmark() {
  return <img src={`${import.meta.env.BASE_URL}qronon-logo.png`} alt="Qronon" width="1000" height="355" />;
}

function Header({ menuOpen, setMenuOpen }) {
  const links = [
    ['Home', '#/'],
    ['Applications', '#/applications'],
    ['Careers', '#/careers'],
    ['Contact', '#/contact'],
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#/" onClick={() => setMenuOpen(false)} aria-label="Qronon home"><Wordmark /></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </header>
  );
}

const LORENZ = { sigma: 10, rho: 28, beta: 8 / 3, step: 0.006 };
const TRAIL_CAPACITY = 1100;

function createTrail() {
  return { points: new Float32Array(TRAIL_CAPACITY * 3), head: 0, count: 0 };
}

function appendPoint(trail, state) {
  const offset = trail.head * 3;
  trail.points[offset] = state.x;
  trail.points[offset + 1] = state.y;
  trail.points[offset + 2] = state.z;
  trail.head = (trail.head + 1) % TRAIL_CAPACITY;
  trail.count = Math.min(trail.count + 1, TRAIL_CAPACITY);
}

function integrateLorenz(state) {
  const { sigma, rho, beta, step } = LORENZ;
  const halfStep = step / 2;
  const k1x = sigma * (state.y - state.x);
  const k1y = state.x * (rho - state.z) - state.y;
  const k1z = state.x * state.y - beta * state.z;
  const x2 = state.x + k1x * halfStep;
  const y2 = state.y + k1y * halfStep;
  const z2 = state.z + k1z * halfStep;
  const k2x = sigma * (y2 - x2);
  const k2y = x2 * (rho - z2) - y2;
  const k2z = x2 * y2 - beta * z2;
  const x3 = state.x + k2x * halfStep;
  const y3 = state.y + k2y * halfStep;
  const z3 = state.z + k2z * halfStep;
  const k3x = sigma * (y3 - x3);
  const k3y = x3 * (rho - z3) - y3;
  const k3z = x3 * y3 - beta * z3;
  const x4 = state.x + k3x * step;
  const y4 = state.y + k3y * step;
  const z4 = state.z + k3z * step;
  const k4x = sigma * (y4 - x4);
  const k4y = x4 * (rho - z4) - y4;
  const k4z = x4 * y4 - beta * z4;
  state.x += (k1x + 2 * k2x + 2 * k3x + k4x) * step / 6;
  state.y += (k1y + 2 * k2y + 2 * k3y + k4y) * step / 6;
  state.z += (k1z + 2 * k2z + 2 * k3z + k4z) * step / 6;
}

function SystemVisual({ compact = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const primary = { x: 0.1, y: 0, z: 0 };
    const primaryTrail = createTrail();
    let frameId;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const advance = (steps) => {
      for (let index = 0; index < steps; index += 1) {
        integrateLorenz(primary);
        appendPoint(primaryTrail, primary);
      }
    };

    // Move the state onto the attractor before the first painted frame.
    for (let index = 0; index < 1250; index += 1) {
      integrateLorenz(primary);
    }
    advance(TRAIL_CAPACITY);

    const project = (trail, logicalIndex) => {
      const oldest = (trail.head - trail.count + TRAIL_CAPACITY) % TRAIL_CAPACITY;
      const pointIndex = (oldest + logicalIndex) % TRAIL_CAPACITY;
      const offset = pointIndex * 3;
      const x = trail.points[offset];
      const y = trail.points[offset + 1];
      const z = trail.points[offset + 2];
      const scale = Math.min(width / 69, height / 58);
      return {
        x: width * 0.51 + (x * 0.91 + y * 0.12) * scale,
        y: height * 0.91 - z * scale,
      };
    };

    const strokeTrail = (trail, color, lineWidth, startRatio = 0) => {
      const start = Math.max(0, Math.floor(trail.count * startRatio));
      if (trail.count - start < 2) return;
      context.beginPath();
      const first = project(trail, start);
      context.moveTo(first.x, first.y);
      for (let index = start + 1; index < trail.count; index += 1) {
        const point = project(trail, index);
        context.lineTo(point.x, point.y);
      }
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.stroke();
    };

    const paint = () => {
      context.clearRect(0, 0, width, height);
      strokeTrail(primaryTrail, 'rgba(33, 92, 255, .13)', compact ? 0.9 : 1.05);
      strokeTrail(primaryTrail, 'rgba(33, 92, 255, .96)', compact ? 1.25 : 1.7, 0.42);
    };

    const animate = () => {
      if (isVisible && !document.hidden && !reducedMotion.matches) {
        advance(compact ? 2 : 3);
        paint();
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      paint();
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { rootMargin: '100px' });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [compact]);

  return (
    <figure className={compact ? 'system-visual compact' : 'system-visual'} aria-label="A live chaotic-system trajectory">
      <canvas className="chaos-canvas" ref={canvasRef} aria-hidden="true" />
    </figure>
  );
}

function ContourLines({ dark = false }) {
  return <svg className={dark ? 'contours dark' : 'contours'} viewBox="0 0 800 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 67C82 15 109 80 178 48S286 20 342 53 441 84 507 51 616 9 800 57" /><path d="M0 82C83 30 115 95 184 63S291 35 349 68 448 99 514 66 623 24 800 72" /><path d="M0 52C80 0 103 65 172 33S281 5 335 38 435 69 500 36 609-6 800 42" /></svg>;
}

function ButtonLink({ children, href = '#/contact', light = false }) {
  return <a className={light ? 'button light' : 'button'} href={href}>{children}<Icon name="arrow" size={17} /></a>;
}

function Home() {
  return <main>
    <section className="hero section-shell">
      <div className="hero-copy">
        <h1>Predictive intelligence for chaotic systems.</h1>
        <p className="hero-lede">Qronon develops quantum-enhanced machine learning models that turn complex dynamics into earlier, more efficient and uncertainty-aware forecasts.</p>
        <div className="hero-actions"><ButtonLink href="#/applications">Explore applications</ButtonLink><a className="text-link" href="#/careers">View careers <Icon name="arrow" size={17} /></a></div>
        <p className="hero-note">Starting with weather and climate risk.</p>
      </div>
      <SystemVisual />
    </section>

    <section className="signal-strip">
      <div className="section-shell signal-inner">
        <div className="signal-intro"><span className="signal-mark"><ContourLines /></span><span>Built at the intersection of physics, quantum computation and machine learning.</span></div>
        <div className="signal-item"><Icon name="atom" size={27} /><span>From first<br />principles</span></div>
        <div className="signal-item"><Icon name="cube" size={27} /><span>Quantum<br />techniques</span></div>
        <div className="signal-item"><Icon name="wave" size={27} /><span>Deployed for<br />real-world impact</span></div>
      </div>
    </section>

    <section className="platform-intro section-shell section-pad" id="platform">
      <div className="split-heading"><h2>A new layer for<br />the physical world.</h2><p>Qronon’s platform fuses physical understanding with quantum-enhanced machine learning to model chaotic systems with greater skill and efficiency. It delivers earlier signals, calibrated uncertainty and lower compute, so you can act with confidence.</p></div>
      <div className="capability-grid">
        <Capability icon="cloud" title="Earlier signals">Capture weak patterns sooner to extend forecast lead times when it matters most.</Capability>
        <Capability icon="wave" title="Calibrated uncertainty">Quantify what we know—and what we don’t—with reliable probabilistic forecasts.</Capability>
        <Capability icon="cube" title="Efficient inference">Quantum-enhanced models that deliver more accuracy with less compute and energy.</Capability>
      </div>
      <ContourLines />
    </section>

    <ApplicationsTeaser />

    <section className="evidence-band">
      <div className="section-shell evidence-inner">
        <div className="evidence-copy"><h2>Rigorous research.<br />Real-world outcomes.</h2><p>We advance the science and validate in the real world. Our work is published, peer-reviewed and stress-tested across diverse environments.</p><a className="text-link" href="#/contact">Start a conversation <Icon name="arrow" size={17} /></a></div>
        <div className="evidence-items"><Evidence icon="book" title="Peer-reviewed research" /><Evidence icon="chart" title="Transparent methodology" /><Evidence icon="globe" title="Validated across domains" /></div>
      </div>
    </section>

    <DarkCta />
  </main>;
}

function Capability({ icon, title, children }) {
  return <article className="capability"><Icon name={icon} size={38} /><h3>{title}</h3><p>{children}</p></article>;
}

function Evidence({ icon, title }) {
  return <div className="evidence-item"><Icon name={icon} size={34} /><span>{title}</span></div>;
}

function ApplicationsTeaser() {
  return <section className="applications-teaser section-shell" id="applications">
    <div><span className="section-label">Applications</span><h2>Forecasts built around the decision.</h2></div>
    <div className="applications-teaser-copy"><p>Qronon begins where weather-linked uncertainty changes operations. Explore how the same predictive layer can support decisions across weather, climate risk, energy and resilience.</p><ButtonLink href="#/applications">Explore applications</ButtonLink></div>
  </section>;
}

function DarkCta() {
  return <section className="dark-cta"><ContourLines dark /><div className="section-shell dark-cta-inner"><div><h2>Build the next<br />forecast with us.</h2><p>Partner with Qronon to solve the hardest prediction problems for a safer, more resilient future.</p></div><ButtonLink light href="#/contact">Start a conversation</ButtonLink></div></section>;
}

function Platform() {
  return <main className="page-main">
    <PageIntro title="Predictive intelligence for systems that do not sit still." copy="Qronon is building a model layer for complex, nonlinear and chaotic systems—starting with weather and climate risk." />
    <section className="platform-architecture section-shell section-pad"><div className="architecture-heading"><span className="section-label">The platform</span><h2>From dynamics<br />to decisions.</h2><p>Our models are designed to preserve the structure of the system they learn. They turn difficult-to-forecast dynamics into outputs that can be measured, calibrated and integrated into the workflows that rely on them.</p></div><div className="architecture-steps"><ArchitectureStep number="01" title="Physical signals">Observations, reanalyses, earth observation and domain-specific time series.</ArchitectureStep><ArchitectureStep number="02" title="Quantum-enhanced dynamics">A high-dimensional encoding layer tuned for nonlinear and chaotic systems.</ArchitectureStep><ArchitectureStep number="03" title="Calibrated ensembles">Fast scenario generation with uncertainty tracked as a first-class output.</ArchitectureStep><ArchitectureStep number="04" title="Decision signals">Thresholds, probability bands and API-ready outputs for operational teams.</ArchitectureStep></div></section>
    <section className="platform-principles"><div className="section-shell principles-inner"><div><span className="section-label">Why it matters</span><h2>Forecasts should show their uncertainty—and earn their place in the workflow.</h2></div><div className="principle-copy"><p>Qronon is designed to run on classical infrastructure today while preserving a route toward future quantum acceleration.</p><p>It complements existing operational systems with a more efficient, uncertainty-aware layer for decisions where conditions change faster than the plan.</p><a className="text-link" href="#/research">See the evidence <Icon name="arrow" size={17} /></a></div></div></section>
    <DarkCta />
  </main>;
}

function ArchitectureStep({ number, title, children }) {
  return <div className="architecture-step"><span>{number}</span><h3>{title}</h3><p>{children}</p></div>;
}

function PageIntro({ title, copy, visual = false }) {
  return <section className={visual ? 'page-intro with-visual' : 'page-intro'}><div className="section-shell page-intro-inner"><div><span className="section-label">Qronon</span><h1>{title}</h1><p>{copy}</p></div>{visual && <SystemVisual compact />}</div></section>;
}

function Applications() {
  return <main className="page-main"><PageIntro title="Applications for a world that keeps changing." copy="Our first applications focus on weather-linked volatility—where earlier, more efficient and uncertainty-aware forecasts can change a decision." /><section className="application-overview section-shell section-pad"><div className="overview-lede"><span className="section-label">Applications</span><h2>Choose a decision.<br />Build the forecast around it.</h2><p>Qronon starts with one measurable operating problem: a variable, a geography, a lead-time target and an existing baseline. Each application is a route into the same underlying platform.</p></div><div className="application-detail-list">{applications.map((app, index) => <a className="application-detail-row" href={`#/applications/${app.slug}`} key={app.slug}><span className="row-number">0{index + 1}</span><span className="row-icon"><Icon name={app.icon} size={27} /></span><span><h3>{app.title}</h3><p>{app.description}</p></span><Icon name="arrow" size={22} /></a>)}</div></section><DarkCta /></main>;
}

function ApplicationDetail({ app }) {
  return <main className="page-main"><PageIntro title={app.title} copy={app.detail} visual /><section className="application-detail section-shell section-pad"><div className="detail-lede"><span className="section-label">Application pathway</span><h2>Turn uncertainty into a clearer operating decision.</h2><p>{app.description} A Qronon pilot defines the variables, region, forecast horizon and decision threshold before performance is measured.</p><ButtonLink href="#/contact">Discuss a pilot</ButtonLink></div><div className="outcome-list">{app.outcomes.map((outcome, index) => <div className="outcome" key={outcome}><span>0{index + 1}</span><h3>{outcome}</h3><Icon name="arrow" size={19} /></div>)}</div></section><section className="pilot-band"><div className="section-shell pilot-inner"><h2>Start with one decision loop.</h2><p>Define the geography, variables, lead-time target, baseline model and operational threshold. Then validate the forecast where it creates value.</p><a className="text-link" href="#/contact">Start a pilot discussion <Icon name="arrow" size={17} /></a></div></section></main>;
}

function About() {
  return <main className="page-main"><PageIntro title="Building a new layer of intelligence for the physical world." copy="Qronon exists to make difficult predictions more useful—starting with chaotic atmospheric systems and expanding wherever uncertainty shapes the future." /><section className="about-story section-shell section-pad"><div className="about-heading"><span className="section-label">About Qronon</span><h2>Better predictions begin with a better model of the problem.</h2></div><div className="about-copy"><p>Many of the systems that matter most are nonlinear, dynamic and only partially observed. Weather is one of the clearest examples: small changes can propagate into very different outcomes.</p><p>We are developing quantum-enhanced machine learning methods that are designed for these conditions. The goal is not to produce certainty where none exists. It is to make uncertainty more legible, forecasts more efficient and decisions more timely.</p></div></section><section className="vision-band"><div className="section-shell vision-inner"><span className="section-label">The long view</span><h2>From weather intelligence to predictive general intelligence for complex physical systems.</h2><p>Weather and climate risk are our first proving ground. Over time, the same principles can extend to other domains where dynamics, uncertainty and resource constraints collide.</p></div></section><DarkCta /></main>;
}

function Research() {
  return <main className="page-main"><PageIntro title="Research that earns its way into the product." copy="Qronon’s research programme connects quantum-enhanced machine learning with the practical requirements of forecasting chaotic dynamics: stability, finite data, rare events and calibrated uncertainty." /><section className="research-list section-shell section-pad"><div className="research-lede"><span className="section-label">Selected work</span><h2>What the papers show.<br />Why it matters.</h2></div><div className="paper-list">{research.map((paper, index) => <a className="paper-row" href={paper.href} target="_blank" rel="noreferrer" key={paper.title}><span className="paper-number">0{index + 1}</span><span><h3>{paper.title}</h3><p>{paper.meta}</p></span><Icon name="arrow" size={21} /></a>)}</div></section><section className="research-method"><div className="section-shell method-inner"><div><span className="section-label">Validation</span><h2>Clear claim status.<br />Measurable forecast skill.</h2></div><div><p>Current results are presented with evidence status: internally demonstrated, under validation, partner validation or roadmap. We measure forecast skill, calibration, lead time and compute against a stated baseline.</p><a className="text-link" href="#/contact">Request validation context <Icon name="arrow" size={17} /></a></div></div></section></main>;
}

function Careers() {
  return <main className="page-main"><PageIntro title="Work on the hardest prediction problems." copy="We are building a small, research-led team across quantum machine learning, forecasting, earth observation and product engineering." /><section className="careers-section section-shell section-pad"><div className="careers-intro"><span className="section-label">Careers at Qronon</span><h2>Bring depth.<br />Stay curious.</h2><p>Qronon is an early-stage company. We value rigorous thinking, intellectual honesty and the ability to move from a research question to a real-world test.</p></div><div className="role-list"><a className="role-row role-row-link" href={`#/careers/${mlRole.slug}`}><span>01</span><div><h3>{mlRole.title}</h3><p>Weather forecasting, extreme-event prediction and production machine learning.</p></div><Icon name="arrow" size={21} /></a><div className="role-row"><span>02</span><div><h3>Forecasting & earth observation</h3><p>Atmospheric science, numerical weather prediction, satellite data and evaluation.</p></div><a href="mailto:info@qronon.ai"><Icon name="arrow" size={21} /></a></div><div className="role-row"><span>03</span><div><h3>Engineering & product</h3><p>Reliable model infrastructure, APIs and tools that bring forecasts into decisions.</p></div><a href="mailto:info@qronon.ai"><Icon name="arrow" size={21} /></a></div></div></section><section className="careers-footer"><div className="section-shell careers-footer-inner"><h2>Do not see your role?</h2><p>Tell us what you are working on and why it matters.</p><a className="text-link" href="mailto:info@qronon.ai">Introduce yourself <Icon name="arrow" size={17} /></a></div></section></main>;
}

function JobList({ items }) {
  return <ul className="job-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function JobSection({ title, children }) {
  return <section className="job-section"><h2>{title}</h2>{children}</section>;
}

function JobDetail() {
  const applicationEmail = 'mailto:info@qronon.ai?subject=Machine%20Learning%20Engineer%20%2F%20Researcher';

  return <main className="page-main job-page">
    <PageIntro title={mlRole.title} copy={`${mlRole.location} · ${mlRole.employmentType} · Applications reviewed on a rolling basis.`} />
    <section className="job-layout section-shell section-pad">
      <aside className="job-sidebar">
        <span className="section-label">Role details</span>
        <dl className="job-facts"><div><dt>Location</dt><dd>{mlRole.location}</dd></div><div><dt>Employment</dt><dd>{mlRole.employmentType}</dd></div><div><dt>Right to work</dt><dd>{mlRole.rightToWork}</dd></div></dl>
        <p className="job-apply-note">Interested in the role? Contact <a href={applicationEmail}>info@qronon.ai</a>.</p>
      </aside>
      <div className="job-body">
        <JobSection title="About the job">
        <p>We are looking for a Machine Learning Engineer / Researcher to help develop and implement novel machine learning approaches for weather forecasting, extreme-event prediction and energy applications.</p>
        <p>You will work with large, high-dimensional and spatiotemporal datasets, including weather forecasts, reanalysis data, satellite imagery and real-time time-series data. The role spans the full machine learning workflow, from data engineering and model development to rigorous validation, deployment and improvement using evidence from real-world operation.</p>
        <p>As an early technical hire, you will work closely with the founders and wider Qronon team, taking significant ownership of machine learning development. You will run experiments, implement promising methods from the latest research, and help turn new forecasting approaches into reliable systems for real-world weather and energy applications.</p>
        </JobSection>
        <JobSection title="What you’ll work on"><JobList items={mlRole.responsibilities} /></JobSection>
        <JobSection title="About you">
          <p>A PhD in machine learning, applied mathematics, statistics, atmospheric science, physics, computer science or a related field would be valuable, but it is not mandatory. We care more about research ability, technical depth and evidence of excellent work than a particular credential.</p>
          <JobList items={mlRole.qualifications} />
        </JobSection>
        <JobSection title="Beneficial skills"><JobList items={mlRole.beneficial} /></JobSection>
        <JobSection title="Benefits"><JobList items={mlRole.benefits} /></JobSection>
        <JobSection title="About Qronon">
        <p>Qronon is a UK-based deep-tech company developing quantum-enhanced predictive intelligence for complex systems, with an initial focus on weather and energy. Our technology combines advances in machine learning, quantum computing and nonlinear dynamics to build faster, more compute-efficient forecasting systems.</p>
        <p>We are expanding our technical team and you will join at an early stage, working closely with the founders and taking significant ownership over Qronon’s machine learning development. Qronon is supported by innovation funding from the UK Department for Science, Innovation and Technology. You will have the opportunity to shape both the technology and how the team grows as we move from frontier research to real-world deployment.</p>
        </JobSection>
        <section className="job-inclusion"><h2>Bring your perspective.</h2><p>Studies show that applicants from diverse and historically under-represented backgrounds are less likely to apply unless they meet every listed qualification. At Qronon, we are looking for people who are genuinely passionate about developing quantum-enhanced climate solutions, and we actively encourage applicants from all backgrounds. If you believe you have the potential to do well in this role and your values align with our mission, we encourage you to contact us.</p></section>
        <section className="job-apply"><h2>Interested in joining Qronon?</h2><p>We review applications on a rolling basis. Contact us at <a href={applicationEmail}>info@qronon.ai</a>.</p></section>
      </div>
    </section>
  </main>;
}

function Contact() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return <main className="page-main"><PageIntro title="Build the next forecast with us." copy="Talk to Qronon about pilot design, research collaborations, validation context or joining the team." /><section className="contact-section section-shell section-pad"><div className="contact-copy"><span className="section-label">Start a conversation</span><h2>One good question is enough to begin.</h2><p>Tell us what you are trying to predict, what decisions depend on it and where your current system reaches its limits.</p><div className="contact-links"><a href="mailto:info@qronon.ai">info@qronon.ai <Icon name="arrow" size={16} /></a></div></div><form className="contact-form" action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit}><input type="hidden" name="_subject" value="New Qronon website enquiry" /><label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Work email<input type="email" name="email" autoComplete="email" placeholder="you@company.com" required /></label><label>What would you like to discuss?<textarea name="message" rows="5" placeholder="A pilot, research, validation or a role..." required /></label><button className="button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Send enquiry'} <Icon name="arrow" size={17} /></button><div className="form-status" aria-live="polite">{status === 'success' && <p className="form-success">Thanks—your enquiry has been sent. We’ll be in touch.</p>}{status === 'error' && <p className="form-error">Something went wrong. Please try again or email info@qronon.ai.</p>}</div></form></section></main>;
}

function Footer() {
  return <footer className="site-footer"><div className="section-shell footer-inner"><a className="wordmark" href="#/" aria-label="Qronon home"><Wordmark /></a><div className="footer-links"><a href="#/">Home</a><a href="#/applications">Applications</a><a href="#/careers">Careers</a><a href="#/contact">Contact</a></div><span className="copyright">© 2026 Qronon. All rights reserved.</span></div></footer>;
}

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const handleHash = () => { setRoute(window.location.hash || '#/'); setMenuOpen(false); }; window.addEventListener('hashchange', handleHash); return () => window.removeEventListener('hashchange', handleHash); }, []);
  const page = useMemo(() => {
    if (route === '#/' || route === '') return <Home />;
    if (route === '#/platform') return <Platform />;
    if (route === '#/applications') return <Applications />;
    if (route === '#/research') return <Research />;
    if (route === '#/about') return <About />;
    if (route === '#/careers') return <Careers />;
    if (route === `#/careers/${mlRole.slug}`) return <JobDetail />;
    if (route === '#/contact') return <Contact />;
    if (route.startsWith('#/applications/')) { const slug = route.split('/')[2]; const app = applications.find((item) => item.slug === slug) || applications[0]; return <ApplicationDetail app={app} />; }
    return <Home />;
  }, [route]);
  return <><Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />{page}<Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);

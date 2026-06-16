export type ClaimStatus = "Internally demonstrated" | "Under validation" | "Partner validation" | "Roadmap";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/technology", label: "Technology" },
  { href: "/validation", label: "Validation" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" }
];

export const proofClaims: Array<{ label: string; value: string; status: ClaimStatus }> = [
  { label: "Forecast windows", value: "Nowcasting to 15-45 day probabilistic outlooks", status: "Internally demonstrated" },
  { label: "Compute thesis", value: "100X Lower compute on selected forecast tasks", status: "Internally demonstrated" },
  { label: "Resolution target", value: "High-resolution weather and climate-risk signals", status: "Under validation" },
  { label: "Research basis", value: "Peer-reviewed quantum-enhanced machine learning work", status: "Partner validation" }
];

export const productCards = [
  {
    title: "Early warning",
    body: "Transform chaotic atmospheric signals into earlier risk flags for extreme events and volatile operating conditions."
  },
  {
    title: "Decision-ready uncertainty",
    body: "Convert forecast spread into calibrated scenarios, thresholds and probability-aware signals for operational teams."
  },
  {
    title: "Workflow integration",
    body: "Deliver forecasts through APIs and dashboards that fit existing risk, energy, resilience and analytics workflows."
  }
];

export const useCases = [
  {
    title: "Insurance and reinsurance",
    pain: "Weeks 2-6 event risk and portfolio exposure are difficult to monitor with confidence.",
    angle: "Probabilistic extreme-event outlooks and scenario inputs for risk teams.",
    metric: "Improved RPSS/CRPS, earlier event signal and better portfolio monitoring."
  },
  {
    title: "Energy and grids",
    pain: "Demand, renewable generation and grid stress are increasingly weather-driven.",
    angle: "Medium-range probabilistic weather signals for demand and supply planning.",
    metric: "Improved event hit rate and better imbalance or stress-risk forecasts."
  },
  {
    title: "Aviation and logistics",
    pain: "Storms, fog, wind and temperature extremes disrupt routes, assets and schedules.",
    angle: "Earlier regional disruption signals for route and asset planning.",
    metric: "More lead time and clearer planning thresholds for operational decisions."
  },
  {
    title: "Public-sector resilience",
    pain: "Emergency planning needs reliable early signals before short-term alerts arrive.",
    angle: "Scenario-based early warning for floods, storms, heat and cascading risks.",
    metric: "Earlier risk flagging, calibrated uncertainty and practical decision thresholds."
  },
  {
    title: "Climate-risk analytics",
    pain: "Risk platforms need weather-conditioned inputs that update faster than climate models.",
    angle: "Forecast engine and API outputs feeding analytics, dashboards and risk models.",
    metric: "Better downstream risk-score performance and clearer event conditioning."
  }
];

export const validationMetrics = [
  { metric: "RMSE / MAE", purpose: "Point forecast error on selected atmospheric variables." },
  { metric: "CRPS", purpose: "Probabilistic forecast quality across full distributions." },
  { metric: "RPSS", purpose: "Skill score against baseline ensembles and climatology." },
  { metric: "Reliability", purpose: "Calibration of probability bands and event likelihoods." },
  { metric: "Lead time", purpose: "How early useful risk signals appear before operational thresholds." },
  { metric: "Compute hours", purpose: "Training and inference cost compared with stated baselines." }
];

export const claimRegister: Array<{ claim: string; status: ClaimStatus; note: string }> = [
  {
    claim: "Compute-efficient quantum-enhanced ML architecture for selected chaotic forecasting tasks",
    status: "Internally demonstrated",
    note: "Demonstrated on selected tasks, validated by partners."
  },
  {
    claim: "High-resolution weather and climate-risk forecast engine",
    status: "Under validation",
    note: "Demonstrated on selected tasks, with partner validation and external baselines pending."
  },
  {
    claim: "15-45 day probabilistic forecast window",
    status: "Internally demonstrated",
    note: "Core target window as probabilistic measure."
  },
  {
    claim: "Research and institutional validation pathway",
    status: "Partner validation",
    note: "Separate conversations, research links, pre-pilots and commercial customers."
  }
];

export const publications = [
  {
    title: "Quantum-inspired machine learning for efficient and reliable weather forecasting",
    venue: "EGU General Assembly 2026, Vienna, Austria",
    date: "3-8 May 2026 · EGU26-21434",
    doi: "10.5194/egusphere-egu26-21434",
    href: "https://doi.org/10.5194/egusphere-egu26-21434",
    image: "",
    summary: "Presents Qronon's quantum-inspired machine learning direction for efficient and reliable weather forecasting to the EGU research community.",
    enables: "Connects the QRC research programme directly to applied weather forecasting, validation and partner-facing technical discussion."
  },
  {
    title: "Robust quantum reservoir computers for forecasting chaotic dynamics: generalized synchronization and stability",
    venue: "Proceedings of the Royal Society A",
    date: "Published: 29 October 2025",
    doi: "10.1098/rspa.2025.0550",
    href: "https://doi.org/10.1098/rspa.2025.0550",
    image: "/Paper_3.png",
    summary: "Shows how stability and synchronization principles can make QRC systems more reliable for chaotic dynamics.",
    enables: "A stronger foundation for forecast engines that need stable rollouts and usable uncertainty."
  },
  {
    title: "Optimal training of finitely sampled quantum reservoir computers for forecasting of chaotic dynamics",
    venue: "Quantum Machine Intelligence (2025) 7:31",
    date: "Published: 27 February 2025",
    doi: "10.1007/s42484-025-00261-9",
    href: "https://doi.org/10.1007/s42484-025-00261-9",
    image: "/Paper_2.png",
    summary: "Explores training QRC systems when measurements are finite and noisy rather than idealized.",
    enables: "Practical training methods for real-world systems where data and compute budgets are constrained."
  },
  {
    title: "Prediction of chaotic dynamics and extreme events: A recurrence-free quantum reservoir computing approach",
    venue: "Physical Review Research 6, 043082",
    date: "Published: 1 November 2024",
    doi: "10.1103/PhysRevResearch.6.043082",
    href: "https://doi.org/10.1103/PhysRevResearch.6.043082",
    image: "/Paper_1a.png",
    summary: "Demonstrates a QRC approach for chaotic dynamics and rare or extreme events without recurrent feedback loops.",
    enables: "Applied pathways for earlier signals in systems where extremes matter more than average behavior."
  }
];

export const faqs = [
  {
    question: "What does quantum-enhanced mean here?",
    answer: "Qronon uses quantum computing ideas to encode complex temporal dynamics. The first product layer is designed to run on classical infrastructure (CPU/GPU) providing 100x compute efficiency and forecasting advantae today while staying aligned with future quantum acceleration."
  },
  {
    question: "Does Qronon replace operational weather systems?",
    answer: "No. Qronon is positioned as a complementary forecast-engine layer that can augment operational systems with compute-efficient probabilistic risk signals."
  },
  {
    question: "How are claims validated?",
    answer: "Each claim is labelled by evidence status. Internally demonstrated work is separated from partner validation, roadmap targets and externally published research."
  }
];

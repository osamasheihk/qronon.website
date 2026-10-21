const news = [
  {
    slug: 'scaling-quantum-enhanced-predictive-intelligence-weather-nvidia-cuda-q',
    date: '2026-10-21',
    category: 'Research',
    title: 'Scaling Quantum-enhanced Predictive Intelligence for Weather with NVIDIA CUDA-Q',
    sections: [
      {
        paragraphs: [
          'Qronon is using [NVIDIA CUDA-Q](https://developer.nvidia.com/cuda-q) and [cuQuantum](https://developer.nvidia.com/cuquantum-sdk) on Isambard-AI to develop and evaluate a hybrid quantum-classical approach to weather forecasting. The work combines quantum algorithms, simulated on NVIDIA GPUs, with classical machine learning to investigate new ways of modelling complex atmospheric dynamics.',
          'Qronon received two Rapid Access awards through the UK’s AI Research Resource (AIRR), providing a combined allocation of 40,000 GPU hours on Isambard-AI. Built and run by the Bristol Centre for Supercomputing at the University of Bristol, Isambard-AI is powered by [NVIDIA Grace Hopper](https://www.nvidia.com/en-us/data-center/grace-hopper-superchip/) Superchips. The allocations enabled Qronon to develop larger experimental workloads and to assess the computational requirements of its forecasting architecture.',
        ],
      },
      {
        heading: 'The challenge',
        paragraphs: [
          'The research focuses on learning how complex physical systems evolve in time, starting with weather. Qronon is developing quantum-enhanced representations designed for efficient, scalable forecasting, including probabilistic forecasts that capture a range of possible outcomes. Extreme weather is a particular focus: forecasting rare, high-impact events remains an open problem, and these events have outsized consequences for energy systems, infrastructure and insurance.',
          '[CUDA-Q](https://developer.nvidia.com/cuda-q) provides the programming environment for the Qronon’s hybrid quantum-classical workflow, while cuQuantum enables GPU-accelerated quantum simulation. This allows Qronon to develop and scale quantum algorithms on accelerated computing infrastructure today, with a direct path towards execution on suitable physical quantum processors as the hardware matures.',
          '“Weather is a demanding test of any predictive model: accuracy matters, but so do uncertainty, scalability and the speed at which models can be developed and evaluated,” said Osama Ahmed, CEO of Qronon. “Using [NVIDIA CUDA-Q](https://developer.nvidia.com/cuda-toolkit) and cuQuantum on Isambard-AI gives us the infrastructure to test our approach at greater scale and understand where quantum-accelerated computing can contribute to practical forecasting.”',
        ],
      },
      {
        heading: 'Scaling and performance',
        paragraphs: [
          'Qronon is evaluating forecast quality alongside simulation runtime, memory requirements and experimental throughput. Initial experiments use a reduced-order model of atmospheric dynamics to study how the quantum-processing stage scales with forecast workload size on accelerated computing infrastructure.',
          'In an internal benchmark, NVIDIA [CUDA-Q](https://developer.nvidia.com/cuda-q) reduced the runtime of the quantum-processing stage from approximately 29 seconds to 7 seconds at 256 forecast time steps, corresponding to a ~4× speedup relative to a reference quantum simulator. The performance gap increased as the workload scaled, supporting the use of CUDA-Q for larger quantum-enhanced dynamics experiments.',
          'The same hybrid quantum-classical approach has also been extended to global and local weather forecasting. Qronon is applying the architecture across multi-day forecasting tasks, including probabilistic ensembles and multiple atmospheric variables, with a focus on understanding performance across different forecast horizons and weather regimes.',
          'Initial evaluations across multiple locations show positive forecast skill relative to climatology, with improvements of approximately 5–10% across multi-day forecast horizons. Qronon is also testing the approach on extreme-weather conditions, where rare events can have disproportionate consequences for energy systems, infrastructure and insurance.',
          'A representative 10-day global forecast illustrates how the same architecture can be applied at substantially larger spatial scale, moving from reduced-order atmospheric models towards realistic global and local weather prediction workloads.',
        ],
        images: [
          { src: 'news/figure-2.png', alt: 'Runtime comparison between NVIDIA CUDA-Q and a reference quantum simulation', caption: 'Runtime comparison for the quantum-processing stage across forecast time-step workloads.', afterParagraph: 2, size: 'small' },
          { src: 'news/figure-1.png', alt: 'Representative global atmospheric temperature field', caption: 'A representative global atmospheric field used in Qronon’s weather forecasting research.', afterParagraph: 5 },
        ],
      },
      {
        heading: 'A path towards practical quantum forecasting',
        paragraphs: [
          'The work with NVIDIA CUDA-Q and cuQuantum is also unlocking new possibilities for Qronon by identifying which parts of its forecasting architecture are most suitable for future execution on physical quantum processors.',
          'By first developing and benchmarking these workloads in GPU-accelerated simulation, Qronon can pinpoint the critical circuit sizes, computational bottlenecks and hybrid quantum-classical interfaces before moving selected components onto quantum hardware. The aim is to build a practical path from accelerated simulation today to useful quantum-enhanced forecasting applications as hardware capabilities mature, including weather workloads where nonlinear dynamics, uncertainty and extreme events create some of the most demanding computational challenges.',
        ],
      },
      {
        heading: 'About Qronon',
        paragraphs: [
          'Qronon develops predictive models for complex physical systems by combining quantum computing methods with classical machine learning. Starting with weather forecasting, its research focuses on nonlinear dynamics, uncertainty and computational efficiency, with longer-term applications across climate risk, energy and other physical systems. Qronon is backed by research funding from the UK’s Advanced Research + Invention Agency (ARIA) and leading global investors.',
        ],
      },
    ],
  },
];

export default news;

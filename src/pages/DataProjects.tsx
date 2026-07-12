import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const projects = [
  {
    id: "aether",
    title: "Aether: Real-Time Air Quality Grid",
    category: "Big Data / IoT",
    desc: "A globally distributed sensor network tracking particulate matter and meteorological trends in real time. We built a zero-loss ingestion pipeline to consume raw IoT signals and stream them to time-series caches.",
    tech: ["Apache Kafka", "Apache Spark", "InfluxDB", "Grafana"],
    metric: "150K events / sec",
    label: "Ingestion Velocity",
    gradient: "from-blue-600 to-cyan-550",
  },
  {
    id: "helios",
    title: "Helios: Solar Output Forecasting Engine",
    category: "Machine Learning",
    desc: "Predicting photovoltaic power generations 24 hours in advance. By training deep neural nets on historical solar radiance, cloud vectors, and panel heat indices, the engine helps local grids balance power loads.",
    tech: ["PyTorch", "Python", "Docker", "AWS SageMaker"],
    metric: "94.2% precision",
    label: "Forecasting Accuracy",
    gradient: "from-amber-600 to-orange-650",
  },
  {
    id: "veritas",
    title: "Veritas: Immutable Audit Log Ledger",
    category: "Databases & Security",
    desc: "An enterprise auditing platform securing financial transaction logs. It uses cryptographic hashing to chain database records together, ensuring any retrospective alteration is instantly flagged and isolated.",
    tech: ["PostgreSQL", "Node.js", "SHA-256", "Redis"],
    metric: "2.4M logs / day",
    label: "Audit Capacity",
    gradient: "from-emerald-600 to-teal-550",
  },
  {
    id: "chronos",
    title: "Chronos: Low-Latency Arbitrage Pipeline",
    category: "Quantitative Finance",
    desc: "A high-frequency market data routing engine. Chronos aggregates price feeds from multiple crypto exchanges, executes statistical models, and routes transactions under a fraction of a millisecond.",
    tech: ["Scala", "Akka Streams", "Apache Flink", "ClickHouse"],
    metric: "12ms Latency",
    label: "End-to-End Execution",
    gradient: "from-rose-600 to-pink-550",
  },
  {
    id: "biocore",
    title: "BioCore: Distributed Genome Indexer",
    category: "Bioinformatics",
    desc: "A massive parallel processing suite designed to align and index gene sequence variants. It splits raw genome sequences across computational clusters, matching mutations against a global library.",
    tech: ["Rust", "Python", "Elasticsearch", "AWS Batch"],
    metric: "1.2B base pairs",
    label: "Indexed in 4 Minutes",
    gradient: "from-violet-600 to-indigo-550",
  },
  {
    id: "logos",
    title: "Logos: Real-Time Intent Classifier",
    category: "Natural Language Processing",
    desc: "An AI-powered customer support triage pipeline. Logos reads incoming text messages, infers semantic intent across 14 languages, and forwards queries to specialized agent queues dynamically.",
    tech: ["Next.js", "Hugging Face", "FastAPI", "MongoDB"],
    metric: "45ms Inference",
    label: "Average Routing Speed",
    gradient: "from-indigo-600 to-purple-555",
  },
  {
    id: "demeter",
    title: "Demeter: Precision Agritech Grid",
    category: "IoT / Data Science",
    desc: "An automated farm irrigation dashboard. Demeter analyzes local weather data and streams values from thousands of soil humidity sensors, regulating watering gates to maximize water conservation.",
    tech: ["Julia", "Dash.jl", "PostgreSQL", "AWS IoT Core"],
    metric: "4,200 soil probes",
    label: "Active Telemetry Feeds",
    gradient: "from-green-600 to-emerald-650",
  },
  {
    id: "sentinel",
    title: "Sentinel: Cloud Intrusion Detector",
    category: "DevOps & Security",
    desc: "An automated cloud infrastructure log analyzer. Sentinel monitors virtual network routing and API calls in real time, leveraging clustering algorithms to isolate suspicious security profiles.",
    tech: ["Python", "Elasticsearch", "Kibana", "Kubernetes"],
    metric: "1.5s Response",
    label: "Threat Isolation Window",
    gradient: "from-slate-700 to-slate-900",
  },
  {
    id: "atlas",
    title: "Atlas: Spatial Traffic Router",
    category: "GIS & Graph Analytics",
    desc: "A real-time routing service for urban delivery fleets. Atlas maintains a digital map of road links, using graph databases to calculate optimal paths and balance traffic congestion across networks.",
    tech: ["Neo4j", "Java", "React", "OpenStreetMap"],
    metric: "80,000 vehicles",
    label: "Active Route Updates",
    gradient: "from-cyan-600 to-blue-550",
  },
  {
    id: "vesta",
    title: "Vesta: Supply Chain Orchestrator",
    category: "Full-Stack / Operations",
    desc: "A predictive stock management portal. Vesta monitors warehouse inventory changes, correlates them with seasonal demand curves, and automated purchase requests to prevent retail stockouts.",
    tech: ["Next.js", "Express", "Supabase", "PostgreSQL"],
    metric: "48 hours lead",
    label: "Stockout Warning Window",
    gradient: "from-fuchsia-600 to-pink-550",
  },
];

export default function DataProjects() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-tr from-pink-50/50 via-indigo-50/30 to-sky-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-slate-700 dark:text-slate-100 selection:bg-indigo-650/10 selection:text-indigo-900 font-sans">
      <Navbar />
      <main className="flex-1">
        {/* Intro Header Section */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-100/80 dark:border-slate-800/80">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 mb-6 animate-fade-in">
              Data Projects Portfolio
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-300 max-w-3xl leading-relaxed font-light">
              A curated collection of scalable data architectures, predictive algorithms, and full-stack systems engineered to resolve practical operational challenges.
            </p>
          </div>
        </section>

        {/* 10 Immersive Alternating Hero Sections */}
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={project.id}
              className={`py-20 md:py-28 border-b border-slate-100 dark:border-slate-800 ${
                isEven ? "bg-white/40 dark:bg-slate-900/40" : "bg-transparent"
              }`}
            >
              <div className="container max-w-7xl mx-auto px-6 md:px-10">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-7 ${isEven ? "order-1" : "order-1 lg:order-2"}`}>
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest block mb-4">
                      {project.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 mb-6 tracking-tight leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-8">
                      {project.desc}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3.5 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 text-xs font-semibold rounded-full border border-slate-200/50 dark:border-slate-700 shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metric Panel Column */}
                  <div className={`lg:col-span-5 ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
                    <div className="relative group overflow-hidden rounded-3xl p-8 bg-white/75 dark:bg-slate-900/85 backdrop-blur-md shadow-lg shadow-slate-100 dark:shadow-slate-950/50 border border-white/95 dark:border-slate-800 transition-transform duration-500 hover:-translate-y-1">
                      {/* Decorative colored glow grid */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-200 to-pink-200 opacity-30 blur-xl group-hover:scale-110 transition-transform duration-500 rounded-full" />
                      
                      <div className="space-y-6 relative">
                        <div className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[10px] font-bold">
                          Key Outcome metric
                        </div>
                        
                        <div>
                          <div className={`text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                            {project.metric}
                          </div>
                          <div className="text-slate-500 dark:text-slate-300 text-sm mt-2 font-medium">
                            {project.label}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                          <span>Status: Production</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

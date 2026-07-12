import { useState } from "react";
import { useParams } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, ChevronRight, Clock, Star } from "lucide-react";
import { SiPython, SiR, SiScala } from "react-icons/si";
import { Database, BarChart2, Cpu } from "lucide-react";

type Level = "Beginner" | "Intermediate" | "Advanced";

interface Tutorial {
  title: string;
  desc: string;
  topics: string[];
  level: Level;
  duration: string;
  featured?: boolean;
}

interface Language {
  id: string;
  label: string;
  tagline: string;
  color: string;
  gradient: string;
  bg: string;
  textAccent: string;
  Icon: React.ElementType;
  tutorials: Tutorial[];
}

const levelColors: Record<Level, string> = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-rose-50 text-rose-700",
};

const languages: Language[] = [
  {
    id: "r",
    label: "R",
    tagline: "Statistical computing & graphics",
    color: "border-blue-400",
    gradient: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50",
    textAccent: "text-blue-700",
    Icon: SiR,
    tutorials: [
      {
        title: "Getting Started with R and RStudio",
        desc: "Install R and RStudio, understand the IDE layout, run your first scripts, and work with vectors, data frames, and basic R syntax.",
        topics: ["Installation", "RStudio IDE", "Vectors & Lists", "Data Frames", "Basic Plotting"],
        level: "Beginner",
        duration: "45 min",
        featured: true,
      },
      {
        title: "Data Wrangling with the Tidyverse",
        desc: "Master dplyr and tidyr to filter, mutate, group, and reshape data with readable, pipe-based workflows.",
        topics: ["dplyr verbs", "Pipes (%>%)", "tidyr pivoting", "joins", "across()"],
        level: "Beginner",
        duration: "60 min",
      },
      {
        title: "Data Visualization with ggplot2",
        desc: "Learn the grammar of graphics — layers, aesthetics, geoms, themes, and how to produce publication-quality charts.",
        topics: ["aes() mapping", "geom_*", "facet_wrap", "Themes", "Scales & Colors"],
        level: "Intermediate",
        duration: "75 min",
        featured: true,
      },
      {
        title: "Statistical Modeling in R",
        desc: "Build linear, logistic, and mixed-effects models using lm(), glm(), and lme4. Interpret coefficients and check assumptions.",
        topics: ["lm() & glm()", "Model diagnostics", "lme4", "broom", "ANOVA"],
        level: "Intermediate",
        duration: "90 min",
      },
      {
        title: "Time Series Analysis with R",
        desc: "Work with ts objects, forecast with ARIMA, and visualize temporal patterns using the forecast and tsibble packages.",
        topics: ["ts objects", "ACF/PACF", "ARIMA", "forecast pkg", "tsibble"],
        level: "Advanced",
        duration: "90 min",
      },
      {
        title: "R Markdown & Reproducible Reports",
        desc: "Combine code, prose, and output in a single document. Export to HTML, PDF, and Word for stakeholder-ready reporting.",
        topics: ["YAML header", "Code chunks", "Inline code", "Params", "knitr"],
        level: "Intermediate",
        duration: "60 min",
      },
    ],
  },
  {
    id: "python",
    label: "Python",
    tagline: "General-purpose data science & ML",
    color: "border-yellow-400",
    gradient: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-50",
    textAccent: "text-yellow-700",
    Icon: SiPython,
    tutorials: [
      {
        title: "Python for Data Science: The Essentials",
        desc: "Set up a Python environment, understand lists, dicts, and comprehensions, and write clean, idiomatic Python for data work.",
        topics: ["Environments", "Lists & Dicts", "List comprehensions", "Functions", "Modules"],
        level: "Beginner",
        duration: "50 min",
        featured: true,
      },
      {
        title: "Data Analysis with pandas",
        desc: "Load, clean, reshape, and aggregate tabular data using DataFrames, groupby, merge, and vectorized string operations.",
        topics: ["DataFrame basics", "groupby()", "merge()", "apply()", "Datetime handling"],
        level: "Beginner",
        duration: "70 min",
        featured: true,
      },
      {
        title: "NumPy for Numerical Computing",
        desc: "Understand array broadcasting, linear algebra operations, and fast numerical computation with NumPy ndarrays.",
        topics: ["ndarray", "Broadcasting", "Linear algebra", "Random sampling", "Performance"],
        level: "Intermediate",
        duration: "55 min",
      },
      {
        title: "Machine Learning with scikit-learn",
        desc: "Build, evaluate, and tune classification and regression models using scikit-learn's unified estimator API.",
        topics: ["Pipeline API", "Cross-validation", "GridSearchCV", "Feature importance", "Metrics"],
        level: "Intermediate",
        duration: "90 min",
      },
      {
        title: "Statistical Modeling with statsmodels",
        desc: "Run OLS, logistic regression, and time-series models with full statistical output — p-values, confidence intervals, and diagnostics.",
        topics: ["OLS", "Logit/Probit", "ARIMA", "Hypothesis tests", "Summary tables"],
        level: "Advanced",
        duration: "80 min",
      },
      {
        title: "Data Visualization: matplotlib & seaborn",
        desc: "From quick exploratory plots to polished figures — axes control, subplots, styles, and seaborn's statistical chart types.",
        topics: ["Figure/Axes", "Subplots", "Seaborn themes", "Heatmaps", "Pair plots"],
        level: "Beginner",
        duration: "60 min",
      },
    ],
  },
  {
    id: "stata",
    label: "Stata",
    tagline: "Econometrics & causal inference",
    color: "border-red-400",
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    textAccent: "text-red-700",
    Icon: BarChart2,
    tutorials: [
      {
        title: "Stata Fundamentals: Data & Commands",
        desc: "Navigate the Stata interface, import datasets, understand variable types, and execute basic descriptive statistics.",
        topics: ["Data editor", "import/use/save", "describe & codebook", "summarize", "tabulate"],
        level: "Beginner",
        duration: "45 min",
        featured: true,
      },
      {
        title: "Data Cleaning & Management",
        desc: "Reshape, merge, and transform datasets. Handle missing values, create new variables, and document your workflow.",
        topics: ["merge & append", "reshape wide/long", "generate & replace", "Missing values", "Labels"],
        level: "Beginner",
        duration: "60 min",
      },
      {
        title: "Linear Regression & Diagnostics",
        desc: "Estimate OLS models, interpret coefficients, test assumptions, and produce publication-quality regression tables.",
        topics: ["regress", "Heteroskedasticity", "outreg2/estout", "postestimation", "predict"],
        level: "Intermediate",
        duration: "75 min",
        featured: true,
      },
      {
        title: "Panel Data Analysis",
        desc: "Work with longitudinal data using fixed effects, random effects, and first-differencing models with xtset.",
        topics: ["xtset", "xtreg FE/RE", "Hausman test", "xtivreg", "xtabond"],
        level: "Intermediate",
        duration: "80 min",
      },
      {
        title: "Causal Inference Methods",
        desc: "Apply difference-in-differences, instrumental variables, and regression discontinuity designs for causal estimation.",
        topics: ["DiD", "ivreg", "RDD (rdrobust)", "Matching", "Synthetic control"],
        level: "Advanced",
        duration: "100 min",
      },
      {
        title: "Survey Data & Complex Samples",
        desc: "Analyse stratified, clustered survey data with Stata's svy prefix — correcting for complex sample designs.",
        topics: ["svyset", "svy: mean/reg", "Weights", "Subpopulations", "Calibration"],
        level: "Advanced",
        duration: "65 min",
      },
    ],
  },
  {
    id: "sql",
    label: "SQL",
    tagline: "Relational data querying & analytics",
    color: "border-sky-400",
    gradient: "from-sky-500 to-cyan-500",
    bg: "bg-sky-50",
    textAccent: "text-sky-700",
    Icon: Database,
    tutorials: [
      {
        title: "SQL Foundations: SELECT Queries",
        desc: "Write your first queries with SELECT, FROM, WHERE, ORDER BY, and LIMIT. Understand data types and NULL handling.",
        topics: ["SELECT basics", "WHERE filtering", "ORDER BY", "LIMIT/OFFSET", "NULL handling"],
        level: "Beginner",
        duration: "40 min",
        featured: true,
      },
      {
        title: "JOINs and Relational Thinking",
        desc: "Combine data from multiple tables using INNER, LEFT, RIGHT, and FULL joins. Understand foreign keys and relational design.",
        topics: ["INNER JOIN", "LEFT/RIGHT JOIN", "FULL OUTER JOIN", "CROSS JOIN", "Self-join"],
        level: "Beginner",
        duration: "55 min",
      },
      {
        title: "Aggregations & GROUP BY",
        desc: "Summarise data with COUNT, SUM, AVG, MIN, MAX. Master GROUP BY, HAVING, and ROLLUP for analytical queries.",
        topics: ["Aggregate functions", "GROUP BY", "HAVING", "ROLLUP/CUBE", "Distinct counts"],
        level: "Beginner",
        duration: "45 min",
        featured: true,
      },
      {
        title: "Window Functions",
        desc: "Apply ROW_NUMBER, RANK, LAG, LEAD, and running totals with OVER() and PARTITION BY — without collapsing rows.",
        topics: ["OVER()", "PARTITION BY", "ROW_NUMBER", "LAG/LEAD", "Running totals"],
        level: "Intermediate",
        duration: "70 min",
      },
      {
        title: "Common Table Expressions (CTEs)",
        desc: "Structure complex queries with WITH clauses, write recursive CTEs for hierarchical data, and improve readability.",
        topics: ["WITH clause", "Chaining CTEs", "Recursive CTEs", "vs. Subqueries", "Materialisation"],
        level: "Intermediate",
        duration: "60 min",
      },
      {
        title: "Query Optimisation & Indexes",
        desc: "Read EXPLAIN plans, design indexes, avoid common performance pitfalls, and write queries that scale to billions of rows.",
        topics: ["EXPLAIN ANALYZE", "B-tree indexes", "Covering indexes", "Partitioning", "Vacuuming"],
        level: "Advanced",
        duration: "85 min",
      },
    ],
  },
  {
    id: "scala",
    label: "Scala",
    tagline: "Functional programming & Apache Spark",
    color: "border-orange-400",
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    textAccent: "text-orange-700",
    Icon: SiScala,
    tutorials: [
      {
        title: "Scala Basics for Data Engineers",
        desc: "Get productive with Scala's type system, vals and vars, pattern matching, and the functional style that Spark builds on.",
        topics: ["val/var/def", "Case classes", "Pattern matching", "Option/Either", "Immutability"],
        level: "Beginner",
        duration: "60 min",
        featured: true,
      },
      {
        title: "Collections & Functional Operations",
        desc: "Master List, Map, Set, and Seq with map, flatMap, filter, fold, and for-comprehensions for expressive data transformations.",
        topics: ["List/Seq/Map", "map & flatMap", "filter & fold", "For-comprehensions", "Lazy evaluation"],
        level: "Beginner",
        duration: "65 min",
      },
      {
        title: "Apache Spark with Scala",
        desc: "Create SparkSessions, build RDDs and DataFrames, run distributed transformations, and write Spark SQL queries.",
        topics: ["SparkSession", "RDD basics", "DataFrame API", "Spark SQL", "Actions vs transforms"],
        level: "Intermediate",
        duration: "90 min",
        featured: true,
      },
      {
        title: "Spark Performance Tuning",
        desc: "Understand the DAG, control partitioning, broadcast joins, persist data, and read Spark UI metrics to eliminate bottlenecks.",
        topics: ["DAG & stages", "Partitioning", "Broadcast joins", "Persist/Cache", "Spark UI"],
        level: "Advanced",
        duration: "100 min",
      },
      {
        title: "Structured Streaming with Spark",
        desc: "Build real-time pipelines with Structured Streaming — watermarking, windowing, stateful processing, and Kafka integration.",
        topics: ["readStream", "Watermarking", "Window aggregations", "Kafka source", "Output modes"],
        level: "Advanced",
        duration: "90 min",
      },
      {
        title: "Delta Lake & Lakehouse Patterns",
        desc: "Manage ACID transactions, schema evolution, time travel, and data quality constraints on Delta Lake tables.",
        topics: ["Delta tables", "MERGE INTO", "Time travel", "Schema evolution", "OPTIMIZE/ZORDER"],
        level: "Advanced",
        duration: "75 min",
      },
    ],
  },
  {
    id: "julia",
    label: "Julia",
    tagline: "High-performance scientific computing",
    color: "border-purple-400",
    gradient: "from-purple-600 to-violet-600",
    bg: "bg-purple-50",
    textAccent: "text-purple-700",
    Icon: Cpu,
    tutorials: [
      {
        title: "Julia: Fast by Design",
        desc: "Understand Julia's compilation model, type system, and why it achieves C-like speed with Python-like syntax for numerical work.",
        topics: ["REPL basics", "Type system", "Multiple dispatch", "JIT compilation", "Benchmarking"],
        level: "Beginner",
        duration: "50 min",
        featured: true,
      },
      {
        title: "DataFrames.jl for Data Manipulation",
        desc: "Load, filter, group, and reshape tabular data with DataFrames.jl — Julia's equivalent of pandas or dplyr.",
        topics: ["DataFrame()", "select/filter", "groupby & combine", "join()", "CSV.jl"],
        level: "Beginner",
        duration: "65 min",
      },
      {
        title: "Scientific Visualization with Plots.jl",
        desc: "Create high-quality plots using Plots.jl with multiple backends — GR for speed, Plotly for interactivity, and PGFPlots for LaTeX.",
        topics: ["plot()", "Backends", "Subplots", "Themes", "LaTeX labels"],
        level: "Intermediate",
        duration: "60 min",
        featured: true,
      },
      {
        title: "Linear Algebra & Numerical Methods",
        desc: "Leverage Julia's built-in LinearAlgebra, sparse matrices, and iterative solvers for scientific and engineering computation.",
        topics: ["LinearAlgebra", "Sparse matrices", "Eigen decomposition", "LU/QR/SVD", "Krylov methods"],
        level: "Intermediate",
        duration: "80 min",
      },
      {
        title: "Differential Equations with DifferentialEquations.jl",
        desc: "Solve ODEs, SDEs, and PDEs with the most comprehensive differential equations ecosystem available in any language.",
        topics: ["ODEProblem", "Solvers", "Callbacks", "Stiff systems", "SDE/DDE"],
        level: "Advanced",
        duration: "90 min",
      },
      {
        title: "Machine Learning with Flux.jl",
        desc: "Build and train neural networks in pure Julia using Flux — custom layers, automatic differentiation, and GPU acceleration.",
        topics: ["Chain & Dense", "Zygote autodiff", "Training loop", "GPU support", "Custom layers"],
        level: "Advanced",
        duration: "85 min",
      },
    ],
  },
];

export default function Tutorials() {
  const params = useParams<{ lang?: string }>();
  const initLang = languages.find((l) => l.id === params.lang) ?? languages[0];
  const [selected, setSelected] = useState<Language>(initLang);
  const [levelFilter, setLevelFilter] = useState<Level | "All">("All");

  const displayed =
    levelFilter === "All"
      ? selected.tutorials
      : selected.tutorials.filter((t) => t.level === levelFilter);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb] dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-28 pb-16 md:pt-36 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-100/50 to-purple-100/40 blur-3xl" />
          </div>
          <div className="relative container max-w-7xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-4">Tutorials</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">
                Learn by doing.<br />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  Six languages, one place.
                </span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-light">
                Practical, no-fluff tutorials covering R, Python, Stata, SQL, Scala, and Julia —
                from first steps to production-ready patterns.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Language selector */}
        <section className="sticky top-[64px] z-30 bg-[#f8f9fb]/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex overflow-x-auto no-scrollbar gap-1 py-3">
              {languages.map((lang) => {
                const isActive = selected.id === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => { setSelected(lang); setLevelFilter("All"); }}
                    data-testid={`tab-lang-${lang.id}`}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-400 flex-shrink-0 ${
                      isActive
                        ? `bg-gradient-to-r ${lang.gradient} text-white shadow-md`
                        : "text-slate-500 hover:text-slate-800 hover:bg-white"
                    }`}
                  >
                    <lang.Icon className="h-4 w-4" />
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Language intro + level filter */}
        <AnimatePresence mode="wait">
          <motion.section
            key={selected.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="py-12"
          >
            <div className="container max-w-7xl mx-auto px-6 md:px-10">
              {/* Language header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${selected.bg}`}>
                    <selected.Icon className={`h-7 w-7 ${selected.textAccent}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selected.label}</h2>
                    <p className="text-sm text-slate-500">{selected.tagline}</p>
                  </div>
                </div>

                {/* Level filter */}
                <div className="flex gap-2">
                  {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      data-testid={`filter-level-${lvl.toLowerCase()}`}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                        levelFilter === lvl
                          ? lvl === "All"
                            ? "bg-slate-900 text-white"
                            : levelColors[lvl as Level].replace("bg-", "bg-").replace("text-", "text-")
                          : "bg-white text-slate-500 hover:bg-slate-50 shadow-sm"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tutorial cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                <AnimatePresence mode="popLayout">
                  {displayed.map((tut, i) => (
                    <motion.div
                      key={tut.title}
                      layout
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                      className="group flex flex-col rounded-2xl bg-white overflow-hidden cursor-pointer relative"
                      style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px -1px rgba(0,0,0,0.04)" }}
                      whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.13), 0 4px 12px -2px rgba(0,0,0,0.06)", transition: { duration: 0.35 } }}
                      data-testid={`card-tutorial-${i}`}
                    >
                      {/* Colored top bar */}
                      <div className={`h-1 w-full bg-gradient-to-r ${selected.gradient}`} />

                      {tut.featured && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                          <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                          Featured
                        </div>
                      )}

                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${levelColors[tut.level]}`}>
                            {tut.level}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="h-3 w-3" /> {tut.duration}
                          </span>
                        </div>

                        <h3 className={`text-base font-bold text-slate-900 leading-snug mb-3 group-hover:${selected.textAccent} transition-colors duration-300`}>
                          {tut.title}
                        </h3>

                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                          {tut.desc}
                        </p>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {tut.topics.map((topic) => (
                            <span
                              key={topic}
                              className={`px-2.5 py-1 rounded-md text-xs font-medium ${selected.bg} ${selected.textAccent}`}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <BookOpen className="h-3.5 w-3.5" />
                            Hands-on
                          </div>
                          <span className={`inline-flex items-center gap-1 text-sm font-semibold ${selected.textAccent} transition-all duration-300 group-hover:gap-2`}>
                            Start <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {displayed.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                  No {levelFilter} tutorials for {selected.label} yet.
                </div>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

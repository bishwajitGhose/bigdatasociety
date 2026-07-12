import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Search, X } from "lucide-react";

const posts = [
  {
    title: "Mastering ggplot2: Beyond the Defaults",
    excerpt: "How to strip away chart junk and create publication-ready visual narratives using R's premier visualization library.",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    category: "Visualization",
    accent: "from-violet-500 to-purple-500",
    accentBg: "bg-violet-50",
    accentText: "text-violet-700",
  },
  {
    title: "Spark Tuning for Massive Scale",
    excerpt: "A deep dive into partition strategies, avoiding shuffles, and optimizing memory allocation when processing terabytes of data.",
    date: "Sep 05, 2023",
    readTime: "12 min read",
    category: "Data Engineering",
    accent: "from-orange-400 to-amber-500",
    accentBg: "bg-orange-50",
    accentText: "text-orange-700",
  },
  {
    title: "Tableau Best Practices for Executive Dashboards",
    excerpt: "Designing for the C-suite requires restraint. Why less is more when building top-level business intelligence interfaces.",
    date: "Aug 18, 2023",
    readTime: "6 min read",
    category: "Visualization",
    accent: "from-violet-500 to-purple-500",
    accentBg: "bg-violet-50",
    accentText: "text-violet-700",
  },
  {
    title: "Quantitative Methods in Python",
    excerpt: "Translating rigorous statistical theory into scalable scikit-learn and statsmodels pipelines for real-world data problems.",
    date: "Jul 22, 2023",
    readTime: "10 min read",
    category: "Analysis",
    accent: "from-sky-500 to-cyan-500",
    accentBg: "bg-sky-50",
    accentText: "text-sky-700",
  },
  {
    title: "Bridging the Gap: React & Data Pipelines",
    excerpt: "Architecting middle-tier APIs that serve complex analytics to front-end dashboards without freezing the browser.",
    date: "Jun 10, 2023",
    readTime: "9 min read",
    category: "Web Dev",
    accent: "from-emerald-500 to-teal-500",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
  },
  {
    title: "Causal Inference with Stata: A Practitioner's Guide",
    excerpt: "When correlation isn't enough — applying instrumental variables, diff-in-diff, and RDD to extract causal signals from observational data.",
    date: "May 03, 2023",
    readTime: "14 min read",
    category: "Analysis",
    accent: "from-sky-500 to-cyan-500",
    accentBg: "bg-sky-50",
    accentText: "text-sky-700",
  },
  {
    title: "dbt + Airflow: The Modern Analytics Stack",
    excerpt: "How to orchestrate transformation jobs end-to-end with reliable lineage, testing, and documentation baked in from the start.",
    date: "Apr 15, 2023",
    readTime: "11 min read",
    category: "Data Engineering",
    accent: "from-orange-400 to-amber-500",
    accentBg: "bg-orange-50",
    accentText: "text-orange-700",
  },
  {
    title: "Color Theory for Data Visualization",
    excerpt: "Sequential vs. diverging vs. categorical palettes — and why the wrong choice silently misleads your audience every single time.",
    date: "Mar 28, 2023",
    readTime: "7 min read",
    category: "Visualization",
    accent: "from-violet-500 to-purple-500",
    accentBg: "bg-violet-50",
    accentText: "text-violet-700",
  },
  {
    title: "TypeScript for Data Scientists",
    excerpt: "Why adding static types to your data-fetching layer eliminates a whole class of production bugs before they reach your stakeholders.",
    date: "Feb 14, 2023",
    readTime: "8 min read",
    category: "Web Dev",
    accent: "from-emerald-500 to-teal-500",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
  },
];

const categories = ["All", "Visualization", "Data Engineering", "Analysis", "Web Dev"];

const categoryColors: Record<string, string> = {
  All: "bg-slate-900 text-white",
  Visualization: "bg-violet-600 text-white",
  "Data Engineering": "bg-orange-500 text-white",
  Analysis: "bg-sky-500 text-white",
  "Web Dev": "bg-emerald-600 text-white",
};

const categoryInactive: Record<string, string> = {
  All: "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
  Visualization: "bg-white text-violet-600 hover:bg-violet-50 dark:bg-slate-900 dark:text-violet-300 dark:hover:bg-slate-800",
  "Data Engineering": "bg-white text-orange-600 hover:bg-orange-50 dark:bg-slate-900 dark:text-orange-300 dark:hover:bg-slate-800",
  Analysis: "bg-white text-sky-600 hover:bg-sky-50 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800",
  "Web Dev": "bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-slate-800",
};

export default function Blog() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = active === "All" ? posts : posts.filter((p) => p.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, query]);

  return (
    <div className="blog-roboto flex min-h-screen flex-col bg-[#f8f9fb] dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-28 pb-20 md:pt-36 md:pb-24 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-100/60 to-indigo-100/40 blur-3xl" />
          </div>
          <div className="relative container max-w-7xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-4">Insights</p>
              <h1 className="blog-charcoal-heading text-4xl md:text-6xl font-bold tracking-tight text-[#1f1f1f] dark:text-[#1f1f1f] mb-5 leading-tight">
                Writing on data,<br />science, and craft.
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-300 max-w-xl leading-relaxed font-light">
                Thoughts on statistical rigor, pipeline architecture, and the art of communicating with data.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sticky filter + search bar */}
        <section className="sticky top-[64px] z-30 bg-[#f8f9fb]/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-4">
          <div className="container max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-400 shadow-sm ${
                    active === cat ? categoryColors[cat] : categoryInactive[cat]
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-2 text-xs opacity-60">
                      {posts.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>

            {/* Search box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full md:w-72"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                data-testid="input-blog-search"
                className="w-full pl-10 pr-9 py-2.5 rounded-full text-sm bg-white dark:bg-slate-900 border-0 shadow-sm text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-400/50 transition-all duration-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  data-testid="button-search-clear"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </motion.div>
          </div>

          {/* Result count */}
          <div className="container max-w-7xl mx-auto px-6 md:px-10 mt-2">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              {query && <> matching <span className="font-medium text-slate-600 dark:text-slate-300">"{query}"</span></>}
            </span>
          </div>
        </section>

        {/* Cards grid */}
        <section className="py-16 md:py-20">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => (
                  <motion.article
                    key={post.title}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 overflow-hidden cursor-pointer"
                    style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px -1px rgba(0,0,0,0.04)" }}
                    whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.14), 0 4px 12px -2px rgba(0,0,0,0.06)", transition: { duration: 0.4 } }}
                    data-testid={`card-blog-${i}`}
                  >
                    <div className={`h-1.5 w-full bg-gradient-to-r ${post.accent}`} />
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${post.accentBg} ${post.accentText} dark:bg-slate-800 dark:text-slate-100`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{post.date}</span>
                      </div>
                      <h2 className="blog-charcoal-heading text-lg font-bold text-[#1f1f1f] dark:text-[#1f1f1f] leading-snug mb-3 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-50 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </div>
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2 ${post.accentText} dark:text-violet-300`}>
                          Read <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-slate-400 dark:text-slate-500 text-lg mb-2">No articles found</p>
                <p className="text-slate-300 dark:text-slate-600 text-sm">
                  Try a different search term or category
                </p>
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="mt-4 text-sm text-violet-500 hover:text-violet-700 font-medium transition-colors"
                    data-testid="button-clear-search-empty"
                  >
                    Clear search
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Database, LineChart, PieChart, Code, Menu, X, Cpu, BarChart2, Moon, Sun, Layout, Server, Cloud, GitBranch, Layers, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiPython, SiR, SiScala } from "react-icons/si";
import { useTheme } from "@/hooks/useTheme";

const bigDataItems = [
  {
    id: "spark",
    label: "Apache Spark",
    desc: "Distributed processing for large-scale analytics",
    Icon: Cpu,
    accent: "text-orange-600 bg-orange-100/70",
    featured: ["Spark SQL", "DataFrames & RDDs", "Structured Streaming"],
  },
  {
    id: "kafka",
    label: "Apache Kafka",
    desc: "Real-time event streaming and messaging",
    Icon: GitBranch,
    accent: "text-blue-600 bg-blue-100/70",
    featured: ["Producers & Consumers", "Topic management", "Stream pipelines"],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    desc: "Flexible document database for modern applications",
    Icon: Database,
    accent: "text-emerald-600 bg-emerald-100/70",
    featured: ["Aggregation pipelines", "BSON documents", "Index optimization"],
  },
  {
    id: "cassandra",
    label: "Apache Cassandra",
    desc: "High-availability distributed NoSQL database",
    Icon: Layers,
    accent: "text-violet-600 bg-violet-100/70",
    featured: ["CQL queries", "Data partitioning", "Replication strategies"],
  },
  {
    id: "hbase",
    label: "Apache HBase",
    desc: "Column-family storage on the Hadoop ecosystem",
    Icon: Server,
    accent: "text-amber-600 bg-amber-100/70",
    featured: ["HBase shell", "Row-key design", "Scan & filter operations"],
  },
  {
    id: "elasticsearch",
    label: "Elasticsearch",
    desc: "Search, indexing, and analytics engine",
    Icon: Search,
    accent: "text-rose-600 bg-rose-100/70",
    featured: ["Full-text search", "Query DSL", "Aggregations & dashboards"],
  },
];

const dataScienceLangs = [
  {
    id: "r",
    label: "R",
    desc: "Statistical computing, ggplot2, and Tidyverse",
    Icon: SiR,
    accent: "text-blue-600 bg-blue-100/70",
    featured: ["ggplot2 visualization", "Statistical modeling", "R Markdown reports"],
  },
  {
    id: "python",
    label: "Python",
    desc: "Data science, ML pipelines, and pandas",
    Icon: SiPython,
    accent: "text-indigo-600 bg-indigo-100/70",
    featured: ["pandas & NumPy", "scikit-learn ML", "statsmodels"],
  },
  {
    id: "stata",
    label: "Stata",
    desc: "Econometrics, panel data, causal inference",
    Icon: BarChart2,
    accent: "text-violet-600 bg-violet-100/70",
    featured: ["Regression & diagnostics", "Panel data (xtset)", "Causal inference"],
  },
  {
    id: "sql",
    label: "SQL",
    desc: "Relational queries, window functions, CTEs",
    Icon: Database,
    accent: "text-teal-600 bg-teal-100/70",
    featured: ["JOINs & aggregations", "Window functions", "Query optimisation"],
  },
  {
    id: "scala",
    label: "Scala",
    desc: "Functional programming and Apache Spark",
    Icon: SiScala,
    accent: "text-sky-600 bg-sky-100/70",
    featured: ["Spark DataFrame API", "Streaming pipelines", "Delta Lake"],
  },
  {
    id: "julia",
    label: "Julia",
    desc: "High-performance scientific computing",
    Icon: Cpu,
    accent: "text-cyan-600 bg-cyan-100/70",
    featured: ["DataFrames.jl", "Plots.jl", "Differential equations"],
  },
];

const webDevItems = [
  {
    id: "frontend",
    label: "Frontend",
    desc: "Modern user interfaces, responsive design, and interactivity",
    Icon: Layout,
    accent: "text-rose-600 bg-rose-100/70",
    featured: ["React & Next.js", "TypeScript development", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    desc: "APIs, authentication, and server-side architecture",
    Icon: Server,
    accent: "text-blue-600 bg-blue-100/70",
    featured: ["REST & GraphQL APIs", "Node.js & Express", "Authentication systems"],
  },
  {
    id: "databases",
    label: "Databases",
    desc: "Data modeling, storage, and optimization",
    Icon: Database,
    accent: "text-amber-600 bg-amber-100/70",
    featured: ["PostgreSQL & MySQL", "Query optimization", "Database design"],
  },
  {
    id: "cloud",
    label: "Cloud",
    desc: "Deployment, scaling, and infrastructure",
    Icon: Cloud,
    accent: "text-sky-600 bg-sky-100/70",
    featured: ["Vercel & Netlify", "AWS & Azure", "Serverless functions"],
  },
  {
    id: "devops",
    label: "DevOps",
    desc: "Automation, monitoring, and delivery pipelines",
    Icon: GitBranch,
    accent: "text-emerald-600 bg-emerald-100/70",
    featured: ["CI/CD workflows", "Docker containers", "Performance monitoring"],
  },
  {
    id: "fullstack",
    label: "Full-Stack",
    desc: "End-to-end application development",
    Icon: Layers,
    accent: "text-violet-600 bg-violet-100/70",
    featured: ["Next.js applications", "Supabase integration", "Production architectures"],
  },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  const navLinkStyle = (path: string) => {
    const active = isActive(path);
    return cn(
      "relative cursor-pointer text-sm font-medium tracking-wide transition-[color,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none flex items-center bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent border-none shadow-none focus:outline-none px-4 py-2 h-9",
      active 
        ? "text-teal-650 text-teal-600 dark:text-teal-400 font-semibold" 
        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
    );
  };

  const megaMenuSurfaceClass =
    "relative w-[720px] overflow-hidden rounded-[1.35rem] border border-white/70 p-6 shadow-[0_22px_60px_-26px_rgba(15,23,42,0.38)] ring-1 ring-slate-200/70 bg-[linear-gradient(140deg,rgba(255,255,255,0.98)_0%,rgba(240,249,255,0.97)_40%,rgba(236,253,245,0.96)_100%)] dark:border-slate-700/60 dark:ring-slate-800/70 dark:bg-[linear-gradient(140deg,rgba(8,12,24,0.94)_0%,rgba(15,23,42,0.93)_55%,rgba(10,33,40,0.9)_100%)]";
  const megaMenuCardClass =
    "group/lang relative flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_12px_32px_-22px_rgba(15,23,42,0.55)] transition-all duration-500 hover:-translate-y-0.5 hover:border-indigo-200/80 hover:bg-white/95 hover:shadow-[0_18px_40px_-24px_rgba(59,130,246,0.45)] dark:border-slate-700/70 dark:bg-slate-900/55 dark:hover:border-sky-500/45 dark:hover:bg-slate-900/75 dark:hover:shadow-[0_18px_45px_-24px_rgba(14,165,233,0.35)]";
  const megaMenuTitleClass =
    "text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/lang:text-indigo-600 dark:group-hover/lang:text-sky-300 transition-colors duration-500";
  const megaMenuDescClass = "text-[10px] text-slate-500/90 dark:text-slate-300/75 leading-tight mt-0.5";
  const megaMenuFeatureClass = "flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300";
  const megaMenuDotClass = "h-1 w-1 rounded-full bg-indigo-400/80 dark:bg-sky-400/70 flex-shrink-0";

  return (
    <header className="sticky top-0 z-[9999] w-full border-b border-teal-100/40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transition-all duration-500 ease-in-out">
      <div className="container flex h-16 items-center justify-between px-6 md:px-10 max-w-7xl mx-auto">

        {/* ── Creative wordmark logo ── */}
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
          <style>{`
            @keyframes dotClockwise {
              0%, 20% {
                background-color: #7c3aed; /* Active premium violet */
              }
              30%, 100% {
                background-color: var(--dot-inactive, #cbd5e1);
              }
            }
            .logo-dot {
              --dot-inactive: #cbd5e1;
              animation: dotClockwise 2s infinite;
            }
            .dark .logo-dot {
              --dot-inactive: #475569;
            }
            .logo-dot-1 { animation-delay: 0s; }
            .logo-dot-2 { animation-delay: 0.5s; }
            .logo-dot-3 { animation-delay: 1s; }
            .logo-dot-4 { animation-delay: 1.5s; }
          `}</style>
          {/* 2×2 dot-grid mark */}
          <div className="grid grid-cols-2 gap-[3px] transition-transform duration-500 group-hover:rotate-90">
            {/* Top-Left */}
            <span className="h-[6px] w-[6px] rounded-full logo-dot logo-dot-1" />
            {/* Top-Right */}
            <span className="h-[6px] w-[6px] rounded-full logo-dot logo-dot-2" />
            {/* Bottom-Left */}
            <span className="h-[6px] w-[6px] rounded-full logo-dot logo-dot-4" />
            {/* Bottom-Right */}
            <span className="h-[6px] w-[6px] rounded-full logo-dot logo-dot-3" />
          </div>
          {/* Split wordmark */}
          <div className="flex items-baseline leading-none select-none">
            <span className="text-[17px] font-extralight tracking-tight text-slate-500 dark:text-slate-450">Big</span><span className="text-[17px] font-black tracking-tight text-teal-650 text-teal-600 dark:text-teal-400">Data</span><span className="text-[17px] font-medium tracking-tight" style={{ color: "#7c3aed" }}>Society</span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>

              <NavigationMenuItem className="group/navlink relative">
                <Link href="/data-projects" data-testid="link-nav-projects">
                  <span className={navLinkStyle("/data-projects")}>
                    Data Projects
                    <span className={cn(
                      "absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transform-gpu origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive("/data-projects") ? "scale-x-100" : "scale-x-0 group-hover/navlink:scale-x-100"
                    )} />
                  </span>
                </Link>
              </NavigationMenuItem>

              {/* Big Data mega menu */}
              <NavigationMenuItem className="group/navlink relative">
                <NavigationMenuTrigger className={cn(navLinkStyle("/big-data"), "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent") + " border-none shadow-none focus:outline-none"}>
                  Big Data
                  <span className={cn(
                    "absolute bottom-0 left-4 right-8 h-[2px] rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transform-gpu origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive("/big-data") ? "scale-x-100" : "scale-x-0 group-hover/navlink:scale-x-100"
                  )} />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={megaMenuSurfaceClass}>
                    <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/20" />
                    <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/15" />
                    <div className="flex items-center justify-between mb-5 px-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500/70 dark:text-indigo-400/60">
                        Big Data Engineering
                      </p>
                      <Link href="/big-data" className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-500">
                        View all →
                      </Link>
                    </div>
                    <ul className="grid grid-cols-3 gap-2">
                      {bigDataItems.map((item) => (
                        <li key={item.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/big-data"
                              className={megaMenuCardClass}
                              data-testid={`link-nav-bigdata-${item.id}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.accent}`}>
                                  <item.Icon className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <div className={megaMenuTitleClass}>
                                    {item.label}
                                  </div>
                                  <p className={megaMenuDescClass}>{item.desc}</p>
                                </div>
                              </div>
                              <ul className="space-y-1.5">
                                {item.featured.map((f) => (
                                  <li key={f} className={megaMenuFeatureClass}>
                                    <span className={megaMenuDotClass} />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Data Science mega menu */}
              <NavigationMenuItem className="group/navlink relative">
                <NavigationMenuTrigger className={cn(navLinkStyle("/data-science"), "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent") + " border-none shadow-none focus:outline-none"}>
                  Data Science
                  <span className={cn(
                    "absolute bottom-0 left-4 right-8 h-[2px] rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transform-gpu origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive("/data-science") ? "scale-x-100" : "scale-x-0 group-hover/navlink:scale-x-100"
                  )} />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={megaMenuSurfaceClass}>
                    <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/20" />
                    <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/15" />
                    <div className="flex items-center justify-between mb-5 px-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500/70 dark:text-indigo-400/60">
                        Languages
                      </p>
                      <Link href="/data-science" className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-500">
                        View all →
                      </Link>
                    </div>
                    <ul className="grid grid-cols-3 gap-2">
                      {dataScienceLangs.map((lang) => (
                        <li key={lang.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/data-science/${lang.id}`}
                              className={megaMenuCardClass}
                              data-testid={`link-nav-tutorial-${lang.id}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${lang.accent}`}>
                                  <lang.Icon className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <div className={megaMenuTitleClass}>
                                    {lang.label}
                                  </div>
                                  <p className={megaMenuDescClass}>{lang.desc}</p>
                                </div>
                              </div>
                              <ul className="space-y-1.5">
                                {lang.featured.map((f) => (
                                  <li key={f} className={megaMenuFeatureClass}>
                                    <span className={megaMenuDotClass} />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Web Dev mega menu */}
              <NavigationMenuItem className="group/navlink relative">
                <NavigationMenuTrigger className={cn(navLinkStyle("/web-dev"), "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent") + " border-none shadow-none focus:outline-none"}>
                  Web Dev
                  <span className={cn(
                    "absolute bottom-0 left-4 right-8 h-[2px] rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transform-gpu origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive("/web-dev") ? "scale-x-100" : "scale-x-0 group-hover/navlink:scale-x-100"
                  )} />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={megaMenuSurfaceClass}>
                    <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/20" />
                    <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/15" />
                    <div className="flex items-center justify-between mb-5 px-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500/70 dark:text-indigo-400/60">
                        Web Development Stack
                      </p>
                      <Link href="/web-dev" className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-500">
                        View all →
                      </Link>
                    </div>
                    <ul className="grid grid-cols-3 gap-2">
                      {webDevItems.map((item) => (
                        <li key={item.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/web-dev"
                              className={megaMenuCardClass}
                              data-testid={`link-nav-webdev-${item.id}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.accent}`}>
                                  <item.Icon className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <div className={megaMenuTitleClass}>
                                    {item.label}
                                  </div>
                                  <p className={megaMenuDescClass}>{item.desc}</p>
                                </div>
                              </div>
                              <ul className="space-y-1.5">
                                {item.featured.map((f) => (
                                  <li key={f} className={megaMenuFeatureClass}>
                                    <span className={megaMenuDotClass} />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="group/navlink relative">
                <Link href="/visualization" data-testid="link-nav-visualization">
                  <span className={navLinkStyle("/visualization")}>
                    Chart Gallery
                    <span className={cn(
                      "absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transform-gpu origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive("/visualization") ? "scale-x-100" : "scale-x-0 group-hover/navlink:scale-x-100"
                    )} />
                  </span>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            data-testid="button-theme-toggle"
            aria-label="Toggle dark mode"
            className="ml-1 h-9 w-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-500"
          >
            {isDark
              ? <Sun className="h-4 w-4 transition-all duration-700 rotate-0" />
              : <Moon className="h-4 w-4 transition-all duration-700" />
            }
          </button>

          {/* CTA button — fully rounded */}
          <Button
            asChild
            size="sm"
            className="ml-1 font-semibold rounded-full px-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all duration-700 shadow-sm shadow-violet-200 dark:shadow-violet-900"
          >
            <Link href="/contact" data-testid="link-nav-contact">Let's Talk</Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="h-9 w-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-500"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 space-y-5">
          <Link href="/data-projects" className="block text-sm font-medium p-2 text-teal-600 dark:text-teal-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Data Projects
          </Link>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-teal-600 px-2 uppercase tracking-widest mb-2">Big Data</p>
            {bigDataItems.map((item) => (
              <Link key={item.id} href="/big-data" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <item.Icon className="h-4 w-4 text-slate-400" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-teal-600 px-2 uppercase tracking-widest mb-2">Data Science</p>
            {dataScienceLangs.map((lang) => (
              <Link key={lang.id} href={`/data-science/${lang.id}`} className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <lang.Icon className="h-4 w-4 text-slate-400" />
                {lang.label}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-teal-600 px-2 uppercase tracking-widest mb-2">Web Dev</p>
            {webDevItems.map((item) => (
              <Link key={item.id} href="/web-dev" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <item.Icon className="h-4 w-4 text-slate-400" />
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/visualization" className="block text-sm font-medium p-2 hover:bg-slate-55 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Chart Gallery
          </Link>
          <Link href="/contact" className="block text-sm font-medium p-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-center font-semibold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Let's Talk</Link>
        </div>
      )}
    </header>
  );
}

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Database, Activity, ShieldAlert, Cpu, HeartHandshake, CloudLightning, Leaf, Shield, User } from "lucide-react";
import { getBlogPosts } from "@/lib/content";

const realLifeApps = [
  { title: "Healthcare", desc: "Predicting disease outbreaks, spotting patient risk earlier, and helping hospitals plan for demand before it hits.", Icon: Activity },
  { title: "Climate Change", desc: "Tracking emissions, modeling rising temperatures, and helping researchers see climate patterns years before they're obvious.", Icon: CloudLightning },
  { title: "Agriculture", desc: "Predicting crop yields, detecting drought risk early, and helping farmers make better planting decisions with satellite and weather data.", Icon: Leaf },
  { title: "Food Security", desc: "Forecasting shortages before they happen and helping organizations get food where it is needed most.", Icon: HeartHandshake },
  { title: "Finance", desc: "Catching fraud in real time, assessing credit risk fairly, and powering the algorithms behind everyday banking.", Icon: Shield },
  { title: "Education", desc: "Spotting which students are struggling early, personalizing learning, and helping schools use resources better.", Icon: User },
  { title: "Social Media", desc: "Understanding public sentiment, tracking misinformation, and studying how information (and misinformation) spreads.", Icon: Database },
  { title: "Transportation", desc: "Optimizing delivery routes, predicting traffic, and powering the ride-share apps we all use without thinking twice.", Icon: Cpu },
  { title: "Smart Cities", desc: "Managing energy grids, reducing waste, and making public services more responsive to what people actually need.", Icon: MapPin },
  { title: "Public Health", desc: "Tracking disease spread, planning vaccine distribution, and identifying at-risk communities before a crisis hits.", Icon: ShieldAlert },
];

export default function Home() {
  // Load latest 3 blog articles from markdown
  const latestPosts = getBlogPosts().slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-700 selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* ── SECTION 1: HERO / PROFILE ── */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32 border-b border-teal-100 bg-gradient-to-br from-yellow-100/40 via-teal-50/50 to-cyan-100/40">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.4))]" />
          <div className="container max-w-7xl mx-auto px-6 md:px-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left text column */}
              <div className="lg:col-span-8 space-y-6">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                  Hi, I'm Bishwajit 👋
                </h1>
                <p className="text-xl md:text-2xl text-teal-600 font-medium tracking-tight">
                  Big Data · Data Science · Web Development
                </p>
                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light -mt-2">
                  I turn data into decisions, and decisions into products.
                </p>
                <div className="space-y-4 text-base md:text-lg text-slate-650 leading-relaxed font-light max-w-3xl">
                  <p>
                    I build things with data and code. From wrangling massive and messy datasets, to extracting insights that actually matter, to designing web apps people enjoy using. I connect the dots between raw information and real, working products.
                  </p>
                  <p>
                    Big data, data science, web development: different tools, same goal — solving real-life problems using the power of data, and presenting the results in a clear, elegant, and accessible manner.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="h-12 px-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all shadow-lg shadow-teal-100">
                    <Link href="/data-projects">View My Projects</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full border-slate-200 bg-white/40 text-slate-700 hover:text-teal-600 hover:bg-white hover:border-teal-200 transition-all">
                    <Link href="/contact">Let's Talk</Link>
                  </Button>
                </div>
              </div>

              {/* Right Profile Photo Column */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl bg-transparent">
                  <img
                    src="/images/headshot.jpg"
                    alt="Bishwajit Profile Photo"
                    className="w-full h-full object-cover rounded-full filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: SKILLS SUMMARY / TECHNOLOGIES I USE ── */}
        <section className="relative overflow-hidden py-24 border-b border-teal-100 bg-gradient-to-tr from-teal-100/30 via-yellow-50/20 to-emerald-100/30">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 relative flex flex-col justify-start">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/60 via-cyan-200/45 to-transparent blur-3xl" />
                <div className="relative z-10 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Stack</span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-2 leading-tight">
                      What I love working with
                    </h2>
                  </div>
                  
                  <div className="pt-6 border-t border-teal-200/50">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Tools &amp; Technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "R", "SQL", "Apache Spark", "Apache Kafka", "MongoDB", "Elasticsearch", "ggplot2", "Power BI", "React", "Next.js", "Node.js", "PostgreSQL", "Git & GitHub"].map((tool) => (
                        <span key={tool} className="px-3.5 py-1.5 bg-white/70 text-slate-650 hover:text-teal-700 text-xs font-semibold rounded-full border border-teal-100/50 transition-colors shadow-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6 text-slate-600 font-light leading-relaxed">
                <p>
                  I work mostly with <strong className="font-semibold text-slate-900">Python, R, and SQL</strong> to clean, explore, and make sense of messy real-world data. I'm learning the Big Data side of things — tools like <strong className="font-semibold text-slate-900">Apache Spark, Kafka, and MongoDB</strong> — because I want to understand how data works at scale, not just in a spreadsheet. On the visualization side, I use <strong className="font-semibold text-slate-900">ggplot2, Matplotlib, and Power BI</strong> to turn numbers into something people can actually understand at a glance.
                </p>
                <p>
                  I'm also picking up web development skills (<strong className="font-semibold text-slate-900">React, Next.js, Node.js</strong>) because I want to be able to build and host my own dashboards and tools, not just hand off a Jupyter notebook and hope for the best.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHY BIG DATA IS THE FUTURE ── */}
        <section className="relative overflow-hidden py-24 border-b border-teal-100 bg-gradient-to-r from-yellow-100/35 via-emerald-50/20 to-cyan-100/35">
          <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative min-h-[240px] flex items-center z-10">
                <div className="w-full">
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest block mb-4">Philosophy</span>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    Why I think Big Data actually matters
                  </h2>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4 text-slate-600 font-light leading-relaxed text-base md:text-lg">
                <p>
                  We create more data in a single day now than existed in all of human history before the internet. That's not just a fun fact to drop at a dinner party, but a massive opportunity, and a massive responsibility too. Whoever figures out how to actually use that data well is going to solve problems the rest of us are still stuck on.
                </p>
                <p>
                  Big Data stopped being a tech-company buzzword a while ago. It's how clinicians catch diseases earlier. How farmers know exactly when to plant. How cities untangle their traffic. How we might actually get ahead of the next pandemic instead of scrambling to react once it's already here.
                </p>
                <p>
                  I want to be part of that. Even if it's just in some small way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: MY PASSION FOR BIG DATA ── */}
        <section className="relative overflow-hidden py-24 border-b border-teal-100 bg-gradient-to-br from-teal-50/40 via-yellow-105 via-yellow-100/25 to-cyan-50/40">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative min-h-[260px] flex items-center">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-blue-200/55 via-cyan-100/40 to-transparent blur-3xl" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Drive</span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-2 leading-tight">
                    Why I got into this in the first place
                  </h2>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6 text-slate-600 font-light leading-relaxed text-base md:text-lg">
                <p>
                  Honestly? I got hooked the first time I pulled a messy public health dataset, cleaned it up, and saw a pattern nobody had pointed out to me — it just showed up in the numbers. That feeling of "oh wait, THAT'S what's actually happening" is addictive.
                </p>
                <p>
                  I care a lot about using data for things that matter — health, food security, climate, education — not just ad clicks and sales funnels (though I get why those matter too). Most of my personal projects lean toward real-world, real-impact problems, especially ones affecting developing countries, because that's where I think good data work can genuinely change outcomes for people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: WHERE BIG DATA SHOWS UP IN REAL LIFE ── */}
        <section className="py-24 bg-gradient-to-tr from-cyan-100/30 via-emerald-100/25 to-yellow-100/30">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-14 text-center lg:text-left">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Impact</span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">
                Big Data is Everywhere
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {realLifeApps.map((app, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/95 shadow-md shadow-slate-100/40 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100/50 flex items-center justify-center text-teal-650 text-teal-600">
                      <app.Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{app.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{app.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: FEATURED PROJECTS ── */}
        <div 
          className="py-24 bg-fixed bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1774209989331-aea1148b6018?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
        >
          <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/20 backdrop-blur-[2px]" />
          <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Portfolio</span>
                <h2 className="text-3xl font-black text-slate-900 mt-2">Some of the projects I'm proud of</h2>
              </div>
              <Button asChild variant="link" className="text-teal-600 hover:text-teal-800 font-bold self-start p-0">
                <Link href="/data-projects">View All Projects <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Predicting Child Mortality Using Ghana DHS Data",
                  desc: "A machine learning model built on real health survey data to identify risk factors and predict child mortality outcomes.",
                  tech: ["Python", "Machine Learning", "Scikit-Learn"]
                },
                {
                  title: "Global Food Security Forecasting",
                  desc: "Using World Bank data to forecast food insecurity trends across regions and flag areas of concern.",
                  tech: ["R", "Time Series", "ggplot2"]
                },
                {
                  title: "Climate Change Sentiment Analysis from YouTube Comments",
                  desc: "Scraped and analyzed thousands of YouTube comments to understand how public opinion on climate change is shifting.",
                  tech: ["Python", "FastAPI", "Transformers"]
                }
              ].map((proj, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-white/95 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-100/40 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300">{proj.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-full border border-slate-200/40">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <Link href="/data-projects" className="inline-flex items-center text-xs font-bold text-teal-600 hover:text-teal-800">
                      View Project <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 7: LATEST FROM THE BLOG ── */}
        <section className="py-24 border-b border-teal-100 bg-gradient-to-r from-teal-100/35 via-yellow-100/25 to-emerald-100/35">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Writing</span>
                <h2 className="text-3xl font-black text-slate-900 mt-2">What I've been writing about lately</h2>
              </div>
              <Button asChild variant="link" className="text-teal-600 hover:text-teal-800 font-bold self-start p-0">
                <Link href="/blog">Read All Articles <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>

            {latestPosts.length === 0 ? (
              <div className="text-center py-16 bg-white/60 backdrop-blur-md rounded-3xl border border-slate-200">
                <p className="text-slate-500 font-light">No blog posts found. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestPosts.map((post, idx) => (
                  <Link key={idx} href={`/blog/${post.slug}`} className="block h-full">
                    <article className="group flex flex-col justify-between rounded-3xl bg-white/70 backdrop-blur-md hover:bg-white hover:-translate-y-1 hover:shadow-xl border border-white/95 transition-all duration-300 overflow-hidden h-full">
                      <div>
                        <div className="aspect-video w-full overflow-hidden relative">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                            <span className="text-teal-600 uppercase tracking-wide">{post.category}</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">{post.title}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-3">{post.desc}</p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

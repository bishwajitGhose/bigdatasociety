import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search } from "lucide-react";
import { Link } from "wouter";
import { getBlogPosts } from "@/lib/content";

const categories = ["All", "Apache Spark", "Apache Kafka", "MongoDB", "Apache Cassandra", "Apache HBase", "Elasticsearch"];

export default function BigData() {
  const initialCategory = (() => {
    if (typeof window === "undefined") return "All";
    const categoryParam = new URLSearchParams(window.location.search).get("category");
    return categoryParam && categories.includes(categoryParam) ? categoryParam : "All";
  })();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Load from Markdown
  const mdPosts = getBlogPosts().filter((post) =>
    categories.includes(post.category)
  );

  const filteredPosts = mdPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-700 selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />
      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-teal-100 bg-gradient-to-br from-yellow-100/40 via-teal-50/50 to-cyan-100/40">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.4))]" />
          <div className="container max-w-7xl mx-auto px-4 md:px-8 relative">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 mb-6">
              Understanding Scale
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight">
              Big Data: The Silent Footprints of Modern Society
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                Big data is simply the digital footprints of our collective lives. Every search we run, every song we stream, and every package we order leaves a tiny digital crumb. When we gather trillions of these crumbs together, they cease to be noise and become a map of human behavior.
              </p>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                It's the hidden engine optimizing how cities breathe, predicting disease outbreaks before they spread, and ensuring food gets distributed efficiently. Beyond the servers and code, big data is about understanding ourselves at a scale we never could before, using history to build a smarter, more cooperative tomorrow.
              </p>
            </div>
          </div>
        </section>

        {/* ── Blog Section ── */}
        <section className="py-24 bg-gradient-to-tr from-teal-100/30 via-yellow-50/20 to-emerald-100/30">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                  Perspectives
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  Human Stories in a World of Numbers
                </h2>
                <p className="text-sm text-slate-500 mt-2 max-w-xl">
                  Essays exploring the intersection of heavy infrastructure, human behaviors, and the future of technology.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles by topic, tech, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-full shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2.5 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-100"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl shadow-sm border border-white/80">
                <p className="text-slate-500 text-sm">No articles match your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredPosts.map((post, idx) => {
                  const sourcePath = selectedCategory === "All"
                    ? "/big-data"
                    : `/big-data?category=${encodeURIComponent(selectedCategory)}`;
                  const sourceLabel = selectedCategory === "All" ? "Big Data" : selectedCategory;

                  return (
                  <Link
                    key={idx}
                    href={`/blog/${post.slug}?from=${encodeURIComponent(sourcePath)}&fromLabel=${encodeURIComponent(sourceLabel)}`}
                    className="block h-full"
                  >
                    <article
                      className="group flex flex-col justify-between rounded-3xl bg-white/75 backdrop-blur-md hover:-translate-y-1 hover:shadow-xl shadow-md shadow-slate-100 hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer overflow-hidden border border-white/95 h-full"
                    >
                      <div>
                        {/* Card Cover Image */}
                        <div className="relative w-full aspect-video overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        
                        <div className="p-6 space-y-2">
                          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                            <span className="font-bold text-teal-600 uppercase tracking-wide">{post.category}</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-4 font-light">
                            {post.desc}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

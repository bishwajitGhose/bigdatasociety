import { useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search } from "lucide-react";
import { getBlogPosts } from "@/lib/content";

const categories = ["All", "R", "Python", "Stata", "SQL", "Scala", "Julia"];

export default function DataScience() {
  const params = useParams<{ lang?: string }>();
  const urlLang = params.lang;
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Load from Markdown
  const mdPosts = getBlogPosts().filter((post) =>
    categories.includes(post.category)
  );

  const currentCategory = urlLang
    ? (categories.find(c => c.toLowerCase() === urlLang.toLowerCase()) || "All")
    : "All";

  const filteredPosts = mdPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = currentCategory === "All" || post.category.toLowerCase() === currentCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-700 selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />
      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-teal-100 bg-gradient-to-br from-yellow-100/40 via-teal-50/50 to-cyan-100/40">
          <div className="container max-w-7xl mx-auto px-4 md:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative min-h-[260px] flex items-center">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-200/50 via-sky-200/35 to-transparent blur-3xl" />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 mb-6">
                    Translating Numbers
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 max-w-4xl leading-tight">
                    Data Science: Finding Truth in the Whispers of Noise
                  </h1>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-5">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                  Data Science is the art of translating cold database entries into clear human stories. It is the language of probability, modeling, and discovery. Every day, trillions of data points are created-representing our climates, our economies, and our habits. Data science helps us look at this ocean of information and find the current.
                </p>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                  From helping doctors predict which therapy will cure a patient, to forecasting crop yields during severe droughts, data science shapes how we plan for the future. It's not just about standard deviations or regression lines; it's about finding truth in noise and using it to guide our choices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Blog Section ── */}
        <section className="py-24 bg-gradient-to-tr from-teal-100/30 via-yellow-50/20 to-emerald-100/30">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  Tutorials
                </h2>
                <p className="text-sm text-slate-500 mt-2 max-w-xl">
                  Step-by-step guides and tutorials for scientific computation, statistical analysis, and machine learning models.
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
                  onClick={() => {
                    if (cat === "All") {
                      setLocation("/data-science");
                    } else {
                      setLocation(`/data-science/${cat.toLowerCase()}`);
                    }
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                    currentCategory.toLowerCase() === cat.toLowerCase()
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
                  const sourcePath = currentCategory === "All"
                    ? "/data-science"
                    : `/data-science/${currentCategory.toLowerCase()}`;
                  const sourceLabel = currentCategory === "All" ? "Data Science" : `${currentCategory} Studio`;

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

import { Link, useLocation } from "wouter";

export function Footer() {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <div>
      {/* ── Pre-Footer Elegant Hero Section ── */}
      {isHome && (
        <section className="relative overflow-hidden py-16 border-t border-b border-teal-100/40 bg-gradient-to-r from-yellow-100/30 via-teal-50/40 to-cyan-100/30">
          <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.4))]" />
          <div className="container max-w-4xl mx-auto px-6 relative text-center">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight italic">
              "with big data comes big responsibilities"
            </h2>
          </div>
        </section>
      )}

      {/* ── Main Footer ── */}
      <footer className="border-t bg-card text-card-foreground">
        <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
                <style>{`
                  @keyframes dotClockwiseFooter {
                    0%, 20% {
                      background-color: #7c3aed;
                    }
                    30%, 100% {
                      background-color: var(--dot-inactive-footer, #cbd5e1);
                    }
                  }
                  .logo-dot-f {
                    --dot-inactive-footer: #cbd5e1;
                    animation: dotClockwiseFooter 2s infinite;
                  }
                  .dark .logo-dot-f {
                    --dot-inactive-footer: #475569;
                  }
                  .logo-dot-f-1 { animation-delay: 0s; }
                  .logo-dot-f-2 { animation-delay: 0.5s; }
                  .logo-dot-f-3 { animation-delay: 1s; }
                  .logo-dot-f-4 { animation-delay: 1.5s; }
                `}</style>
                {/* 2×2 dot-grid mark */}
                <div className="grid grid-cols-2 gap-[3px] transition-transform duration-500 group-hover:rotate-90">
                  {/* Top-Left */}
                  <span className="h-[6px] w-[6px] rounded-full logo-dot-f logo-dot-f-1" />
                  {/* Top-Right */}
                  <span className="h-[6px] w-[6px] rounded-full logo-dot-f logo-dot-f-2" />
                  {/* Bottom-Left */}
                  <span className="h-[6px] w-[6px] rounded-full logo-dot-f logo-dot-f-4" />
                  {/* Bottom-Right */}
                  <span className="h-[6px] w-[6px] rounded-full logo-dot-f logo-dot-f-3" />
                </div>
                <div className="flex items-baseline leading-none select-none">
                  <span className="text-base font-extralight tracking-tight text-slate-500 dark:text-slate-455 dark:text-slate-450">Big</span><span className="text-base font-black tracking-tight text-teal-650 text-teal-650 text-teal-600 dark:text-teal-400">Data</span><span className="text-base font-medium tracking-tight" style={{ color: "#7c3aed" }}>Society</span>
                </div>
              </Link>
              <p className="text-muted-foreground text-sm max-w-md">
                Data engineered for clarity. Statistical rigor meets visual intelligence. 
                Built by Jon Neo, operating at the intersection of architecture, analysis, and interface.
              </p>
              <p className="text-xs text-muted-foreground mt-2">&copy; {new Date().getFullYear()} BigDataSociety. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm">Expertise</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/big-data" className="hover:text-primary transition-colors">Big Data Engineering</Link></li>
                <li><Link href="/data-analysis" className="hover:text-primary transition-colors">Quantitative Analysis</Link></li>
                <li><Link href="/visualization" className="hover:text-primary transition-colors">Data Visualization</Link></li>
                <li><Link href="/web-dev" className="hover:text-primary transition-colors">Web Development</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Connect</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Insights</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex justify-center text-center">
            <p className="text-xs text-muted-foreground font-light">
              Made with <span className="inline-block animate-pulse">💚</span> by{" "}
              <a href="https://infoart.ca" target="_blank" rel="noreferrer" className="hover:underline transition-colors font-medium">
                <span style={{ color: "#A65E46" }}>info</span>
                <span style={{ color: "#7c3aed" }}>art</span>
                <span style={{ color: "#64748b" }}>.ca</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

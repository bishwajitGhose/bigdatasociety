import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

const barData = [
  { category: 'Q1', revenue: 4000, cost: 2400 },
  { category: 'Q2', revenue: 3000, cost: 1398 },
  { category: 'Q3', revenue: 2000, cost: 9800 },
  { category: 'Q4', revenue: 2780, cost: 3908 },
];

const scatterData = Array.from({ length: 50 }).map(() => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 400,
}));

export default function Visualization() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-secondary/30 pt-24 pb-16 md:pt-32 md:pb-24 border-b">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Data Visualization</h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Crafting visual narratives that command attention. Inspired by the principles of Edward Tufte and the elegance of high-end journalism.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border rounded-xl p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold">Revenue vs Cost Analysis</h3>
                  <p className="text-sm text-muted-foreground">Simulating Tableau precision styling</p>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="category" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="cost" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card border rounded-xl p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold">Cluster Distribution</h3>
                  <p className="text-sm text-muted-foreground">Inspired by ggplot2 minimal themes</p>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" dataKey="x" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis type="number" dataKey="y" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <ZAxis type="number" dataKey="z" range={[20, 200]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                      <Scatter data={scatterData} fill="hsl(var(--primary))" opacity={0.6} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold mb-4">The Philosophy of Display</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A chart is not just a picture of numbers. It is a dense, high-bandwidth communication medium. I build visual interfaces that maximize data-ink ratio, eliminate chart junk, and guide the viewer's eye directly to the insight. Whether it's a static ggplot2 graphic for a report or a deeply interactive Tableau dashboard for the C-suite, the goal remains the same: immediate clarity.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { epoch: 1, predicted: 0.12, actual: 0.15 },
  { epoch: 2, predicted: 0.25, actual: 0.22 },
  { epoch: 3, predicted: 0.38, actual: 0.40 },
  { epoch: 4, predicted: 0.52, actual: 0.49 },
  { epoch: 5, predicted: 0.65, actual: 0.68 },
  { epoch: 6, predicted: 0.81, actual: 0.79 },
  { epoch: 7, predicted: 0.95, actual: 0.92 },
];

export default function DataAnalysis() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-secondary/30 pt-24 pb-16 md:pt-32 md:pb-24 border-b">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Quantitative Analysis</h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Applying mathematical rigor to uncover hidden patterns. From hypothesis testing to predictive modeling using advanced statistical techniques.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <h3 className="text-2xl font-bold mb-4">Statistical Modeling</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Building robust predictive models that go beyond black-box ML. Deep understanding of generalized linear models, time series forecasting (ARIMA/Prophet), and Bayesian inference using R and Python.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-secondary text-xs font-medium rounded-full">Python (pandas, scikit-learn)</span>
                  <span className="px-3 py-1 bg-secondary text-xs font-medium rounded-full">R (tidyverse, caret)</span>
                  <span className="px-3 py-1 bg-secondary text-xs font-medium rounded-full">Regression Analysis</span>
                  <span className="px-3 py-1 bg-secondary text-xs font-medium rounded-full">A/B Testing</span>
                </div>
              </div>
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h4 className="text-sm font-semibold mb-6 uppercase tracking-wider text-muted-foreground">Model Convergence</h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dummyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="epoch" tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      />
                      <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="actual" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Feature Engineering",
                  desc: "Extracting signal from noise. Creating meaningful predictors from raw temporal, text, and categorical data."
                },
                {
                  title: "Machine Learning",
                  desc: "Deploying gradient boosting (XGBoost/LightGBM), random forests, and deep learning models to production."
                },
                {
                  title: "Causal Inference",
                  desc: "Moving beyond correlation to understand true business impact through rigorous experimental design."
                }
              ].map(item => (
                <div key={item.title} className="bg-card border rounded-xl p-8 hover:border-primary/50 transition-colors">
                  <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

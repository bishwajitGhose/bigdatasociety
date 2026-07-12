import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/Home";
import BigData from "@/pages/BigData";
import DataAnalysis from "@/pages/DataAnalysis";
import Visualization from "@/pages/Visualization";
import WebDev from "@/pages/WebDev";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import DataScience from "@/pages/DataScience";
import BlogPostDetail from "@/pages/BlogPostDetail";
import DataProjects from "@/pages/DataProjects";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/data-projects" component={DataProjects} />
            <Route path="/big-data" component={BigData} />
            <Route path="/data-analysis" component={DataAnalysis} />
            <Route path="/visualization" component={Visualization} />
            <Route path="/web-dev" component={WebDev} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPostDetail} />
            <Route path="/contact" component={Contact} />
            <Route path="/data-science" component={DataScience} />
            <Route path="/data-science/:lang" component={DataScience} />
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

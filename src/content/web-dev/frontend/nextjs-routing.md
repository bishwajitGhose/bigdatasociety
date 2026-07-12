---
title: "The Mechanics of React Server Components"
desc: "Understanding data serialization, edge rendering, and client hydrations in modern full-stack frameworks."
category: "Frontend"
readTime: "5 min read"
date: "July 9, 2026"
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"
---

With the introduction of React Server Components (RSC), full-stack web applications have changed how they render pages, send payloads, and manage bundle sizes.

### Server Components vs Client Components

By default, all files in the Next.js App Router are React Server Components. They run on the build server or request edge, rendering directly to an intermediate virtual DOM format.

Because they execute on the server, you can query your database or make API calls directly inside the component body:

```typescript
// App Router Server Component
import { db } from "@/lib/db";

async function ArticleList() {
  // Querying database directly on the server
  const articles = await db.select().from("articles").limit(10);

  return (
    <div className="space-y-4">
      {articles.map((art) => (
        <article key={art.id} className="p-4 rounded-xl border">
          <h2 className="text-xl font-bold">{art.title}</h2>
          <p className="text-muted-foreground">{art.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### The Serialization Boundary

When passing data from a Server Component to a Client Component (marked with `"use client"`), the data must be serializable. This boundary helps separate backend compute logic from client interactive logic.

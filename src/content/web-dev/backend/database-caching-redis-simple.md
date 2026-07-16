---
title: "Speed Up Database Queries with Redis Caching"
desc: "What is caching, how Redis works in the backend, and how to store query results to make your APIs run super fast."
category: "Backend"
readTime: "5 min read"
date: "July 17, 2026"
image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200"
---

When your website grows and gets more traffic, your database has to work harder. Every time a user loads a page, the server runs queries to fetch the same data (like a list of popular articles or configuration settings). 

Running these queries over and over on a slow database disk makes your server lag. To fix this, we use **Caching** with a tool called **Redis**.

Let's learn how Redis caching works in plain language and see a simple code example.

---

### What is Caching?

Caching is like keeping a cheat sheet. 

Imagine a teacher asks you: "What is $349 \times 872$?". 
1. You take out a piece of paper, calculate for 30 seconds, and answer `304,328`.
2. 5 minutes later, another student asks you: "What is $349 \times 872$?". 
3. Instead of calculating it again, you look at the number you wrote down on your desk (the cache) and answer instantly.

In web development:
* **The calculation** is a slow SQL database query on disk.
* **The desk** is Redis (an in-memory database).

---

### Why use Redis?

Redis stores data in the computer's **RAM (memory)** rather than on a hard drive. RAM is extremely fast—reading data from RAM takes microseconds, while reading from a hard drive takes milliseconds.

### The Caching Workflow

When a user requests data from your API:
1. **Check Cache**: Your server asks Redis: "Do you have the data for this request?".
2. **Cache Hit**: If Redis has it, the server returns the data immediately. (Super fast!).
3. **Cache Miss**: If Redis does not have it, the server queries the SQL database, saves the result in Redis for next time, and returns the data.

---

### Simple Code Example

Here is how you write a cached API route in Node.js:

```javascript
import express from "express";
import { createClient } from "redis";

const app = express();
const redisClient = createClient();
await redisClient.connect();

app.get("/api/products", async (req, res) => {
  const cacheKey = "products:all";

  // 1. Try to fetch from Redis cache
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log("Cache Hit!");
    return res.json(JSON.parse(cachedData));
  }

  console.log("Cache Miss!");
  // 2. Fetch from main SQL database (slow)
  const products = await db.query("SELECT * FROM products");

  // 3. Save to Redis with an expiration time (e.g. 1 hour)
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));

  return res.json(products);
});
```

---

### Key Rule: Cache Expiration

You must always set an **expiration time (TTL)** on cached data. If you don't, when you update a product's price in your main database, your users will still see the old price forever because the server will keep loading the old data from Redis! Setting a TTL (like 3600 seconds) ensures the cache refreshes regularly.

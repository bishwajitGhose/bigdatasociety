---
title: "Understanding Core Web Vitals: Make Your Site Fast"
desc: "A simple guide to LCP, FID, and CLS, and how to make your Google page speed score green."
category: "Frontend"
readTime: "5 min read"
date: "July 15, 2026"
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
---

When you visit a website, nothing is worse than waiting for it to load. If it takes more than 3 seconds, most people will click the back button. 

Google knows this. That is why they created **Core Web Vitals**. These are three specific measurements Google uses to decide if your website is fast and has a good user experience. If your scores are good, Google ranks your site higher in search results.

Let's understand these three metrics in plain language and learn how to fix them.

---

### 1. LCP (Largest Contentful Paint) - Loading Speed

LCP measures how long it takes for the **main content** of the page to show up on the screen. This is usually the big header image or the main text block.

* **Good Score**: Under **2.5 seconds**.
* **Poor Score**: Over **4 seconds**.

#### How to fix slow LCP:
* **Compress your images**: If your banner image is 5MB, it will take a long time to download. Compress it to under 100KB using modern formats like WebP or AVIF.
* **Remove render-blocking JavaScript**: Make sure your browser doesn't stop loading the HTML to download useless scripts. Use `defer` or `async` tags on your scripts.

---

### 2. INP / FID (Interaction to Next Paint / First Input Delay) - Interactivity

FID measures how long it takes for the page to respond when a user **first clicks a button** or link. (Note: Google is replacing FID with INP, which measures all interactions, but the concept is the same).

* **Good Score**: Under **100 milliseconds**.
* **Poor Score**: Over **300 milliseconds**.

#### How to fix slow interactivity:
* **Break down big JavaScript tasks**: If your browser is busy running a huge JavaScript loop, it cannot respond when the user clicks a button. Break your code into smaller chunks.
* **Use web workers**: Run heavy calculations in the background so the main screen thread stays free.

---

### 3. CLS (Cumulative Layout Shift) - Visual Stability

Have you ever tried to click a button, but right before your finger touched the screen, a banner loaded, pushed the button down, and you accidentally clicked an ad? That is a layout shift. CLS measures how much elements **move around** while the page is loading.

* **Good Score**: Under **0.1** (a formula calculation, not seconds).
* **Poor Score**: Over **0.25**.

#### How to fix bad CLS:
* **Always set dimensions on images**: Tell the browser the width and height of images in the HTML:
  ```html
  <img src="banner.jpg" width="800" height="400" alt="Banner" />
  ```
  This way, the browser reserves a blank box for the image *before* it downloads, preventing content below it from jumping.
* **Reserve space for ads**: If you load ads dynamically, put them inside a fixed-height container so they don't push content down when they load.

---

### Summary Checklist

To make your website run like a rocket:
1. Make images small.
2. Reserve image dimensions.
3. Keep your JavaScript bundle small.

---
title: "Web Accessibility (a11y) Explained Simply"
desc: "How to make your website usable for people with disabilities, and why it benefits all of your users."
category: "Frontend"
readTime: "4 min read"
date: "July 19, 2026"
image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1200"
---

When we build websites, we often assume that everyone experiences the web the same way we do: using a mouse, a fast screen, and perfect vision.

But many users navigate the web differently:
* Blind users use **screen readers** that read the text aloud.
* Users with motor disabilities navigate using only the **keyboard** (Tab key).
* Colorblind users struggle to read text with low contrast.

Making your site usable for these users is called **Web Accessibility** (often shortened to **a11y**, because there are 11 letters between 'a' and 'y'). Let's learn three simple things you can do to make your site accessible today.

---

### 1. Always Use Semantic HTML

A common mistake is using `div` elements for everything. For example, making a clickable box look like a button:

```html
<!-- Bad: Screen readers and keyboard users do not know this is clickable -->
<div onclick="submitForm()">Submit</div>
```

If you use correct semantic HTML elements, the browser automatically configures accessibility settings:

```html
<!-- Good: Works with screen readers and keyboard navigation out of the box -->
<button onclick="submitForm()">Submit</button>
```

---

### 2. Never Remove Focus Outlines

Have you ever pressed the `Tab` key on a website and noticed a blue border around buttons or inputs? That is the **focus ring**. It tells keyboard users exactly where they are on the screen.

Many designers think this blue ring is ugly and hide it using CSS:
```css
/* Bad: Destroys keyboard navigation! */
*:focus {
  outline: none;
}
```

If you don't like the default browser outline, design a custom one instead of removing it:
```css
/* Good: Custom focus style */
*:focus-visible {
  outline: 2px solid #0d9488;
  outline-offset: 4px;
}
```

---

### 3. Add Alternative Text (alt) on Images

Blind users cannot see your images. When a screen reader encounters an image, it reads the `alt` description aloud.

```html
<!-- Bad: Screen reader will just read "image1.jpg" -->
<img src="chart.jpg" />

<!-- Good: Explains the content of the image -->
<img src="chart.jpg" alt="Bar chart showing sales growth in 2025" />
```

If the image is purely decorative (like a background shape), set `alt=""` so the screen reader knows it can safely skip it.

---

### Why a11y benefits everyone

Building accessible sites doesn't just help users with permanent disabilities. It helps everyone:
* Clean contrast ratios help you read a site outside under bright sunlight.
* Keyboard navigation helps power-users navigate forms faster.
* Clean semantic HTML makes your site easier to crawl by search engines, boosting your SEO!

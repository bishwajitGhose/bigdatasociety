---
title: "What is an API? Explained Simply"
desc: "A plain language explanation of Application Programming Interfaces and how they connect different systems."
category: "Backend"
readTime: "3 min read"
date: "July 12, 2026"
image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200"
---

If you are learning web development, you hear the word **API** every day. You hear things like: "Connect to the Google Maps API" or "We need to build a user API". 

But what does it actually mean? 

API stands for **Application Programming Interface**. Let's explain it with a simple restaurant story.

### The Restaurant Story

Imagine you are sitting at a table in a restaurant. 

1. **You** are the frontend (the client). You want food.
2. **The Kitchen** is the backend (the server). The kitchen has all the ingredients and makes the food.
3. **The Waiter** is the **API**. 

You cannot walk into the kitchen and cook the food yourself. It is restricted. Instead, you look at the menu, pick a dish, and tell the waiter (API) your order. 

The waiter takes your order to the kitchen. The kitchen cooks the food, gives it to the waiter, and the waiter brings the plate back to your table. 

An API does the exact same thing for computers. It is the messenger that takes a request from one system, tells the other system what to do, and brings the response back.

### A Code Example

When your mobile app wants to show the current weather, it sends a request to a weather API server:

```typescript
// Fetching weather data from a public API
async function getWeather() {
  const response = await fetch("https://api.weather.com/v1/ottawa");
  const data = await response.json();
  
  console.log("Temperature is: " + data.temp);
}
```

The API website reads the word `ottawa`, looks up the temperature in its big database, and returns the JSON payload data to your app.

### Why do we use APIs?

* **Security**: It keeps your database safe. Clients don't have direct access to your database; they only get the data the API allows them to see.
* **Reusability**: You can write one API, and use it for your iPhone app, your Android app, and your website at the same time.
* **Separation**: The frontend developers can focus on buttons and colors, while backend developers focus on servers and logic.

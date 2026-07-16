---
title: "HTTP Status Codes Explained Simply"
desc: "A developer cheat sheet to understand what 200, 300, 400, and 500 status codes actually mean."
category: "Backend"
readTime: "4 min read"
date: "July 18, 2026"
image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200"
---

When your browser talks to a server, the server always responds with a 3-digit number. This number is called an **HTTP Status Code**. 

It is the server's way of giving a quick update: "Here is your page", "I don't know what you are looking for", or "Help, my database is broken".

As a backend developer, you must know what these codes mean and send the correct code from your APIs. Let's make it simple.

---

### The 5 Groups of Codes

HTTP status codes are grouped by their first digit:

* **1xx (Informational)**: "Wait, I am still processing your request." (Rarely used in daily work).
* **2xx (Success)**: "Everything is good! Here is what you asked for."
* **3xx (Redirection)**: "The page moved somewhere else. Go there instead."
* **4xx (Client Error)**: "You made a mistake in your request."
* **5xx (Server Error)**: "I made a mistake, my server crashed."

---

### The Most Important Codes You Must Know

#### 200 OK
* **What it means**: The request was successful.
* **Usage**: Standard response for successful GET, PUT, or POST requests.

#### 201 Created
* **What it means**: The request was successful and a new item was created in the database.
* **Usage**: Respond with this when a user registers a new account or uploads a new photo.

#### 301 Moved Permanently
* **What it means**: The URL changed permanently. 
* **Usage**: Redirecting users from old URLs (like `my-site.com/old`) to new URLs (like `my-site.com/new`).

#### 400 Bad Request
* **What it means**: The server cannot understand the request because you sent bad data.
* **Usage**: Use this when a user submits a form but forgot to fill in the required "email" field.

#### 401 Unauthorized
* **What it means**: You need to log in to see this content.
* **Usage**: Respond with this when a guest tries to view their profile page without logging in.

#### 403 Forbidden
* **What it means**: You are logged in, but you don't have permission to see this.
* **Usage**: Respond with this when a regular customer tries to enter the admin dashboard panel.

#### 404 Not Found
* **What it means**: The page or resource does not exist.
* **Usage**: The classic error when someone types a wrong URL.

#### 500 Internal Server Error
* **What it means**: The server crashed or encountered an unexpected bug.
* **Usage**: This happens when your code has a syntax error or your database goes offline.

---

### How to use them in code (Node.js/Express)

```javascript
app.post('/api/users', (req, res) => {
  if (!req.body.email) {
    // Client error: missing data
    return res.status(400).json({ error: "Email is required" });
  }

  // Create user logic...
  
  // Success: created
  res.status(201).json({ message: "User registered successfully" });
});
```

Using the correct status codes makes it much easier for frontend developers to handle errors and show correct messages to the users!

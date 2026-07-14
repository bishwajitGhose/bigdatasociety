---
title: "Understanding JWT (JSON Web Tokens)"
desc: "How JSON Web Tokens work to verify users and keep them logged in securely."
category: "Backend"
readTime: "4 min read"
date: "July 13, 2026"
image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200"
---

When a user logs into your website, how does the server know they are still logged in when they click on a new page? 

In the old days, the server had to remember every user session in its memory. But today, we use **JWT (JSON Web Tokens)**. It is a very popular way to handle authentication.

Let's look at how it works in plain steps.

### What is a JWT?

A JWT is just a long, coded string of text. It looks like this:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJuYW1lIjoiQmlzaHdhaml0In0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

It has three parts separated by dots (`.`):
1. **Header**: Tells which algorithm is used to lock the token.
2. **Payload**: The actual data (like user ID or username).
3. **Signature**: The secret lock made by the server.

### The JWT Workflow

Think of a JWT like a **wristband** you get at a music festival.

1. **Login**: You show your ID (username and password) to the ticket booth (the server).
2. **Issue Token**: The server verifies you are correct, creates a wristband (JWT) with your name on it, stamps it with a secret seal, and gives it to you.
3. **Save Token**: Your browser stores this token (usually in LocalStorage or cookies).
4. **Send Token**: Every time you want to see a private page (like your profile), your browser automatically sends this wristband (JWT) in the request header.
5. **Verify**: The server looks at the wristband, checks the secret stamp, and says: "Stamp is valid, welcome in!". The server does not need to check a database session list; it just trusts the stamp.

### A Simple Express Code Example

Here is how a server checks if a JWT is valid:

```typescript
import jwt from "jsonwebtoken";

function verifyUser(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  if (!token) return res.status(401).json({ error: "No wristband!" });

  try {
    // Decodes the token using the secret key
    const decoded = jwt.verify(token, "MY_SUPER_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid stamp!" });
  }
}
```

By using JWTs, your backend servers can be stateless, which means they can scale to millions of users easily without running out of session memory!

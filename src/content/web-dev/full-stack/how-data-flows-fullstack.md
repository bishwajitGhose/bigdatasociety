---
title: "How Data Flows in a Full-Stack App"
desc: "A step-by-step trace of what happens behind the scenes when a user clicks a button."
category: "Full-Stack"
readTime: "4 min read"
date: "July 13, 2026"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200"
---

When you click "Like" on a post, the count increases immediately. But how does that count stay saved when you refresh? How does the update reach the database?

Let's trace the journey of a single piece of data from the screen, to the server, to the database, and back.

### The Journey: Step-by-Step

Imagine a user named Maria clicks a **"Like"** button on a photo:

#### 1. The Screen (Frontend Trigger)
Maria's click triggers a JavaScript function in her browser. 
The browser changes the local button color to active and prepares to tell the server.

```typescript
// Sending the update to the server
async function likePost(postId: string) {
  await fetch(`/api/posts/${postId}/like`, { method: "POST" });
}
```

#### 2. The Internet (API Request)
The browser sends an HTTP POST request over the internet to the server address: `/api/posts/456/like`.

#### 3. The Server (Backend Handler)
The server receives the request. It first checks if Maria is logged in (using verification). If yes, the server prepares to update the database.

```typescript
app.post("/api/posts/:id/like", async (req, res) => {
  const postId = req.params.id;
  
  // Update post likes in database
  await db.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [postId]);
  
  res.json({ success: true });
});
```

#### 4. The Database (Permanent Storage)
The database receives the query. It locates the post with ID `456`, increases its `likes` number by 1, and writes it to the disk. 
Then, it tells the server: "Done!".

#### 5. The Response (Round Trip)
The server sends a JSON response back to Maria's browser: `{ "success": true }`.
Maria's browser gets the response, confirming that the like was saved permanently.

### Summary

That's the entire round-trip of data in a full-stack application! Every single action—submitting a form, registering an account, or writing a chat message—follows this exact same loop.

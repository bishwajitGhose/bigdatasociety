---
title: "Stop Saving Passwords as Plain Text"
desc: "Why saving raw passwords is dangerous, what hashing is, and how to use bcrypt to secure user logins."
category: "Backend"
readTime: "4 min read"
date: "July 19, 2026"
image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200"
---

When a user registers on your website, they type a password (like `secret123`). If you save this password directly into your database column, you are making a massive security mistake.

If a hacker steals your database, or if a rogue employee looks at the user table, they will see everyone's passwords immediately. Because many people reuse the same password for their email and bank accounts, this can ruin their lives.

In this guide, we will learn how to secure passwords using **hashing** and **bcrypt** in plain language.

---

### What is Hashing?

Hashing is a **one-way mathematical function**. It takes a string of text (the password) and turns it into a completely different scrambled code.

For example, if you hash `secret123` using a hashing algorithm, it becomes:
`$2b$10$tQ12...ScrambledString`

#### Hashing has three main rules:
1. **One-Way**: You can convert the password into a hash, but you can *never* convert the hash back into the password. There is no "decrypt" button.
2. **Deterministic**: The same password will always produce the exact same hash.
3. **Random-Looking**: Even a tiny change in the password (like changing `secret123` to `secret124`) will produce a completely different hash.

---

### How do we verify logins if we can't decrypt?

When a user logs in:
1. They type `secret123`.
2. The backend hashes the typed password: `secret123` $\rightarrow$ `$2b$10$tQ12...`.
3. The backend compares this new hash with the hash saved in the database during registration.
4. If they match, the password is correct!

---

### What is Salt?

If two users choose the same password (like `password123`), they will have the exact same hash. Hackers know this and use databases of pre-calculated hashes (called **Rainbow Tables**) to guess passwords instantly.

To stop this, we add a **Salt**. A salt is a random string of characters added to the password *before* hashing it. This ensures that even if two users have the same password, their hashes will look completely different.

---

### How to write this in Node.js using `bcrypt`

`bcrypt` is the most popular library for hashing passwords. It automatically handles salting and slow hashing to prevent brute-force attacks.

#### 1. Hash password during registration:
```javascript
import bcrypt from "bcrypt";

app.post('/api/register', async (req, res) => {
  const saltRounds = 10;
  
  // Scramble the password with 10 salt rounds
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  // Save hashedPassword into the database
  await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, hashedPassword]);

  res.status(201).json({ message: "Registration successful" });
});
```

#### 2. Check password during login:
```javascript
app.post('/api/login', async (req, res) => {
  const user = await db.query("SELECT * FROM users WHERE email = ?", [req.body.email]);

  if (!user) return res.status(400).json({ error: "User not found" });

  // Compare raw password with the saved hash
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid password" });
  }

  res.json({ message: "Logged in successfully!" });
});
```

By using `bcrypt`, even if your database is leaked to the internet, your users' passwords remain completely safe!

---
title: "Preventing SQL Injection: Keep Your Database Safe"
desc: "What is SQL injection, how hackers steal database data, and how to write secure backend queries to stop them."
category: "Backend"
readTime: "5 min read"
date: "July 16, 2026"
image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200"
---

When you build a backend application, security should be your top priority. One of the oldest and most dangerous hacking techniques is **SQL Injection (SQLi)**. 

If a hacker successfully executes a SQL injection, they can read all the data in your database (including private user passwords), delete entire tables, or even log in as the administrator without knowing the password.

In this guide, we will learn how SQL injection works in plain language and how to write secure code to prevent it completely.

---

### How SQL Injection Works

Imagine you have a login form. When a user inputs their username and password, your Node.js backend runs this SQL query to verify them:

```javascript
// A dangerous SQL query
const query = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
```

If a normal user logs in with the username `maria` and password `123`, the query becomes:
`SELECT * FROM users WHERE username = 'maria' AND password = '123'` (which is safe).

But what if a hacker inputs this text in the username field?
`admin' --`

Now, look at what the backend query looks like when we insert that input:
`SELECT * FROM users WHERE username = 'admin' --' AND password = '...'`

In SQL, the double dash `--` is a **comment symbol**. It tells the database to ignore everything that comes after it. So the database only runs:
`SELECT * FROM users WHERE username = 'admin'`

The database finds the admin user and logs the hacker in immediately. They bypassed the password check completely!

---

### How to Stop SQL Injection

To stop SQL injection, you must follow one simple rule: **Never trust user input. Never concatenate variables directly into your SQL strings.**

Here are two secure ways to query databases.

#### 1. Use Parameterized Queries (Prepared Statements)

Instead of merging user input into the SQL text, you write the SQL query with placeholders (`?` or `$1`), and send the inputs separately. The database treats the inputs as raw text, not as executable SQL code.

```javascript
// Safe: Parameterized Query
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.query(query, [req.body.username, req.body.password], (err, results) => {
  // handle login
});
```

Even if the hacker inputs `admin' --`, the database will search for a user whose literal username is the string `"admin' --"`. It will not run any malicious commands.

#### 2. Use an ORM (Object Relational Mapper)

Modern backend developers use ORMs like Prisma, Sequelize, or Mongoose. These libraries automatically write parameterized queries behind the scenes, making it very difficult to make mistakes.

```typescript
// Safe: Using Prisma ORM
const user = await prisma.user.findUnique({
  where: {
    username: req.body.username,
  },
});
```

---

### Summary Checklist

To keep your backend secure:
1. Use parameter placeholders (`?` or `$1`) in raw SQL.
2. Use an ORM to handle database queries safely.
3. Clean and validate inputs before querying.

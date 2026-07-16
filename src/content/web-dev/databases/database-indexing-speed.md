---
title: "Database Indexing: Why Your Queries are Slow"
desc: "What is a database index, how it works behind the scenes, and how to create them to speed up your SELECT queries."
category: "Databases"
readTime: "5 min read"
date: "July 16, 2026"
image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200"
---

When you build a new web application, your database starts small. Searching for a user or fetching products is instant. But as your database grows to hundreds of thousands of rows, you will notice your pages take longer and longer to load. 

Why? Because your queries are running slow. The solution to this problem is **Database Indexing**.

Let's learn how database indexes work in plain language and how to use them.

---

### What is a Database Index?

An index is like the **index page at the back of a textbook**. 

Imagine you have a 1,000-page book about history, and you want to find every page that mentions "Julius Caesar".
* **Without an index**: You must start at page 1 and read every single word until page 1,000. In database terms, this is called a **Full Table Scan**. It is very slow.
* **With an index**: You flip to the back of the book, look up "Caesar" in the alphabetical index, see it says "pages 45, 120, 890", and immediately open those pages.

A database index is a separate, sorted table structure (usually a B-Tree structure) that helps the database engine locate specific rows without reading the entire table.

---

### How to Create an Index in SQL

When you create a table, SQL automatically indexes your `PRIMARY KEY` (usually the `id` column). But if you search rows using other columns, you should add indexes manually.

For example, if your query is:
```sql
SELECT * FROM users WHERE email = 'maria@example.com';
```

You can speed this up by adding an index to the `email` column:
```sql
CREATE INDEX idx_users_email ON users(email);
```

Now, instead of scanning all 100,000 users, the database uses `idx_users_email` to find Maria instantly.

---

### The Cost of Indexing

If indexes make queries so fast, why don't we index every single column? 

Because indexes have a cost:
1. **Slower Writes (INSERT, UPDATE, DELETE)**: Every time you add or edit a row, the database has to update both the main table *and* all the index tables. If you have too many indexes, saving data becomes very slow.
2. **Storage Space**: Indexes take up space on your server disk. A table with 10 indexes can be twice as large as the raw data itself.

---

### Best Practices

* Only index columns that you use frequently inside `WHERE`, `JOIN`, or `ORDER BY` statements.
* Avoid indexing columns with very low variety (like `gender` which only has a few values).
* Regularly monitor query speeds using the `EXPLAIN` command to see if the database is actually using your indexes:
  ```sql
  EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'maria@example.com';
  ```

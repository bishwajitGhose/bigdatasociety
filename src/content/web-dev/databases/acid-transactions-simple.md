---
title: "What are ACID Transactions in Databases?"
desc: "A simple guide to Atomicity, Consistency, Isolation, and Durability, and why they prevent data corruption."
category: "Databases"
readTime: "4 min read"
date: "July 17, 2026"
image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200"
---

Imagine you are transferring \$100 from your bank account to your friend's bank account.

The bank's backend database has to run two separate SQL updates:
1. Deduct \$100 from your balance: `UPDATE accounts SET balance = balance - 100 WHERE id = 1;`
2. Add \$100 to your friend's balance: `UPDATE accounts SET balance = balance + 100 WHERE id = 2;`

Now, imagine the power goes out right after step 1 completes, but *before* step 2 starts. Your \$100 is gone, but your friend never received it. It simply disappeared.

To prevent this nightmare, databases use **ACID Transactions**. Let's learn what ACID means in plain language.

---

### The 4 Rules of ACID

ACID is an acronym for four safety rules that databases follow to ensure data remains correct even during crashes.

---

#### 1. A - Atomicity (All or Nothing)
A transaction is treated as a single "atom". This means all queries inside the transaction must succeed. If even one query fails (e.g. database goes offline or code crashes), the database rolls back the entire transaction. It is as if nothing ever happened.

* **Bank Example**: If the power cuts mid-transfer, the \$100 is returned to your account automatically.

---

#### 2. C - Consistency (No Broken Rules)
Every database has rules (constraints), like "age must be positive" or "email must be unique". Consistency guarantees that a transaction can only transition the database from one valid state to another. If a transaction tries to write data that violates these rules, the database rejects the entire transaction.

---

#### 3. I - Isolation (No Peeking)
In a busy application, thousands of transactions run at the same time. Isolation ensures that transactions do not interfere with each other while running. A transaction cannot see the intermediate states of another transaction until it is fully completed.

* **Bank Example**: If you check your balance *during* the transfer, you will see either the old balance or the new balance—never a weird in-between state where the money is missing from both accounts.

---

#### 4. D - Durability (Permanent Saving)
Once a transaction is successfully completed (committed), the database guarantees the data is saved permanently on disk. Even if the server crashes or the electricity goes out a microsecond later, your changes will not be lost.

---

### How to use Transactions in SQL

In SQL, you group queries inside a transaction block using `BEGIN` and `COMMIT`:

```sql
-- Start the transaction block
BEGIN;

-- Run the queries
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If everything is okay, save it permanently
COMMIT;

-- If something went wrong, cancel it:
-- ROLLBACK;
```

By grouping sensitive database updates inside transactions, you ensure your application's data remains consistent and bug-free!

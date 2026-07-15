---
title: "Data Cleaning in Stata: Mastering Reshape"
desc: "A complete step-by-step guide to transform datasets between wide and long formats in Stata."
category: "Stata"
readTime: "9 min read"
date: "July 17, 2026"
image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200"
---

When you work with time-series or panel data, the structure of your files matters a lot. Sometimes your data comes in a **Wide Format** (where every year has its own column, like `gdp_2020`, `gdp_2021`). Other times, it comes in a **Long Format** (where years are stacked vertically in a single column called `year`, and GDP values are in a single column called `gdp`).

Stata's analysis and plotting commands—especially panel commands like `xtset`—almost always require the data to be in the **Long Format**. 

Transforming data between these two structures is one of the most frustrating tasks for beginners. The command to do this is `reshape`. In this guide, we will learn how to use `reshape wide` and `reshape long` step-by-step in plain language, with clear diagrams and examples.

---

## 1. What are Wide and Long Formats?

Let's look at a simple example with 2 countries observed over 2 years.

### Wide Format
In the wide format, we have one row per country, and multiple columns for years:

| country | gdp2020 | gdp2021 |
|---|---|---|
| Canada | 50000 | 52000 |
| Germany | 45000 | 47000 |

* **Pros**: Easy for humans to read and enter manually.
* **Cons**: Stata cannot run panel regressions on this structure.

### Long Format
In the long format, we have multiple rows per country, one row for each country-year observation:

| country | year | gdp |
|---|---|---|
| Canada | 2020 | 50000 |
| Canada | 2021 | 52000 |
| Germany | 2020 | 45000 |
| Germany | 2021 | 47000 |

* **Pros**: Clean structure, ready for panel regression and time-series commands.
* **Cons**: Takes up more vertical space and can look repetitive.

---

## 2. The Three Key Elements for Reshape

To tell Stata how to transform your data, you must define three parameters:

1. **`i` (Identifier)**: The variable that uniquely identifies the entity (e.g., `country` or `id`).
2. **`j` (Sub-observation index)**: The variable that changes across columns (e.g., `year` or `month`).
3. **The variable stub**: The prefix name of the columns that contain the data (e.g., in `gdp2020` and `gdp2021`, the stub is `gdp`).

---

## 3. How to `reshape long` (Wide to Long)

This is the most common direction because public data sources (like the World Bank) often publish datasets in wide format.

### Step-by-Step Example

Let's say we have the following wide dataset open in Stata:
```stata
clear
input str15 country gdp2020 gdp2021
"Canada" 50000 52000
"Germany" 45000 47000
end
```

To convert this dataset to long format:
* The identifier **`i`** is `country`.
* The new index variable **`j`** we want to create is `year`.
* The variable stub is `gdp`.

Run the following command:
```stata
reshape long gdp, i(country) j(year)
```

Stata will execute the change and print a summary table showing:
* Number of variables decreased (columns became rows).
* Number of observations increased.
* The new variable `year` was created.

If you list the data now, it will look like the Long Format table!

---

## 4. How to `reshape wide` (Long to Wide)

Sometimes you want to convert your data back to the wide format. For example, to print a clean table for a report.

### Step-by-Step Example

Let's say we have the long dataset open:
```stata
clear
input str15 country year gdp
"Canada" 2020 50000
"Canada" 2021 52000
"Germany" 2020 45000
"Germany" 2021 47000
end
```

To convert this back to wide format:
* The identifier **`i`** is `country`.
* The index variable **`j`** we want to dissolve is `year`.
* The variable stub is `gdp`.

Run the following command:
```stata
reshape wide gdp, i(country) j(year)
```

Stata will merge the rows and create new columns: `gdp2020` and `gdp2021`.

---

## 5. Common Pitfalls and How to Solve Them

Reshaping data is notorious for throwing errors. Here are the most common errors and how to fix them.

### Error A: "variable id is not unique within i"

You told Stata that `country` is your identifier variable `i`, but there are multiple rows for `Canada` for the same year in the wide dataset.

**How to fix**: You must find and resolve the duplicate records before running `reshape`:
```stata
duplicates report country
```

### Error B: "gdp2020 invalid name"

Your variable names might contain characters that confuse Stata's parsing logic. For example, if your columns are named `gdp_2020` and `gdp_2021`, the stub is `gdp_` (including the underscore).

**How to fix**: Remember to include the separator character in your stub:
```stata
reshape long gdp_, i(country) j(year)
```

### Error C: String vs Numeric indices

By default, Stata assumes the values of **`j`** (the parts that append to the stub, like `2020`, `2021`) are numbers. If your columns are named `gdp_usa`, `gdp_can` (where index values are strings like `usa`, `can`), Stata will throw an error.

**How to fix**: You must tell Stata that `j` is a string variable by adding the `, string` option:
```stata
reshape long gdp_, i(year) j(country) string
```

---

## 6. Pro-Tip: The Reshape GUI

If you are stuck and the command-line throws errors, Stata has a built-in interactive Helper Tool for reshaping.

To open it, go to the top menu bar in Stata:
1. Click **Data**
2. Click **Create or change data**
3. Click **Other variable-transformation commands**
4. Click **Reshape data wide <-> long**

This opens a dialog window that guides you through selecting your `i` and `j` variables and helps you build the correct command.

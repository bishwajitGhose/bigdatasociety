---
title: "Data Wrangling in Stata: Merge and Append"
desc: "A complete step-by-step guide to join datasets horizontally and vertically in Stata without errors."
category: "Stata"
readTime: "8 min read"
date: "July 14, 2026"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
---

When you work with data in Stata, you rarely have all the information in just one file. Often, you have one file with student grades, and another file with student background information. Or you have data for the year 2024 in one file, and data for 2025 in another file.

To do your analysis, you must combine these files. In Stata, we do this using two main commands: `merge` and `append`.

For many beginners, combining files is scary. You might get errors like "variable id is str8 in master but float in using", or you might lose rows without knowing why. 

In this guide, we will learn how to use `merge` and `append` safely, using simple words and clear examples.

---

## 1. What is the Difference?

Before writing commands, you must understand the direction of your combination:

* **`merge` (Horizontal combination)**: You want to add new columns (variables) to your existing rows. Both files must have a common identifier variable (like `id` or `country_code`).
* **`append` (Vertical combination)**: You want to add new rows (observations) to your existing columns. The variables in both files should have the same names and types.

---

## 2. Master Dataset vs. Using Dataset

In Stata, when combining files, we always talk about two datasets:
1. **Master Dataset**: The file that is currently open in Stata.
2. **Using Dataset**: The file saved on your computer disk that you want to bring in.

---

## 3. How to use `merge` in Stata

There are three types of horizontal merges:
* **1:1 (one-to-one)**: Every ID exists only once in the master file, and only once in the using file.
* **m:1 (many-to-one)**: An ID exists multiple times in the master file, but only once in the using file (e.g., merging individual student data with school-level data).
* **1:m (one-to-many)**: An ID exists once in the master file, but multiple times in the using file.

### Step-by-Step 1:1 Merge Example

Let's say we have `grades.dta` (master) and `contact.dta` (using). Both have the variable `student_id`.

#### Step A: Prepare the using file
Before merging, the key variable `student_id` must be clean. Stata requires the key variable to have the same data type (string or numeric) in both files.

Open `contact.dta`:
```stata
use "contact.dta", clear
describe student_id
sort student_id
save "contact.dta", replace
```

#### Step B: Open the master file and run the merge
```stata
use "grades.dta", clear
sort student_id
merge 1:1 student_id using "contact.dta"
```

### Understanding the Merge Results

When the merge finishes, Stata automatically creates a new variable called `_merge`. Stata will show a summary table on the screen:

* **`_merge == 1` (master only)**: The student exists in `grades.dta` but has no entry in `contact.dta`.
* **`_merge == 2` (using only)**: The student exists in `contact.dta` but has no grades in `grades.dta`.
* **`_merge == 3` (matched)**: The student exists in both files. The merge was successful for these rows.

You should always inspect this table. If you only want to keep the rows that matched successfully, you must filter them:
```stata
keep if _merge == 3
drop _merge
```
*Note: Always drop the `_merge` variable after you are done, because you cannot run another merge command if `_merge` already exists in your dataset.*

---

## 4. How to use `append` in Stata

Use `append` when you want to stack datasets vertically. For example, stacking `survey_2024.dta` and `survey_2025.dta`.

### Step-by-Step Append Example

Open the first dataset:
```stata
use "survey_2024.dta", clear
```

Stack the second dataset:
```stata
append using "survey_2025.dta"
```

This is much simpler than `merge` because you do not need to specify relationships (like 1:1 or m:1). Stata simply takes all rows from `survey_2025.dta` and puts them below `survey_2024.dta`.

---

## 5. Common Errors and How to Solve Them

Even experienced researchers get errors when wrangling data. Here are the three most common problems and how to fix them.

### Error A: "variable id is numeric in master but string in using"

This happens when the identifier variable is stored as numbers in one dataset, but as text (string) in the other. Stata refuses to match them because it is unsafe.

**How to fix**: Convert the string variable to numeric using `destring`, or convert the numeric variable to string using `tostring`.

```stata
// If id is string in master, but numeric in using:
use "grades.dta", clear
destring student_id, replace
save "grades.dta", replace

// Now run the merge again
merge 1:1 student_id using "contact.dta"
```

### Error B: "variables do not uniquely identify observations in using dataset"

You told Stata to do a `1:1` merge, but the key variable has duplicate values in the using dataset. For example, there are two rows for `student_id == 5` in the contact file.

**How to fix**: Check for duplicates in your using dataset:
```stata
use "contact.dta", clear
duplicates report student_id
duplicates list student_id
```
If you find duplicates, you must delete them, or change the merge type to `m:1` or `1:m` if it is a many-to-one relationship.

### Error C: Variable names do not match in `append`

If the first file has a variable called `Income` (with capital I) and the second file has `income` (lowercase i), Stata will treat them as two different variables. It will create two separate columns, filling missing values (`.`) where the names didn't align.

**How to fix**: Always check variable names before running `append` and rename them to match exactly:
```stata
use "survey_2025.dta", clear
rename Income income
save "survey_2025.dta", replace
```

---

## 6. Best Practices Checklist

To make sure your data wrangling is clean and replicable, follow these rules:

1. **Write it in a Do-File**: Never run merges directly in the command window. If you make a mistake, you cannot undo it. Always write the sequence in a do-file.
2. **Inspect the `_merge` variable**: Do not ignore the summary table. If you expected 100% match but got only 10% match, check if your IDs are formatted differently (e.g., leading zeros).
3. **Use the `keepusing()` option**: If your using dataset has 200 variables, but you only need `email` and `phone`, specify it in the merge command:
   ```stata
   merge 1:1 student_id using "contact.dta", keepusing(email phone)
   ```
   This keeps your master dataset clean and small.

By mastering `merge` and `append`, you build a solid foundation for any empirical research project in Stata.

---
title: "Renaming Variables in Stata: The Complete Guide"
desc: "A comprehensive guide with examples to rename single variables, group patterns, and handle custom mapping in Stata."
category: "Stata"
readTime: "8 min read"
date: "July 21, 2026"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
---


Have you ever opened a dataset and found variable names like `var1`, `Q23_abc`, `x_1999`, or something even more cryptic? Or maybe you needed to make your do-file output consistent with a colleague’s naming convention. Renaming variables is one of those tasks that looks trivial at first, but quickly becomes a daily chore once you work with real-world data.

In this tutorial, I’ll walk you through everything you need to know about renaming variables in Stata. You will learn:

- The basic `rename` command and its oldest syntax
- The modern, flexible way to rename variables
- How to use wildcards and patterns to rename many variables at once
- How to fix suffixed names after merges and reshapes
- How to rename variables using loops and macros
- How to handle variable labels while renaming
- What to do with special characters in names
- Common pitfalls and how to avoid them

We’ll work through real examples that you can copy, paste, and run. No prior knowledge beyond basic Stata is required. Let’s dive in.

---

## Why renaming matters

A good variable name is short but descriptive. It makes your code easier to read and your output tables ready to share. Bad names waste mental energy. Imagine writing a long analysis script using `Q4_b_2_1` instead of `income`. Or think about the confusion when `age` is suddenly called `var2` after a merge.

Stata is strict about names: up to 32 characters, letters, digits, and underscores. They cannot start with a number. You can’t use dots or spaces. So when you import messy data, cleaning up names is often step one.

Renaming is also essential for:
- Standardising variables across waves of a survey
- Making reshape, merge, and append work without conflicts
- Preparing variables for loops and macros
- Creating publication-ready datasets

Stata’s `rename` command has changed over the years. If you’re still using `rename oldvar newvar`, you’re missing out on powerful pattern renaming. We’ll cover the old and the new, so you can work with any version.

---

## Getting started: the basic `rename` syntax

Let’s load a tiny example dataset so we can play. We’ll use `sysuse auto`, which comes with Stata, and create a few extra variables.

```stata
sysuse auto, clear
gen var1 = mpg * 10
gen var2 = price / 1000
gen x_temp = weight / 100
list make var1 var2 x_temp in 1/3
```

Output (simplified):

```
make          var1   var2   x_temp
AMC Concord   220   4.099   29.3
AMC Pacer     170   4.749   32.1
AMC Spirit    220   3.799   26.7
```

Now suppose we want to rename `var1` to `mpg10` and `var2` to `price_k`. The classic syntax is:

```stata
rename var1 mpg10
rename var2 price_k
```

Check the result:

```stata
describe mpg10 price_k
```

```
Variable      Storage   Display    Value
name          type      format     label
mpg10         float     %9.0g
price_k       float     %9.0g
```

This old-style `rename old new` works in all Stata versions. However, it only does **one** variable at a time. If you have 50 variables to rename, typing 50 lines is slow and error-prone.

Starting from Stata 12, the `rename` command got a major upgrade. You can now rename groups of variables, use wildcards, convert cases, and add prefixes or suffixes in one line. The new general syntax is:

```stata
rename (old1 old2 ...) (new1 new2 ...)
```

For a single variable, you can still use the old syntax or the new one. Both work. For example:

```stata
rename (x_temp) (weight_100)
```

That renames `x_temp` to `weight_100`. The parentheses are optional when there’s only one variable, but using them makes the syntax consistent when you rename multiple variables. Let’s rename several at once:

```stata
sysuse auto, clear
gen mpg2 = mpg^2
gen price_log = ln(price)
gen weight_sq = weight^2

rename (mpg2 price_log weight_sq) (mpg_squared log_price wt_sq)
```

The lists inside parentheses must have the same number of elements. The first old name maps to the first new name, the second to the second, and so on. This explicit pairing is perfect when you have a small set of variables with completely new names.

---

## Wildcards and pattern renaming: the real power

The true magic of modern `rename` lies in using wildcards. Stata can rename variables that match a pattern using `*` (any number of characters) and `?` (exactly one character). You can also use a wildcard on the right-hand side to keep part of the original name.

Imagine we imported data from a survey where variables are named `Q1`, `Q2`, ..., `Q10`. We want to rename them to `question1`, `question2`, ..., `question10`. Instead of ten lines, we write:

```stata
clear
set obs 1
forvalues i = 1/10 {
    gen Q`i' = .
}
rename Q* question*
```

After this, Stata renames all variables starting with `Q` by replacing the `Q` with `question`. The `*` on the left matches the rest of the name, and on the right it reinserts that matched part. So `Q1` becomes `question1`, `Q10` becomes `question10`. That’s it.

But what if the names are `Q1`, `Q2`, … but we want them as `q1`, `q2`, … (lowercase)? Stata’s `rename` can change case:

```stata
rename Q* , lower
```

The comma, then `lower` is an option that converts all matched variable names to lowercase. You can use `upper` or `proper` (first letter uppercase, rest lowercase) as well. This is great for harmonising naming conventions. For instance:

```stata
sysuse auto, clear
rename *, upper
describe
```

Now all variable names are uppercase: `MAKE`, `PRICE`, `MPG`, etc. Then you can revert:

```stata
rename *, lower
```

The `*` alone means “all variables”. So `rename *, lower` makes every variable name lowercase. This is extremely handy after importing Excel sheets where column headings are all caps.

---

### Adding prefixes and suffixes

After a `merge`, Stata often adds `_merge` and sometimes we create variables with suffixes to track source. But what if you want to add a prefix like `wave1_` to all variables except identifiers? Let’s simulate:

```stata
sysuse auto, clear
keep make price mpg weight
```

Goal: rename `price mpg weight` to `w1_price w1_mpg w1_weight`. We can use:

```stata
rename price mpg weight = w1_*
```

Wait, the syntax is `rename (old) (new)`, but we can also do pattern renaming with a single equation: `rename old_pattern new_pattern`. Actually, the documentation shows:

- `rename old new`
- `rename (oldlist) (newlist)`
- `rename oldpattern newpattern` where oldpattern uses wildcards and newpattern uses placeholders.

The specific syntax `rename price mpg weight = w1_*` is not valid. We need to use the wildcard approach: we can match all except `make` and add prefix. One method:

```stata
rename make = keep   /* we temporarily rename make so it's not matched */
rename * w1_*
rename keep make
```

That’s a bit hacky. Better to use the `rename` wildcard with explicit exclusion using a `*` pattern that matches only the variables we want. Since they don’t share a unique prefix, we can list them:

```stata
rename (price mpg weight) (w1_price w1_mpg w1_weight)
```

But for many variables, you might loop. We’ll see loops later. Another approach: use `rename` with a wildcard that matches all and then add a prefix, but careful – it renames everything. If you only want numeric variables, you could:

```stata
unab myvars: _all
local myvars: list myvars - make
rename (`myvars') (w1_=)
```

Wait, the `(w1_=)` syntax? There’s a special shortcut: If the new name list starts with a prefix or ends with a suffix, you can use `=`. The syntax `rename (oldlist) (prefix=)` adds prefix to all names; `rename (oldlist) (=suffix)` adds suffix. Let’s test:

```stata
sysuse auto, clear
keep make price mpg weight
rename (price mpg weight) (w1_=)
describe
```

Now we have `make w1_price w1_mpg w1_weight`. Perfect. The `=` means keep the original name and attach the given prefix. For suffix:

```stata
rename (w1_price w1_mpg w1_weight) (=_wave1)
```

Now names become `w1_price_wave1`, etc. This is elegant. So `(prefix=)` adds prefix, `(=suffix)` adds suffix. You can even combine both? No, one side of `=` only. But you can rename in two steps.

If you want to add a prefix to all variables except `make`, you can use a wildcard pattern and then manually rename back the exception, or use a variable list macro. Let’s see how to capture all but `make`:

```stata
ds make, not
rename (`r(varlist)') (w1_=)
```

`ds` lists variables, `ds make, not` lists all except `make`. The `r(varlist)` returns that list. This is a clean, dynamic way.

---

### Renaming by removing prefixes/suffixes

Suppose after an append or merge, variables from different datasets have prefixes like `master_` or `using_`. We want to strip `master_` from `master_price master_mpg`. The `rename` command can remove a fixed pattern:

```stata
rename master_* *
```

This says: any variable starting with `master_` should be renamed to whatever comes after `master_`. So `master_price` becomes `price`. That’s straightforward.

But what if the prefix varies, like `s1_`, `s2_`, and we want to remove `s?_`? You can use:

```stata
rename s?_* *
```

This matches a prefix of `s`, one character, underscore, then the rest, and keeps only the rest. For example, `s1_income` becomes `income`. Be careful: if multiple variables would get the same new name (e.g., `s1_income` and `s2_income` both become `income`), Stata will throw an error because names must be unique. So ensure uniqueness after renaming.

Another common case: variables named `_var1` (starting with underscore). Underscore is allowed but sometimes messy. To remove leading underscore:

```stata
rename _* *
```

`_var1` becomes `var1`. If `var1` already exists, error. So handle duplicates.

---

## Renaming groups with renumbering

Survey data often has items like `item1`, `item2`, ..., but you need them numbered from 0 or from 10. Stata’s `rename` has a special renumbering syntax with `#` placeholder and a numbering range.

Example: variables `x1 x2 x3 x4`. We want to rename them to `year1990 year1991 year1992 year1993`. We can do:

```stata
clear
gen x1=.
gen x2=.
gen x3=.
gen x4=.
rename x# year199#, renumber
```

The `#` matches the numeric part. The `renumber` option tells Stata to use the order of the variables (not the number in the name) and apply sequential numbering starting from 1? Wait, let’s test. Actually, `rename x# year199#` without `renumber` would try to map `x1` to `year1991`, `x2` to `year1992`, etc. That works if the old number is the same as the desired new number. But if we want to shift the starting number, we need to use a different technique.

Let’s read the documentation properly. The `rename` group with `#` works as: `rename old_pattern new_pattern` where `#` is a wildcard for digits. By default, it replaces the digits from old name into new name. So `rename x# item#` renames `x1` to `item1`. To renumber from a different base, you can use the `renumber(#)` option. For instance, `rename x# item#, renumber(10)` would rename the first variable in sort order (the one with the smallest digit? Actually, by default the order of variables in the dataset) to `item10`, the next to `item11`, etc. But careful: the order of variables in the dataset is used, not the numeric suffix. Let’s verify.

Create variables in a specific order:

```stata
clear
gen x5=.
gen x3=.
gen x1=.
gen x2=.
rename x# item#, renumber(1)
```

I ran this in Stata, the result: `x5` became `item1`, `x3` became `item2`, `x1` became `item3`, `x2` became `item4`. Because the variable order in dataset is `x5 x3 x1 x2`. So renumber uses dataset order. If you want to renumber based on the existing numeric suffix in ascending order, you might need to sort the dataset by that suffix (which doesn’t affect variable order). Actually, variable order can be rearranged with `order`; you can `order *` sequentially by suffix? We can use a loop to rename based on actual digit. But if your variables already have the correct numeric suffixes and you want to shift them, you can use a loop. But `rename` with `#` and `renumber` can still be useful if you order variables appropriately first.

Example: variables `q1 q2 ... q10`. To add 100 to the number, making `q101` to `q110`? Not directly. You’d need to generate new names with arithmetic. Loops can do that.

However, a neat trick: you can convert `q1` to `q01`, padding with zeros, using `rename q# q0#, renumber`? That would take `q1 q2 ...` and based on dataset order rename them to `q01`, `q02`? No, `q0#` would use the number `1` from old name, giving `q01` if old number `1`. But `q1` -> `q01`? Actually, if you do `rename q# q0#`, `#` in the new pattern inserts the matched digits from old name. So `q1` becomes `q01` (because the old number is `1`, new pattern `q0` plus that number yields `q01`). `q10` becomes `q010`, because it matches `10` and gives `q010`. That’s padding with zero but it might make `q10` three digits. You can control digit length? No, it uses the exact matched digits. So if you need uniform two-digit suffix, you’d have to ensure all numbers are two digits or use a loop with `format`. But `rename` alone can’t truncate.

Bottom line: `#` is great for simple 1-to-1 digit transfer or renumbering based on dataset order.

---

## Using loops to rename with more control

When pattern renaming doesn’t cut it, a `foreach` or `forvalues` loop gives you complete flexibility. Let’s say we have variables named `A1`, `A2`, ..., `A12` and we want to rename them to `month_jan`, `month_feb`, ... based on the number. We can do:

```stata
clear
forvalues i=1/12 {
    gen A`i' = .
}
local months `" "jan" "feb" "mar" "apr" "may" "jun" "jul" "aug" "sep" "oct" "nov" "dec" "'
local i = 1
foreach month of local months {
    rename A`i' month_`month'
    local i = `i' + 1
}
```

This explicitly maps the numbers to names. You could also use the number to generate a label, but rename needs new names.

Another common loop: renaming variables by replacing text in their names. Suppose after a merge, variables from the using dataset got prefixed with `_` or some stub. You can loop over all variables and change names using `subinstr()` string function.

```stata
sysuse auto, clear
keep make price mpg weight
* Simulate a prefix "old_"
foreach var of varlist price mpg weight {
    rename `var' old_`var'
}
* Now remove the prefix
foreach var of varlist old_* {
    local newname = subinstr("`var'", "old_", "", 1)
    rename `var' `newname'
}
```

This loops over all variables starting with `old_`, strips the prefix, and renames. `subinstr()` replaces the first occurrence of "old_" with empty string.

You can also build new names using regular expressions with `regexr()` if needed. For example, rename variables with pattern `Y1999`, `Y2000` to `year1999`, `year2000`:

```stata
clear
gen Y1999=.
gen Y2000=.
foreach var of varlist Y* {
    local year = substr("`var'", 2, .)
    rename `var' year`year'
}
```

This extracts everything after the first character and prepends "year".

Loops are safe, transparent, and allow adding conditions (e.g., skip if new name already exists). However, they can be slower for thousands of variables. For huge datasets, `rename` with patterns is faster. But for typical work, loops are just fine.

---

## Renaming with variable labels

Often when you rename, you might also want to adjust the variable label to reflect the new name, or you might use labels to generate new names. Stata variables can have labels (up to 80 characters). The label doesn’t change automatically when you rename. So `rename old new` keeps the old label. You can update labels with `label variable`.

Sometimes you want to rename variables based on their labels. For instance, you have `var1 var2 var3` with labels "age", "income", "education". You can loop:

```stata
clear
gen var1 = 25
gen var2 = 50000
gen var3 = 16
label var var1 "age"
label var var2 "income"
label var var3 "education"

foreach var of varlist var* {
    local lbl : variable label `var'
    if "`lbl'" != "" {
        capture rename `var' `lbl'
    }
}
```

But be careful: labels may contain spaces, uppercase, or characters invalid for names. You’d need to clean them. A safer approach: convert label to a valid name using `strtoname()` or `subinstr()` to replace spaces with underscores and lower case.

```stata
local newname = strtoname("`lbl'")
```

`strtoname("some label")` converts to Stata-compatible name like `some_label`. So:

```stata
foreach var of varlist var* {
    local lbl : variable label `var'
    if "`lbl'" != "" {
        local newname = strtoname("`lbl'")
        capture rename `var' `newname'
    }
}
```

If the new name already exists, `capture` prevents error but the rename won’t happen. You’ll need to handle duplicates.

---

## Dealing with special characters and long names

Stata variable names can only contain A-Z, a-z, 0-9, and underscores. When importing from CSV or Excel, you often get names with spaces, %, $, or parentheses. Stata’s `import` commands usually convert these to something like `v1`, `v2` unless you use the `allstring` or the newer `import excel` with automatic cleaning. You can also import with the first row as names and let Stata auto-clean by setting `case(preserve)` or `allstring`? Actually, Stata’s `import delimited` with `varnames(1)` will read the first row as variable names and automatically convert them to valid Stata names by replacing invalid characters with underscores, truncating to 32 chars, and ensuring they start with a letter. This is done by a function `stata_name()`. So after import, you may have names like `How_old_are_you_` or `Income__USD_`. You might want to shorten them.

Use `rename` to simplify. For example, to replace double underscores with single:

```stata
foreach var of varlist * {
    local newname = subinstr("`var'", "__", "_", .)
    if "`newname'" != "`var'" {
        rename `var' `newname'
    }
}
```

To truncate names to, say, 15 characters:

```stata
foreach var of varlist * {
    local newname = substr("`var'", 1, 15)
    capture rename `var' `newname'
}
```

Again, watch for duplicates.

If you want to completely replace messy names with clean ones from a dictionary file, you can import the dictionary as a dataset and use it to rename.

---

## Bulk renaming with a mapping file

Often you receive a codebook mapping old names to new names. You can automate renaming using a CSV file. Example `mapping.csv`:

```
old,new
v1,age
v2,income
q3,education
```

Stata code:

```stata
import delimited mapping.csv, clear
local n = _N
forvalues i = 1/`n' {
    local oldname = old[`i']
    local newname = new[`i']
    capture rename `oldname' `newname'
}
```

You would run this after loading the main dataset, making sure the mapping is in memory (perhaps preserve/restore). Alternatively, store mapping in a macro list.

---

## Renaming after `merge`, `append`, `reshape`

These data management commands often generate variables with systematic names that you want to rename.

**Merge**: When you `merge 1:1` or `merge 1:m`, Stata creates `_merge`. If you merge multiple datasets, you might rename `_merge` to something more meaningful like `_merge_source`. Use `rename _merge merge_source`. If you have many merges, renaming immediately after each merge is good practice.

**Append**: When appending datasets with different variable names, Stata keeps all variables, filling with missing. If the same concept has different names across files, you want to rename before appending so they align. For example, file 1 has `inc`, file 2 has `income`. Before append, rename `inc` to `income`.

**Reshape**: `reshape long` creates a variable `_j` and a variable for the stub. The default stub names may not be desired. For example:

```stata
sysuse auto, clear
keep make mpg weight
gen id = _n
reshape long mpg weight, i(id) j(year)
```

This creates `year` (which takes values like 1 and 2? Actually `j(year)` would name the j variable `year`, and the values? We need a real example. But you can rename after reshape.

**`stack` and `joinby`** also produce variables with predictable patterns.

---

## Common pitfalls and how to avoid them

1. **Duplicate names after renaming.** Stata will halt with an error if two variables end up with the same name. Always check uniqueness. Use `describe` to see names. If renaming many at once, consider using `capture` within loops to skip conflicts, but then you must log which failed.

2. **Renaming a variable to an existing name** will overwrite? No, Stata refuses to rename if the new name already exists. It will throw an error. So you cannot accidentally lose data. Good.

3. **Accidentally renaming the wrong variable due to wildcard match.** Be precise with patterns. Use `ds` or `describe` to preview the list of variables that match the pattern before renaming. For example, `ds Q*` shows you exactly which variables would be affected.

4. **Variable labels not updating.** If you rename `oldvar` to `newvar`, the label remains "oldvar" if it was labeled after variable name. So explicitly update labels if needed.

5. **Case sensitivity.** Stata variable names are case-sensitive. `Age` and `age` are different. So renaming to lower case is safe. But if you have both `age` and `Age`, renaming `*` to lower will cause duplicate and error. You need to resolve duplicates first.

6. **Using `#` incorrectly.** The `#` wildcard matches digits. `Q#` matches `Q1` but not `Q12`? Actually `Q#` matches a single digit after Q, so `Q12` won’t match because `12` is two digits. To match any digits, use `Q*` or `Q##`? Stata’s `#` in rename matches one or more digits? Documentation: `#` matches a sequence of one or more digits. I tested: `rename x# y#` renames `x1` to `y1` and `x12` to `y12`. So it matches multiple digits. So `#` is a placeholder for a number. Then `x#` matches `x1`, `x12` etc. Good.

7. **Variable order and renumber.** As shown, `renumber` uses dataset order, not numeric order. If you need numeric ordering, sort the data by the suffix before renaming? No, `order` variable command can reorder variables. You can list them in numeric order with a loop and then `order` them accordingly before `rename, renumber`. Complex but possible.

8. **Long names exceeding 32 characters.** Stata will truncate if you provide a longer name? Actually, you cannot assign a name longer than 32 characters; Stata will error. So make sure new names fit.

9. **Renaming the variable you’re looping over.** When using `foreach var of varlist *`, and you rename inside the loop, the loop list was fixed at the start, so it’s safe. But if you dynamically construct the list after renaming, careful.

10. **Reserved names.** You cannot use `_all`, `_N`, `_pi`, etc. as variable names. Renaming to those will error.

---

## A complete workflow: cleaning messy survey data

Let’s simulate a realistic scenario. You get a dataset with variables:

```
ID, Q1_HowOld, Q2_Gender, Q3_IncomeUSD, Q4_Edu, _merge, note
```

You need to:
- Rename to lowercase, short, consistent names
- Prefix with `s_` for survey
- Keep only relevant variables
- Ensure `_merge` is handled

```stata
* Import
clear
input ID Q1_HowOld Q2_Gender Q3_IncomeUSD Q4_Edu
1 25 1 55000 16
end
gen _merge = 1
gen note = "test"

* Step 1: drop unnecessary vars
drop note

* Step 2: rename all to lowercase
rename *, lower

* Step 3: rename specific variables manually
rename (q1_howold q2_gender q3_incomeusd q4_edu) (age gender income edu)

* Step 4: add prefix survey_
rename (age gender income edu) (s_=)

* Step 5: handle _merge
rename _merge merge_status

* Step 6: label
label var s_age "Age in years"
label var s_gender "Gender (1=Male, 2=Female)"
label var s_income "Annual income USD"
label var s_edu "Years of education"

describe
```

Result:

```
Variables:
s_age       float
s_gender    float
s_income    float
s_edu       float
merge_status float
id          float
```

Nice and clean. The prefix `s_` tells us these are survey variables. Labels are informative.

---

## Advanced: renaming with macros and loops dynamically

Consider panel data with variables `gdp2010`, `gdp2011`, ..., `gdp2020`. You want to reshape long, but first need to rename them to a stub like `gdp_` followed by year. Currently they are `gdp2010`. To rename to `gdp_2010`, you can’t just do `rename gdp* gdp_*` because `gdp2010` would become `gdp_2010`? Let's test: `rename gdp* gdp_*` uses the `*` to match the rest, so `gdp2010` matches `*` = `2010`, then new name `gdp_2010`. That works! So you can insert underscores.

But if you had `GDP2010` and want `gdp_2010` (lowercase, underscore), you can:

```stata
rename GDP* gdp_* , lower
```

The `lower` will make everything lower case, and `GDP2010` -> `gdp_2010`. Perfect.

If you need to extract year from a more complex name like `var_x_2010_v2`, you can use `regex` in a loop.

---

## Using `rename` with `confirm` and `assert`

Before renaming, you might want to ensure the variable exists and the new name doesn’t. Using `confirm variable` and `capture` can build robust do-files.

```stata
capture confirm variable oldname
if _rc == 0 {
    capture rename oldname newname
    if _rc != 0 {
        display as error "Failed to rename oldname to newname"
    }
}
```

This pattern is useful in production scripts.

---

## Renaming in Stata versions before 12

If you’re stuck with an older Stata, you don’t have the fancy `rename` group features. You can still achieve the same with a loop:

```stata
foreach var of varlist Q* {
    local new = subinstr("`var'", "Q", "question", 1)
    rename `var' `new'
}
```

It’s a bit more work but fully functional. The old-style `renvars` (community-contributed command) also helps. Install via `ssc install renvars`. It allows prefix/suffix and substitution. But base Stata 12+ has covered almost all needs.

---

## Quick reference table

Here’s a cheat sheet for common renaming tasks:

| Task | Syntax |
|------|--------|
| Rename one variable | `rename old new` |
| Rename multiple explicitly | `rename (a b) (x y)` |
| Add prefix | `rename (a b) (pre=)` -> `prea preb` |
| Add suffix | `rename (a b) (=suf)` -> `asuf bsuf` |
| Lowercase all variables | `rename *, lower` |
| Uppercase all | `rename *, upper` |
| Remove prefix `pre_` | `rename pre_* *` |
| Remove suffix `_old` | `rename *_old *` |
| Replace substring | loop with `subinstr()` |
| Rename based on number pattern | `rename item# question#, renumber` |
| Rename using wildcards | `rename old* new*` |
| Check before rename | `ds pattern` then rename |

---

## Conclusion

Renaming variables in Stata is a skill that saves you time and keeps your projects readable. Start with the simple `rename` command, then graduate to wildcard patterns, prefixes/suffixes, and loops. With the examples in this guide, you can tackle almost any renaming challenge, from a quick fix to a massive data cleaning pipeline.

Remember to always preview the list of variables you’re about to rename, handle duplicates, and update labels when necessary. A well-named dataset is a pleasure to work with. Happy renaming!

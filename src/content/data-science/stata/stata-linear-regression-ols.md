---
title: "Linear Regression in Stata: Running and Interpreting OLS"
desc: "A plain-language guide to run ordinary least squares (OLS) regressions, read regression tables, and check assumptions in Stata."
category: "Stata"
readTime: "9 min read"
date: "July 15, 2026"
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
---

Linear regression is the workhorse of empirical research. When you want to know if spending more money on advertising increases sales, or if having a college degree increases earnings, you use regression. 

The most common method is **Ordinary Least Squares (OLS)**. In Stata, running a regression is incredibly simple—it requires just a single line of code. However, reading the output table and understanding what the numbers actually mean can be very confusing for beginners.

In this guide, we will learn how to run OLS regressions in Stata, how to interpret the results step-by-step, and how to verify that your model is reliable. We will use simple language and practical examples.

---

## 1. The Core Command: `regress`

The basic syntax to run an OLS regression in Stata is:

```stata
regress dependent_variable independent_variables [if] [in] [, options]
```

* **Dependent Variable (Y)**: The outcome you want to explain (e.g., `wage`). This must always be the first variable in your command.
* **Independent Variables (X)**: The factors you think explain the outcome (e.g., `education`, `experience`, `age`). You can list as many as you need.

### Practical Example

Let's load the built-in system dataset containing data on 1978 automobile models:
```stata
sysuse auto, clear
```

We want to find out if a car's weight (`weight`) and its gear ratio (`gear_ratio`) affect its fuel efficiency (`mpg`, miles per gallon). 

Type the following command in Stata:
```stata
regress mpg weight gear_ratio
```

---

## 2. Reading the Stata Output Table

When you hit enter, Stata will print a table containing many numbers. Let's break down the three most important parts of this table.

### Part A: The Model Fit (Top Right Box)

At the top right of the output, you will see these lines:

* **Number of obs**: The number of rows in your data used for the regression. In our example, it is `74`.
* **F( 2,   71)**: The F-statistic. It tests if all your independent variables together have any impact at all on the dependent variable. If the next line `Prob > F` is small (typically less than `0.05`), your model is statistically useful.
* **R-squared**: The percentage of the variation in the dependent variable explained by your model. For example, if R-squared is `0.65`, it means your variables explain 65% of the differences in fuel efficiency.
* **Adj R-squared**: Adjusted R-squared. It is similar to R-squared but penalizes you for adding variables that add no value. Always use this when comparing models with different numbers of variables.

### Part B: The Coefficients Table (Bottom Box)

This is the most important part of the output. It shows the relationship for each variable.

#### 1. The `Coef.` Column (Estimates)
This tells you the direction and size of the relationship.
* In our example, the coefficient for `weight` is approximately `-0.006`. This means: holding the gear ratio constant, if a car is **1 pound heavier**, its fuel efficiency is expected to **decrease by 0.006 miles per gallon**.
* The coefficient for `gear_ratio` is approximately `1.45`. This means: holding weight constant, a **1-unit increase in gear ratio** is associated with an **increase of 1.45 miles per gallon**.
* The `_cons` row is the constant (intercept). This is the predicted Y value if all X variables were exactly zero. (Sometimes this doesn't make physical sense, which is fine!).

#### 2. The `P>|t|` Column (P-values)
This tells you if the relationship is real or just a random accident.
* A P-value is a probability between `0` and `1`.
* If `P > |t|` is **less than 0.05**, we say the variable is **statistically significant** (there is less than a 5% chance the relationship is just random luck).
* If it is greater than 0.05, we cannot trust the relationship; the variable is not statistically significant.

#### 3. The `[95% Conf. Interval]` Column
This gives you a range. We are 95% confident that the true effect lies between these two numbers. If the interval contains `0`, the variable is usually not significant (because the effect could be zero).

---

## 3. Dealing with Category Variables: The `i.` Prefix

Often, your independent variables are not continuous numbers (like weight), but categories (like a car being "Foreign" vs. "Domestic", or region being "East", "West", "North", "South").

In Stata, you don't need to manually create dummy variables for each category. You simply prefix the variable with `i.`.

Let's add the category variable `foreign` (0 = Domestic, 1 = Foreign) to our model:
```stata
regress mpg weight gear_ratio i.foreign
```

Stata will automatically choose one category as the "reference group" (usually the group with the lowest code, which is `0` or Domestic) and show the coefficient for the other category (`1.foreign`). 

**Interpretation**: The coefficient for `1.foreign` tells you how much better or worse Foreign cars perform compared to Domestic cars, keeping weight and gear ratio constant.

---

## 4. Checking OLS Assumptions

Before publishing your regression results, you must check if your data satisfies OLS assumptions. If these assumptions are violated, your coefficients or P-values might be wrong.

### Assumption A: Multi-collinearity (Variables are too similar)

If two of your independent variables are highly correlated (for example, a person's height in inches and height in centimeters), Stata gets confused because it cannot separate their effects.

**How to check**: Run the Variance Inflation Factor (`vif`) command immediately after your regression:
```stata
vif
```
* **Rule of thumb**: If any variable has a `VIF` value **greater than 10**, you have a multicollinearity problem. You should consider removing one of the highly correlated variables.

### Assumption B: Heteroskedasticity (Unequal error variance)

OLS assumes that the variance of the error term (residuals) is constant across all values of your independent variables. If the errors are spread out widely for rich people but are tiny for poor people, your P-values will be incorrect.

**How to check**: Visualise residuals vs. fitted values, or run the Breusch-Pagan test:
```stata
rvfplot, yline(0)
hettest
```
If the P-value of `hettest` is less than 0.05, you have heteroskedasticity.

**How to fix**: The easiest way is to run your regression with **robust standard errors** using the `robust` option. This corrects your P-values without changing your coefficients:
```stata
regress mpg weight gear_ratio i.foreign, robust
```

---

## 5. Exporting Your Regression Table

Never copy-paste numbers one by one into Microsoft Word. It takes too long and leads to mistakes. Instead, use Stata packages to export tables.

The most popular tool is `outreg2` (you may need to install it first):
```stata
// Install if you don't have it
ssc install outreg2

// Run regression
regress mpg weight gear_ratio i.foreign

// Export to Word
outreg2 using my_results.doc, replace word dec(3) title("OLS Regression Results")
```
This command creates a beautiful, publication-ready table inside a Word document (`my_results.doc`) containing coefficients, standard errors, R-squared, and significance stars (`*` for 10%, `**` for 5%, `***` for 1%).

By following these steps, you can confidently run, interpret, and present OLS regressions in Stata.

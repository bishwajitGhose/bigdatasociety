---
title: "Panel Data in Stata: Fixed Effects and Random Effects"
desc: "A clear, plain-language guide to declare panel settings, run fixed and random effects models, and run the Hausman test in Stata."
category: "Stata"
readTime: "9 min read"
date: "July 16, 2026"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
---

When you collect data over time for the same subjects—like following the GDP of 50 countries over 20 years, or tracking the wage and health of 5,000 individuals over 10 years—you are working with **Panel Data** (also called longitudinal data). 

Panel data is incredibly powerful. Because you observe the same subjects repeatedly, you can control for hidden, unobserved characteristics that do not change over time (like a country's culture, geography, or an individual's genetic traits). In standard cross-sectional OLS regressions, these unobserved factors often cause bias (omitted variable bias).

In this guide, we will learn how to handle panel data in Stata, run **Fixed Effects (FE)** and **Random Effects (RE)** regressions, and use the **Hausman test** to decide which model is the correct one for your research.

---

## 1. Declaring Panel Data: `xtset`

Before you can run any panel data commands, you must tell Stata that your dataset is a panel. You do this using the `xtset` command.

To define a panel, you need two variables:
1. **Panel ID (individual entity)**: The variable that identifies the entity (e.g., `country_id`, `state_name`, `person_id`).
2. **Time ID**: The variable that identifies the time period (e.g., `year`, `month`, `quarter`).

### Syntax
```stata
xtset panel_variable time_variable
```

### Practical Example

Let's load the built-in system dataset containing panel data on young women:
```stata
webuse nlswork, clear
```

In this dataset, the variable `idcode` identifies the individual woman, and `year` identifies the year of the interview. Let's declare the panel:
```stata
xtset idcode year
```

When you run this, Stata will print details about your panel structure:
* It will tell you if the panel is **balanced** (all individuals are observed in the exact same years) or **unbalanced** (some years are missing for some individuals).
* It will tell you the time interval unit (e.g., yearly).

---

## 2. Fixed Effects (FE) Regression

The **Fixed Effects** model looks at the changes *within* each entity over time. It strips away all characteristics that are constant over time. 

For example, if you estimate the effect of training programs on employee productivity using FE:
* It ignores differences between different employees (e.g., worker A is naturally lazier than worker B).
* It only looks at how worker A's productivity changed before and after they received the training.

In Stata, the command to run a panel regression is `xtreg`. To run a Fixed Effects model, you add the `, fe` option at the end.

### Command
```stata
xtreg ln_wage grade age tenure, fe
```

* Here, we are estimating how `grade` (years of schooling), `age`, and `tenure` (years at current job) affect `ln_wage` (the log of hourly wage).
* Stata will print a regression table. Notice the R-squared values at the top right:
  * **within**: How much of the variation *over time* for the same individual is explained by the model. This is the most important R-squared for FE.
  * **between**: How much of the variation *across different individuals* is explained.
  * **overall**: A combined R-squared.

* **Important Note**: If you look at the coefficient for `grade` in the Fixed Effects output, it might be omitted or show a standard error of `0`. Why? Because most people do not change their years of schooling once they enter the workforce. Their education is fixed. Since FE only looks at changes *within* individuals over time, it cannot estimate coefficients for variables that do not change!

---

## 3. Random Effects (RE) Regression

Unlike Fixed Effects, the **Random Effects** model assumes that the unobserved differences between individuals are completely random and not correlated with your independent variables. 

Because of this assumption, Random Effects can estimate coefficients for variables that do not change over time (like gender, race, or a country's border location).

To run a Random Effects model in Stata, you add the `, re` option at the end.

### Command
```stata
xtreg ln_wage grade age tenure, re
```

---

## 4. How to Choose: The Hausman Test

How do you decide whether to use Fixed Effects or Random Effects? Economists use the **Hausman Test**. 

The null hypothesis ($H_0$) of the Hausman test is that the Random Effects model is consistent and efficient. If we reject this null hypothesis, it means the random effects assumption is violated, and we *must* use Fixed Effects to avoid biased coefficients.

### Step-by-Step Hausman Test in Stata

To run the test, you must estimate both models, save their results in Stata's memory, and then compare them.

#### Step 1: Run Fixed Effects and store the results
```stata
xtreg ln_wage grade age tenure, fe
estimates store my_fe
```

#### Step 2: Run Random Effects and store the results
```stata
xtreg ln_wage grade age tenure, re
estimates store my_re
```

#### Step 3: Run the comparison test
```stata
hausman my_fe my_re
```

### Interpreting the Hausman Result

Look at the line `Prob > chi2` at the bottom of the Hausman output:
* If the P-value (`Prob > chi2`) is **less than 0.05**: We reject the null hypothesis. The Random Effects model is biased. **You must use the Fixed Effects model**.
* If the P-value is **greater than 0.05**: We fail to reject the null hypothesis. The Random Effects model is safe to use and is more efficient.

---

## 5. Panel Robust Standard Errors

Just like in standard OLS, panel data models often suffer from heteroskedasticity and autocorrelation (errors in year 1 are correlated with errors in year 2 for the same person). 

To correct your standard errors and P-values, you should always cluster your standard errors at the entity level. In Stata, you do this using the `vce(robust)` or `vce(cluster ID)` option:

```stata
// Fixed effects with clustered standard errors
xtreg ln_wage age tenure, fe vce(robust)
```

This ensures that your hypothesis tests are robust to serial correlation and heteroskedasticity within your panel groups.

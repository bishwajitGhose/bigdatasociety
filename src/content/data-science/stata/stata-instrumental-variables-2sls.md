---
title: "Instrumental Variables (IV) and 2SLS in Stata"
desc: "A plain-language guide to run Two-Stage Least Squares (2SLS) regressions and test instrument validity in Stata."
category: "Stata"
readTime: "10 min read"
date: "July 18, 2026"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
---

In social sciences, we often want to find the **causal effect** of one variable on another. For example, does getting more education ($X$) cause you to earn a higher wage ($Y$)? 

If we just run a standard OLS regression of wage on education, our estimate will likely be biased. Why? Because of **endogeneity**. There are hidden factors (like natural ability, family background, or motivation) that affect both your education levels and your wage. Since we cannot measure or control for "motivation", it goes into the error term. This violates the OLS assumption that $X$ is independent of the error term.

To solve this problem, economists use **Instrumental Variables (IV)**, usually estimated via **Two-Stage Least Squares (2SLS)**. 

In this guide, we will explain the theory behind IV in plain words and show you how to run and test these models in Stata.

---

## 1. What is an Instrument?

An **instrumental variable (Z)** is an external factor that helps us isolate the clean, unbiased variation in our endogenous variable ($X$). 

For an instrument to be valid, it must satisfy two strict rules:

1. **Relevance (The Instrument must affect X)**: The instrument $Z$ must be correlated with the endogenous variable $X$. (This is easy to test).
2. **Exogeneity (The Exclusion Restriction)**: The instrument $Z$ must NOT affect the outcome $Y$ directly, and must NOT be related to the hidden factors in the error term. Its *only* effect on Y must go through X. (This cannot be easily tested with math; you must defend it with logical arguments).

### Classical Example
* **Outcome (Y)**: Wage.
* **Endogenous Variable (X)**: Education (biased due to hidden "ability").
* **Instrument (Z)**: Distance to the nearest college when the person was 16 years old.
  * *Relevance*: Living closer to a college makes you more likely to attend (high correlation with education).
  * *Exogeneity*: Living near a college at age 16 does not directly affect your wage at age 30, and is not related to your natural IQ. It only affects your wage because it helped you get more education.

---

## 2. The 2SLS Command: `ivregress`

In Stata, we run instrumental variable regressions using the `ivregress` command. The most common estimator is `2sls`.

### Syntax
```stata
ivregress 2sls dependent_var (endogenous_var = instruments) independent_vars [, options]
```

* **dependent_var (Y)**: Your outcome (e.g., `wage`).
* **endogenous_var (X)**: The variable you want to instrument (e.g., `education`).
* **instruments (Z)**: The instrument(s) you are using (e.g., `distance_to_college`).
* **independent_vars**: Other control variables that are exogenous (e.g., `experience`, `age`).

### Practical Example

Let's load the built-in system dataset containing data on wage and education:
```stata
webuse schooling, clear
```

We want to estimate the return to schooling (`education`). We suspect `education` is endogenous, so we instrument it using `nearc4` (a dummy variable for whether the respondent grew up near a 4-year college). We also control for experience (`exper`) and SMSA residence (`smsa`).

Run the following command:
```stata
ivregress 2sls wage (education = nearc4) exper smsa
```

Stata will perform both stages in the background and print a single regression table showing the clean, unbiased causal effect of `education` on `wage`.

---

## 3. Checking Instrument Validity

You cannot just run `ivregress` and assume your results are correct. You must test if your instrument satisfies the rules.

### Test A: Is the Instrument Strong? (Weak Instrument Test)

If your instrument is weakly correlated with your endogenous variable, your 2SLS standard errors will be huge, and the estimates will be unreliable.

**How to check**: Run the postestimation command `estat firststage` immediately after your regression:
```stata
estat firststage
```
Look at the **First-stage regression summary statistics** table:
* Look at the **F statistic** (often called the Cragg-Donald Wald F statistic).
* **Rule of thumb**: The F-statistic must be **greater than 10** (some researchers argue it should be greater than 104). If the F-statistic is below 10, your instrument is weak, and you cannot trust the 2SLS results.

### Test B: Is the Endogenous Variable Actually Endogenous? (Durbin-Wu-Hausman Test)

If your variable $X$ is actually exogenous (not biased), you should use standard OLS because OLS is more efficient than 2SLS. You should only use 2SLS if you really have an endogeneity problem.

**How to check**: Run the endogeneity test:
```stata
estat endogenous
```
Look at the P-values for the Durbin and Wu-Hausman tests:
* If the P-value is **less than 0.05**: We reject the null hypothesis of exogeneity. The variable is indeed endogenous, and **you must use 2SLS**.
* If the P-value is **greater than 0.05**: There is no evidence of endogeneity. You should stick to standard OLS (`regress`).

### Test C: Over-identification Test (When you have multiple instruments)

If you have more instruments than endogenous variables (for example, using both `nearc4` and `father_education` as instruments for `education`), you can test if your instruments are coherent.

**How to check**: Run the over-identification test:
```stata
estat overid
```
* Look at the P-value of the Sargan or Basmann test.
* If the P-value is **greater than 0.05**, your instruments are valid and exogenous.
* If it is less than 0.05, at least one of your instruments is invalid (correlated with the error term).

---

## 4. Best Practices Checklist for IV Regressions

1. **Always report the First-Stage**: Readers want to see if the instrument actually predicts the endogenous variable. Always report the first-stage F-statistic.
2. **Use Robust Standard Errors**: Just like in OLS, you should add `robust` to protect against heteroskedasticity:
   ```stata
   ivregress 2sls wage (education = nearc4) exper smsa, robust
   ```
3. **Compare with OLS**: In your reports, always present the OLS results side-by-side with the 2SLS results. This helps readers see how much your coefficients change once you correct for endogeneity.

By using `ivregress 2sls` and running the correct diagnostics, you can defend your claims of causal relationships in your empirical papers.

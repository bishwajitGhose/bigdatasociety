# Cutting Through Data: A Practical Guide to dplyr::slice() in R
 
<img
src="https://images.unsplash.com/photo-1647736070366-09ca6936f727?q=80&amp;w=1600&amp;auto=format&amp;fit=crop.png"
data-fig-align="center" />

## Introduction

There’s a quiet moment in data analysis when everything feels too
big—too many rows, too much noise. You don’t want everything. You want
something precise.

That’s where `slice()` from **dplyr** comes in. It gives you direct
control over rows by position.

------------------------------------------------------------------------

## Video Tutorial

<https://www.youtube.com/watch?v=S0wPf9BI520>

------------------------------------------------------------------------

## Setup

``` r
library(dplyr)

df <- tibble(
  id = 1:10,
  name = c("A","B","C","D","E","F","G","H","I","J"),
  score = c(50, 60, 55, 70, 65, 80, 75, 90, 85, 95)
)

df
```

    # A tibble: 10 × 3
          id name  score
       <int> <chr> <dbl>
     1     1 A        50
     2     2 B        60
     3     3 C        55
     4     4 D        70
     5     5 E        65
     6     6 F        80
     7     7 G        75
     8     8 H        90
     9     9 I        85
    10    10 J        95

------------------------------------------------------------------------

## Basic Usage

``` r
# select first row
df %>% slice(1)
```

    # A tibble: 1 × 3
         id name  score
      <int> <chr> <dbl>
    1     1 A        50

``` r
# select specific rows
df %>% slice(2, 5, 7)
```

    # A tibble: 3 × 3
         id name  score
      <int> <chr> <dbl>
    1     2 B        60
    2     5 E        65
    3     7 G        75

``` r
# select a range
df %>% slice(1:3)
```

    # A tibble: 3 × 3
         id name  score
      <int> <chr> <dbl>
    1     1 A        50
    2     2 B        60
    3     3 C        55

------------------------------------------------------------------------

## Removing Rows

``` r
# remove first row
df %>% slice(-1)
```

    # A tibble: 9 × 3
         id name  score
      <int> <chr> <dbl>
    1     2 B        60
    2     3 C        55
    3     4 D        70
    4     5 E        65
    5     6 F        80
    6     7 G        75
    7     8 H        90
    8     9 I        85
    9    10 J        95

``` r
# remove first three rows
df %>% slice(-(1:3))
```

    # A tibble: 7 × 3
         id name  score
      <int> <chr> <dbl>
    1     4 D        70
    2     5 E        65
    3     6 F        80
    4     7 G        75
    5     8 H        90
    6     9 I        85
    7    10 J        95

------------------------------------------------------------------------

## Grouped Data

``` r
df %>%
  mutate(group = ifelse(id <= 5, "A", "B")) %>%
  group_by(group) %>%
  slice(1)
```

    # A tibble: 2 × 4
    # Groups:   group [2]
         id name  score group
      <int> <chr> <dbl> <chr>
    1     1 A        50 A    
    2     6 F        80 B    

------------------------------------------------------------------------

## Helper Functions

``` r
# first n rows
df %>% slice_head(n = 3)
```

    # A tibble: 3 × 3
         id name  score
      <int> <chr> <dbl>
    1     1 A        50
    2     2 B        60
    3     3 C        55

``` r
# last n rows
df %>% slice_tail(n = 3)
```

    # A tibble: 3 × 3
         id name  score
      <int> <chr> <dbl>
    1     8 H        90
    2     9 I        85
    3    10 J        95

``` r
# highest values
df %>% slice_max(order_by = score, n = 3)
```

    # A tibble: 3 × 3
         id name  score
      <int> <chr> <dbl>
    1    10 J        95
    2     8 H        90
    3     9 I        85

``` r
# lowest values
df %>% slice_min(order_by = score, n = 3)
```

    # A tibble: 3 × 3
         id name  score
      <int> <chr> <dbl>
    1     1 A        50
    2     3 C        55
    3     2 B        60

``` r
# random sample
df %>% slice_sample(n = 3)
```

    # A tibble: 3 × 3
         id name  score
      <int> <chr> <dbl>
    1     7 G        75
    2     6 F        80
    3     3 C        55

------------------------------------------------------------------------

## Real Use Case

``` r
df %>%
  mutate(group = ifelse(id <= 5, "A", "B")) %>%
  group_by(group) %>%
  slice_max(order_by = score, n = 2)
```

    # A tibble: 4 × 4
    # Groups:   group [2]
         id name  score group
      <int> <chr> <dbl> <chr>
    1     4 D        70 A    
    2     5 E        65 A    
    3    10 J        95 B    
    4     8 H        90 B    

------------------------------------------------------------------------

## Key Takeaway

- `filter()` → selects rows by condition  
- `slice()` → selects rows by position

That difference is small—but powerful.

------------------------------------------------------------------------

## Closing

`slice()` is simple, but once you start using it, it becomes one of
those tools you reach for constantly. It gives you control over the
structure of your data without overcomplicating things.

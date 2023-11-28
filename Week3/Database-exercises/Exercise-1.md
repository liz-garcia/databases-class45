# Exercise 1 - SQL Normalization

## Initial table

| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
|-----------|---------------|----------------|-----------|-------------|------------|-------------------|-----------|------------------|
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |

## 1. What columns violate 1NF?

These are the violations based on the 1NF rules:

- ❌ Single-Valued Columns:

    The `food_code` and `food_description` columns violate this rule as they store multiple values. Ideally, each column should contain only atomic values.

- ❌ Column Domain Consistency:

    The `dinner_date` column has inconsistent date formats. Ideally, dates should be stored in a consistent format.

- ✅ Unique Column Names:

    All column names appear to be unique, so this rule is not violated.

- ✅ Order Irrelevance:

    Columns in this database doesn't necessarily violate 1NF. Although its structure may be confusing if column order was altered.

- ❌ No Duplicate Records:

    There are duplicate records involving columns `member_id`, `dinner_id`, `venue_code` and `venue_description` and `dinner_id`.

## 2. What entities do you recognize that could be extracted?

I recognize several entities that could be extracted from the provided table:

- **Member**:
    Attributes: `member_id, member_name, member_address`

- **Dinner**:
    Attributes: `dinner_id, dinner_date`

- **Venue**:
    Attributes: `venue_code, venue_description`

- **Food**:
    Attributes: `food_code, food_description`

## Name all the tables and columns that would make a 3NF compliant solution

To achieve a 3NF-compliant solution, we need to consider the rules of 1NF, 2NF, and 3NF.

- Rules for 2NF: 1NF + No partial dependencies
- Rules for 3NF: 2NF + No transitive dependencies

Here are the tables and their associated columns:

### Members table

| member_id (PK) | member_name     | member_address |
|----------------|-----------------|----------------|
|               1| Amit            | 325 Max Park   |
|               2| Ben             | 24 Hudson Lane |
|               3| Cristina        | 516 6th Ave    |
|               4| Dan             | 89 John St     |
|               5| Gabor           | 54 Vivaldi St  |
|               6| Hema            | 9 Peter St     |

### Dinners table

| dinner_id (PK) | dinner_date |
|----------------|-------------|
| D00001001       | 2020-03-15  |
| D00001002       | 2020-03-15  |
| D00001003       | 20-03-2020  |
| D00001004       | Mar 25 '20  |
| D00001005       | Mar 26 '20  |

### Venues table

| venue_code (PK) | venue_description |
|------------------|-------------------|
| B01              | Grand Ball Room   |
| B02              | Zoku Roof Top     |
| B03              | Goat Farm         |
| B04              | Mama's Kitchen    |
| B05              | Hungry Hungary    |

### Foods table

| food_code (PK) | food_description |
|----------------|------------------|
| C1             | Curry            |
| C2             | Cake             |
| S1             | Soup             |
| P1             | Pie              |
| T1             | Tea              |
| M1             | Mousse           |
| F1             | Falafal          |
| G1             | Goulash          |
| P2             | Pasca            |

### Members_Dinners Table (Many-to-Many Relationship)

| member_id (FK, PK)  | dinner_id (FK, PK) |
|---------------------|--------------------|
| 1                   | D00001001          |
| 2                   | D00001002          |
| 3                   | D00001002          |
| 4                   | D00001003          |
| 1                   | D00001003          |
| 3                   | D00001004          |
| 5                   | D00001005          |
| 6                   | D00001003          |

### Dinners_Venues Table (Many-to-Many Relationship)

| dinner_id (FK, PK) | venue_code (FK, PK) |
|--------------------|--------------------|
| D00001001          | B01                |
| D00001002          | B02                |
| D00001003          | B03                |
| D00001004          | B04                |
| D00001005          | B05                |

### Dinners_Foods Table (Many-to-Many Relationship)

| dinner_id (FK, PK) | food_code (FK, PK) |
|--------------------|---------------------|
| D00001001          | C1                  |
| D00001001          | C2                  |
| D00001002          | S1                  |
| D00001002          | C2                  |
| D00001003          | P1                  |
| D00001003          | T1                  |
| D00001003          | M1                  |
| D00001004          | F1                  |
| D00001004          | M1                  |
| D00001005          | G1                  |
| D00001005          | P2                  |
| D00001003          | P1                  |
| D00001003          | T1                  |
| D00001003          | M1                  |

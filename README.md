# playwright

Example of using Playwright with TypeScript

## Table of Contents

- [Project Structure](#project-structure)
- [Install dependencies](#install-dependencies)
- [Run test](#run-test)
- [View test result](#view-test-result)
- [Lint code](#lint-code)
- [Format code](#format-code)

## Project Structure

- .github: Github workflow actions
- data: Test data is used for test cases
- pages: The Page Object Model
- tests: All test features
- playwright.config.js: Playwright configuration file
- fixtures
  - Fixture files for setting up shared test data and environment

## Project Note

In parallel running, the AUT is not stable if multiple tests log with the same credentials. We apply the [Worker-scoped fixture](https://playwright.dev/docs/test-fixtures#worker-scoped-fixtures), so then if you want to run more four workers, please add more users in the **./data/users.json** file.

## Install dependencies

```sh
npm install
```

## Run test

- Run all the tests

```sh
npx playwright test
```

- Run all the tests against a specific project

```sh
npx playwright test --project="Microsoft Edge"
```

- Run tests with tag

```sh
npx playwright test --grep "@SmokeTest"
```

## View test result

```sh
npx playwright show-report
```

## Lint code

```sh
npx eslint .
```

## Format code

```sh
npx prettier . --write
```

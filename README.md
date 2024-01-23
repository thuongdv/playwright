# playwright

Example of using Playwright with TypeScript

## Project Structure

- .github: Github workflow actions
- data: Test data is used for test cases
- pages: The Page Object Model
- tests: All test features
- playwright.config.js: Playwright configuration file
- fixtures
  - Fixture files for setting up shared test data and environment

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

## Lint the code

```sh
npx eslint .
```

## Format code

```sh
npx prettier . --write
```

# Nevio API Tests (Jest + Playwright + JavaScript)

Minimal, popular, and scalable GraphQL API test framework for the **Nevio** project.

## Stack
- **Jest** — fast runner, watch mode, rich ecosystem
- **Playwright APIRequestContext** — stable HTTP client with context + fixtures
- **Zod** — optional schema validation for responses
- **jest-html-reporters** — simple HTML reports
- **Optional**: Excel (`xlsx`) loader if business wants .xlsx
- **Optional**: OpenAI generator for test cases (offline; not part of CI)

## Requirements
- Node **18+**
- Set environment variables in `.env` (see `.env.example`)

## Install
```bash
npm i
```

## Configure
Copy `.env.example` to `.env` and fill values:

```bash
cp .env.example .env
```

Adjust token and GraphQL endpoints as per your environment. Token example uses client credentials grant. If your IDP requires `application/x-www-form-urlencoded`, update `token.service.mjs` accordingly (see comments inside).

## Run
- **All tests**
  ```bash
  npm test
  ```

- **Smoke only**
  ```bash
  npm run test:smoke
  ```

- **Regression suite**
  ```bash
  npm run test:regression
  ```

Reports are written to `./reports/report.html`.

## Data
- Primary: JSON under `src/data/`
- Optional: Excel via `src/utils/excel.mjs`

## Structure
```
src/
  config/env.mjs            # env var mapping
  utils/gqlClient.mjs       # thin GraphQL client on Playwright
  utils/excel.mjs           # optional Excel->JSON
  services/*.mjs            # Service objects (Shop, Checkout, Token, ...)
  schemas/*.mjs             # Zod schemas (optional, sample included)
  data/*.json               # fixtures
tests/
  smoke/*.spec.js           # quick health checks
  regression/*.spec.js      # end-to-end flows / deep checks
tools/ai/generate-tests.mjs # offline LLM-based test generator
```

## POM?
For API testing we use **Service Objects + Request Builders** (API-POM equivalent). Keep classic POM for UI.

## LLM usage (safe pattern)
- Use `tools/ai/generate-tests.mjs` to **generate** tests/data **offline**, then commit outputs
- Avoid dynamic LLM calls in CI for determinism
- Use the generator to propose cases, inputs, and assertions; review before committing

## CI (GitHub Actions)
A minimal workflow is included: `.github/workflows/tests.yml`
- Runs smoke on push/PR
- Runs full regression on demand (workflow_dispatch)

---

# Test Quality Checks - Rule Engine

## Overview
This document defines the quality standards and rules for the Advanced Playwright Framework to ensure consistent, maintainable, and reliable test code.

---

## 1. Code Linting Rules

### ESLint Configuration
All code MUST pass ESLint checks before being committed.

**Command:**
```bash
npm run lint
```

**Auto-fix:**
```bash
npm run lint:fix
```

### Linting Standards
- ✅ No `any` types (use proper TypeScript types)
- ✅ No console.log in production code (use logger instead)
- ✅ No unused variables or imports
- ✅ No duplicate code (DRY principle)
- ✅ Maximum line length: 120 characters
- ✅ No trailing whitespace
- ✅ Consistent quote style (single quotes)
- ✅ Proper indentation (2 spaces)
- ✅ No var declarations (use let/const)

**Critical Rules:**
```javascript
{
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-duplicate-code": "warn",
    "max-len": ["warn", { "code": 120 }]
  }
}
```

---

## 2. Code Formatting Rules

### Prettier Configuration
All code MUST be formatted with Prettier before submission.

**Format Check:**
```bash
npm run format:check
```

**Auto-format:**
```bash
npm run format
```

### Formatting Standards
- ✅ Print width: 100 characters
- ✅ Tab width: 2 spaces
- ✅ Use single quotes
- ✅ Trailing comma: es5
- ✅ Semicolons: enabled
- ✅ Bracket spacing: enabled
- ✅ Arrow parentheses: always

**Prettier Configuration:**
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

---

## 3. Type Checking Rules

### TypeScript Verification
All code MUST pass TypeScript type checking.

**Command:**
```bash
npm run type-check
```

### TypeScript Standards
- ✅ Strict mode enabled
- ✅ No implicit any types
- ✅ All functions have return types
- ✅ All parameters are typed
- ✅ No type assertions without justification
- ✅ Use interfaces for object shapes
- ✅ Use enums for constants

**Compilation:**
```bash
npm run build
```

---

## 4. Smoke Test Rules

### Pre-Commit Smoke Tests
Run smoke tests before committing to ensure basic functionality.

**Run All Tests:**
```bash
npm run test
```

**Run Specific Test Types:**
```bash
npm run test:e2e           # E2E tests
npm run test:p0            # P0 priority tests
npm run test:p1            # P1 priority tests
npm run test:chromium      # Chromium browser
npm run test:firefox       # Firefox browser
npm run test:webkit        # WebKit browser
```

### Test Quality Checklist
- ✅ All tests must have descriptive names
- ✅ Tests MUST use @e2e, @p0, or @p1 tags
- ✅ Each test must be independent (no shared state)
- ✅ Tests must have proper assertions
- ✅ Tests must clean up after themselves
- ✅ No hardcoded wait times (use waitFor instead)
- ✅ Tests must run in parallel (fullyParallel: true)
- ✅ All tests must pass before merge

### Test Tags
```typescript
// P0 - Critical tests (run always)
test('@p0 @e2e login with valid credentials', async ({ page }) => {
  // Test code
});

// P1 - Important tests
test('@p1 @e2e user profile update', async ({ page }) => {
  // Test code
});

// E2E - End-to-end tests
test('@e2e complete user journey', async ({ page }) => {
  // Test code
});
```

### Performance Thresholds
- ✅ Test execution: < 30 seconds per test
- ✅ Parallel execution: < 5 minutes (all tests)
- ✅ Report generation: < 1 minute

---

## 5. Test Structure Rules

### Test File Organization
```
src/tests/
├── auth/
│   ├── login.spec.ts
│   └── logout.spec.ts
├── dashboard/
│   ├── navigation.spec.ts
│   └── widgets.spec.ts
└── profile/
    └── settings.spec.ts
```

### Test File Naming
- Use `.spec.ts` extension
- Use kebab-case for file names
- Group related tests in folders
- Descriptive folder names matching features

### Test Case Standards
```typescript
import { test, expect } from '@playwright/test';
import logger from '@utils/logger';

test.describe('@e2e User Authentication', () => {
  test.beforeEach(async ({ page }) => {
    logger.info('Navigating to login page');
    await page.goto('/login');
  });

  test('@p0 should login with valid credentials', async ({ page }) => {
    logger.info('Testing valid login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
    logger.info('Login successful');
  });

  test.afterEach(async ({ page }) => {
    logger.info('Cleaning up after test');
    await page.close();
  });
});
```

---

## 6. Quality Gates

### Mandatory Checks Before Commit
```bash
npm run lint              # ✓ Code linting passes
npm run format:check      # ✓ Code formatting is correct
npm run type-check        # ✓ TypeScript compilation succeeds
npm run test:p0           # ✓ P0 tests pass
```

### Pre-Push Quality Gate
```bash
npm run lint
npm run type-check
npm run test
npm run format:check
```

### CI/CD Pipeline
```bash
npm run test:ci           # Run with GitHub reporter
npm run lint
npm run type-check
npm run test:report       # Generate HTML report
```

---

## 7. Reporting Rules

### HTML Report Generation
```bash
npm run test:report
```

### Allure Report Generation
```bash
npm run test:ci
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

### Report Contents
- ✅ Test execution timeline
- ✅ Pass/fail/skip statistics
- ✅ Screenshots on failures
- ✅ Video recordings
- ✅ Trace files
- ✅ Performance metrics

---

## 8. Logging Standards

### Logger Usage
```typescript
import logger from '@utils/logger';

logger.info('Test started');
logger.warn('Potential issue detected');
logger.error('Test failed');
logger.debug('Debugging information');
```

### Log Files Location
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`
- Max file size: 5MB
- Max files: 5

### Log Level Configuration
Set via `.env`:
```env
LOG_LEVEL=info
```

---

## 9. Continuous Integration

### GitHub Actions Workflow
```yaml
name: Test Quality Checks
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install --legacy-peer-deps
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:ci
```

---

## 10. Code Review Checklist

Before approving a PR, verify:
- ✅ All linting rules passed
- ✅ Code is properly formatted
- ✅ TypeScript compilation successful
- ✅ All tests pass
- ✅ No hardcoded values (use .env)
- ✅ Tests have proper tags (@p0, @p1, @e2e)
- ✅ Descriptive test names and comments
- ✅ No console.log (use logger)
- ✅ Proper error handling
- ✅ Performance acceptable

---

## Quick Start Commands

```bash
# Run all quality checks
npm run lint && npm run format:check && npm run type-check && npm run test

# Auto-fix issues
npm run lint:fix && npm run format

# Run specific test suites
npm run test:e2e
npm run test:p0
npm run test:chromium

# Generate reports
npm run test:report
npm run clean  # Clean all generated files
```

---

## Enforcement

- **Pre-commit**: Local checks using husky and lint-staged (optional)
- **CI/CD**: Automated checks on every push
- **Code Review**: Manual verification by team leads
- **Standards**: Consistent framework for all contributors

---

## Last Updated
- Date: 2026-05-29
- Version: 1.0.0
- Maintainer: Advanced Playwright Framework Team

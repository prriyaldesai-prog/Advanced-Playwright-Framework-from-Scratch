# Rules Documentation

## Overview
This directory contains the quality standards, rules, and best practices for the **Advanced Playwright Framework from Scratch** project.

## Documentation Structure

| File | Purpose | Audience |
|------|---------|----------|
| **test-quality-checks.md** | Core quality standards, linting, formatting, typing | Everyone |
| **augmented-rules.md** | Advanced patterns, POM, fixtures, performance | Intermediate+ |
| **README.md** | Quick reference and navigation | Everyone |

## Files

### 📋 test-quality-checks.md
Comprehensive rule engine defining:
- Code linting standards
- Code formatting rules
- Type checking requirements
- Smoke test procedures
- Test structure guidelines
- Quality gates and checkpoints
- CI/CD pipeline standards
- Logging conventions
- Code review checklist

### 🚀 augmented-rules.md
Advanced testing patterns and enhancements including:
- AI-assisted code generation guidelines
- Page Object Model patterns
- Fixtures and reusable setup
- Data-driven testing
- API testing integration
- Performance optimization
- Security testing
- Accessibility testing (WCAG)
- Visual regression testing
- Error recovery patterns
- Test data management
- Mock & stub patterns
- CI/CD enhancements
- Debugging & diagnostics
- Advanced assertions

## Quick Reference

### Run Quality Checks
```bash
# Lint code
npm run lint                 # Check for linting errors
npm run lint:fix            # Auto-fix linting issues

# Format code
npm run format              # Auto-format code
npm run format:check        # Check formatting compliance

# Type checking
npm run type-check          # Verify TypeScript types
npm run build               # Compile TypeScript

# Run tests
npm run test                # Run all tests
npm run test:e2e            # Run E2E tests only
npm run test:p0             # Run P0 priority tests
npm run test:ui             # Run with UI mode
npm run test:debug          # Run in debug mode

# Generate reports
npm run test:report         # View HTML report
npm run clean               # Clean all generated files
```

### Complete Quality Gate (Before Commit)
```bash
npm run lint && npm run format:check && npm run type-check && npm run test:p0
```

### Full Pre-Push Checklist
```bash
npm run lint:fix && npm run format && npm run type-check && npm run test && npm run test:report
```

## Key Rules Summary

### 🔍 Linting
- No `any` types in TypeScript
- No `console.log` (use logger)
- No unused imports/variables
- Max line length: 120 characters
- Use `let`/`const` instead of `var`

### 🎨 Formatting
- Print width: 100 characters
- Tab width: 2 spaces
- Single quotes
- Trailing commas: es5
- Semicolons enabled

### 📝 TypeScript
- Strict mode enabled
- All functions have return types
- All parameters are typed
- No implicit any
- Use interfaces for objects

### ✅ Testing
- All tests tagged (@p0, @p1, @e2e)
- Descriptive test names
- Independent tests (no shared state)
- Proper assertions
- No hardcoded waits
- Parallel execution enabled

### 📊 Test Tags
| Tag | Purpose | Frequency |
|-----|---------|-----------|
| `@p0` | Critical tests | Always run |
| `@p1` | Important tests | Run before merge |
| `@e2e` | End-to-end tests | Full regression |
| `@smoke` | Quick validation | Quick checks |

### 🔐 Quality Gates

**Pre-Commit:**
```bash
✓ ESLint pass
✓ Prettier format
✓ TypeScript compile
```

**Pre-Push:**
```bash
✓ All quality gates pass
✓ All tests pass
✓ Reports generated
```

**Pre-Merge:**
```bash
✓ Code review approved
✓ CI/CD pipeline green
✓ Manual testing complete
```

## Test Structure

### File Organization
```
src/tests/
├── auth/
│   ├── login.spec.ts
│   └── logout.spec.ts
├── dashboard/
│   └── navigation.spec.ts
└── profile/
    └── settings.spec.ts
```

### Test File Template
```typescript
import { test, expect } from '@playwright/test';
import logger from '@utils/logger';

test.describe('@e2e Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    logger.info('Setup');
  });

  test('@p0 should do something critical', async ({ page }) => {
    logger.info('Test execution');
    // Test implementation
  });

  test.afterEach(async ({ page }) => {
    logger.info('Cleanup');
  });
});
```

## Logging Standards

### Logger Levels
```typescript
logger.error('Error occurred');     // Severity: 1
logger.warn('Warning');             // Severity: 2
logger.info('Information');         // Severity: 3
logger.debug('Debug details');      // Severity: 4
```

### Log Files
| File | Purpose | Level |
|------|---------|-------|
| `logs/error.log` | Errors only | error |
| `logs/combined.log` | All messages | all |
| Console | Live output | colored |

## Performance Benchmarks

| Metric | Target |
|--------|--------|
| Single test | < 30 seconds |
| All tests (parallel) | < 5 minutes |
| Report generation | < 1 minute |
| Type checking | < 10 seconds |
| Linting | < 15 seconds |

## Environment Configuration

### .env File
```env
# Environment
TTA_ENV=qa
BASE_URL=https://app.thetestingacademy.com

# Environment-specific URLs
DEV_BASE_URL=http://localhost:3000
STG_BASE_URL=https://stage.thetestingacademy.com
QA_BASE_URL=https://app.thetestingacademy.com
PROD_BASE_URL=https://app.thetestingacademy.com

# Logging
LOG_LEVEL=info

# Test Environment
TEST_ENV=QA

# CI/CD
CI=false
```

## CI/CD Integration

### GitHub Actions
Tests run automatically on:
- Push to main/develop branches
- Pull requests
- Scheduled nightly runs (optional)

### Workflow Steps
1. Checkout code
2. Install dependencies
3. Run linter
4. Type checking
5. Run tests with CI reporter
6. Generate reports
7. Archive artifacts

## Best Practices

### ✅ DO
- ✅ Use descriptive test names
- ✅ Add tags to all tests
- ✅ Use page object models
- ✅ Log important steps
- ✅ Clean up resources
- ✅ Run tests in parallel
- ✅ Use fixtures for common setup
- ✅ Follow DRY principle

### ❌ DON'T
- ❌ Use hardcoded values
- ❌ Add console.log calls
- ❌ Create shared test state
- ❌ Use sleep/setTimeout
- ❌ Skip tests (use skip)
- ❌ Ignore warnings
- ❌ Write untestable code
- ❌ Commit failing tests

## Advanced Topics

For advanced testing patterns and techniques, see **[augmented-rules.md](augmented-rules.md)**:

| Topic | Use Case |
|-------|----------|
| 🎯 Page Object Model | Complex multi-page applications |
| 📦 Fixtures | Reusable test setup and teardown |
| 🔄 Data-Driven Testing | Multiple test scenarios |
| ⚡ Performance Testing | Load times and response metrics |
| ♿ Accessibility Testing | WCAG 2.1 compliance |
| 📸 Visual Regression | UI layout verification |
| 🛡️ Security Testing | Authentication and XSS prevention |
| 🤖 Mock & Stub | API responses and service workers |
| 🐛 Debugging | Interactive debugging and trace |
| 📊 Custom Assertions | Enhanced test validations |

**Start here if you:**
- ✅ Are working on complex applications
- ✅ Need to optimize test performance
- ✅ Want to add accessibility testing
- ✅ Are building reusable test fixtures
- ✅ Need API mocking capabilities

## Troubleshooting

### Linting Errors
```bash
npm run lint:fix  # Auto-fix most issues
```

### Formatting Issues
```bash
npm run format    # Auto-format all files
```

### TypeScript Errors
```bash
npm run type-check  # Show all type errors
npm run build       # Full compilation with errors
```

### Test Failures
```bash
npm run test:debug    # Debug mode
npm run test:ui       # UI mode for inspection
npm run test:headed   # Headed mode (show browser)
```

## Contributing

When contributing to this framework:

1. **Read** `test-quality-checks.md` thoroughly
2. **Follow** all rules and best practices
3. **Run** complete quality gate before committing
4. **Test** your changes locally
5. **Submit** PR for code review
6. **Address** any feedback or failing checks

## Support

- 📖 Documentation: See `test-quality-checks.md`
- 🐛 Issues: Report via GitHub Issues
- 💬 Questions: Discuss in PR comments
- 📧 Contact: TTA Team

---

**Last Updated:** 2026-05-29  
**Version:** 1.1.0  
**Status:** Augmented Rules Added  
**Maintainer:** Advanced Playwright Framework Team

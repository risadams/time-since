/**
 * Jest configuration file
 * @type {import('jest').Config}
 */
module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // File extensions for test files
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  
  // Coverage settings - focus only on the CJS file since that's what we're testing
  collectCoverageFrom: ['dist/time-since.cjs.js'],
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Set coverage thresholds to enforce 100% coverage
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
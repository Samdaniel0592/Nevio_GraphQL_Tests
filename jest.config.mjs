export default {
  testEnvironment: 'node',
  testTimeout: 90000,
  reporters: [
    'default',
    ['jest-allure2-reporter', { resultsDir: './allure-results' }]
  ],
  setupFiles: ['dotenv/config'],
  transform: {},
  testMatch: ['**/*.spec.js']
};

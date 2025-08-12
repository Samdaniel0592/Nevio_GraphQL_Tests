export default {
  testEnvironment: 'node',
  testTimeout: 90000,
  reporters: [
    ['jest-allure2-reporter', { 
      resultsDir: './allure-results',
      overwrite: false,
      suiteNameTemplate: '{displayName} {filepath}',
      testNameTemplate: '{title}',
      stepReporter: {
        enabled: true,
        addSourceCodeAttachment: true
      },
      attachments: {
        subDir: 'attachments'
      },
      environmentInfo: {
        'Test Environment': process.env.NODE_ENV || 'test',
        'Node Version': process.version,
        'Platform': process.platform
      }
    }],
    'default' // Keep minimal console output as secondary
  ],
  setupFiles: ['dotenv/config'],
  transform: {},
  testMatch: ['**/*.spec.js']
};

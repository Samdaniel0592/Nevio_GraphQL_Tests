export default {
  testEnvironment: 'node',
  testTimeout: 90000,
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: './reports', filename: 'report.html', expand: true }]
  ],
  setupFiles: ['dotenv/config']
};

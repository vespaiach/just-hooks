module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    URL: 'http://localhost:8080',
  },
  verbose: true,
  testMatch: ['<rootDir>/src/*.(spec|test).{ts,tsx,js,jsx}'],
};

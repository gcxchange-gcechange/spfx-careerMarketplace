const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
const localizedResourcesPath = config.localizedResources.CareerMarketplaceWebpartWebPartStrings;

module.exports = {
  setupFiles: ["<rootDir>/jest.setup.ts"],
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest",
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  testMatch: [
    "**/src/**/**/**/*.test.+(ts|tsx|js)"
  ],

  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    // "^CareerMarketplaceWebpartWebPartStrings$": `<rootDir>/${localizedResourcesPath.replace('{locale}', 'en-us')}`
  }, 
  reporters: [
    'default', 
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'junit.xml'
    }]
  ]
};
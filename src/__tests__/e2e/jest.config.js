module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.js$',
  testTimeout: 35000,
  transform: {
    '\\.js$': 'react-scripts/config/jest/babelTransform'
  },
  verbose: true
}

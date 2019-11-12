const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'css'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  globals: {
    document: {},
    window: {},
    HTMLElement: {}
  },
  collectCoverageFrom: ['src/*.{js,ts}'],
  moduleNameMapper: {
    ...moduleNameMapper,
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js'
  }
}

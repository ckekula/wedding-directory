module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Map 'src/*' to the 'src' directory
  },
  moduleDirectories: ['node_modules', 'src'], 
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
  
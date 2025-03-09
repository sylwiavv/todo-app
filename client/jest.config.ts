import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lucide-react)/)'],
  moduleNameMapper: {
    '^lucide-react$':
      '<rootDir>/node_modules/lucide-react/dist/esm/lucide-react.js',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

module.exports = createJestConfig(config);

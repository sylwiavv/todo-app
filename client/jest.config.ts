import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

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
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lucide-react)/)'],
  moduleNameMapper: {
    '^lucide-react$':
      '<rootDir>/node_modules/lucide-react/dist/esm/lucide-react.js',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Potrzebne dla Reacta
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Obsługa TypeScript + JSX
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mockowanie styli
  },
};

module.exports = createJestConfig(config);

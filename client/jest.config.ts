import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', // Określamy katalog główny projektu
});

const config: Config = {
  preset: 'ts-jest', // Używamy presetts 'ts-jest' do TypeScript
  testEnvironment: 'jsdom', // Środowisko testowe dla React
  setupFilesAfterEnv: [
    './jest.setup.ts',
    'react-intersection-observer/test-utils',
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Mapowanie ścieżek dla Next.js
    '^lucide-react$':
      '<rootDir>/node_modules/lucide-react/dist/esm/lucide-react.js', // Używamy pełnej ścieżki dla lucide-react
  },

  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json', // Ścieżka do pliku tsconfig.json
    },
  },
  transformIgnorePatterns: ['node_modules/(?!(lucide-react)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
};

// Eksportujemy finalną konfigurację
module.exports = createJestConfig(config);

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.(js|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(framer-motion-3d)/)',
    "/node_modules/(?!react-merge-refs)/",
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },

  extensionsToTreatAsEsm: ['.mjs'],
  testMatch: ['**/*.test.js', '**/*.test.mjs'],
  moduleFileExtensions: ['js', 'mjs', 'jsx', 'json', 'node'],
  esModuleInterop: true,
};
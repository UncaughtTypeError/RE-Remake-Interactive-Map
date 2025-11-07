import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/__tests__/**/*.(test|spec).ts'],
    moduleFileExtensions: ['ts', 'js'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,js}'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    moduleNameMapper: {
        '^src$': '<rootDir>/src',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^client/(.*)$': '<rootDir>/src/client/$1',
        '^safeRoomAudioPlayer/(.*)$': '<rootDir>/src/ui/safeRoomAudioPlayer/$1',
        '^themeSelect/(.*)$': '<rootDir>/src/ui/themeSelect/$1',
        '^difficultySelect/(.*)$': '<rootDir>/src/ui/difficultySelect/$1',
        '^roomDetail/(.*)$': '<rootDir>/src/ui/roomDetail/$1',
        '^roomSummary/(.*)$': '<rootDir>/src/ui/roomSummary/$1',
        '^introOverlay/(.*)$': '<rootDir>/src/ui/introOverlay/$1',
        '^keymenu/(.*)$': '<rootDir>/src/ui/keymenu/$1',
        '^shared/(.*)$': '<rootDir>/src/ui/shared/$1',
    },
};

export default config;

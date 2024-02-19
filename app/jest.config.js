export default {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/_mocks/fileMock.js',
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
    }
}

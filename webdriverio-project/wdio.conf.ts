export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './tests/specs/**/*.js', // Adjust this path if your test files are located elsewhere
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'error', // Only log errors to reduce noise
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['visual'],
    framework: 'mocha',
    reporters: [
        'spec', // Use the spec reporter for concise output
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true, // Disable WebDriver steps
                disableWebdriverScreenshotsReporting: false, // Keep screenshots for failed tests
            },
        ],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
};
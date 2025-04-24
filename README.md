# ryanair-e2e-automation

This project is a WebdriverIO setup that uses Mocha (JavaScript) as the test framework. It is designed to test the Ryanair website as part of my Genesys interview. It includes a page object model (POM) structure, environment variable management, and test wrappers.

## Project Structure

```
webdriverio-project
├── src
│   ├── pages
│   │   ├── base.page.js       # Base class for all pages
│   │   └── home.page.js       # Page object for the home page
│   └── helpers
│       └── envHelper.js       # Helper for managing environment variables
├── tests
│   ├── specs
│   │   └── home.spec.js       # Test file for the home page
│   └── allure-results         # Directory for Allure test results
├── .env                       # Environment variables file
├── wdio.conf.ts               # WebdriverIO configuration file
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration file
├── README.md                  # Project documentation
└── .gitignore                 # Files and directories to ignore in Git
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/Began3/ryanair-e2e-automation.git
   cd webdriverio-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your environment variables,

4. **Run tests:**
   Use the following command to run the tests:
   ```
   npm run test
   ```

## Usage Examples

- **Page Object Model:**
  The project uses a page object model to encapsulate page-specific functionality. For example, the `HomePage` class extends the `BasePage` class, allowing for shared methods.


## Contributing

Feel free to submit issues or pull requests to improve the project. Make sure to follow the coding standards and include tests for new features.

## License

This project is licensed under the MIT License.

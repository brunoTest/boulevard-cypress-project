# Boulevard Cypress E2E Tests

This repository contains the End-to-End (E2E) test suite for the Boulevard web application, built using [Cypress](https://www.cypress.io/). The primary goals of this test suite are to validate content and automate form submissions.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Setup](#-setup)
- [Running Tests](#-running-tests)
  - [Opening the Cypress Test Runner (Interactive Mode)](#opening-the-cypress-test-runner-interactive-mode)
  - [Running Tests in Headless Mode (CLI)](#running-tests-in-headless-mode-cli)
- [Project Structure](#-project-structure)
- [Page Object Model (POM)](#-page-object-model-pom)
- [Test Data (Fixtures)](#-test-data-fixtures)
- [Reporting](#-reporting)
- [Contributing](#-contributing)

##  Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (version 16.x or higher recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)

## 🚀 Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/brunoTest/boulevard-cypress-project.git
    cd boulevard-cypress-project
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

3.  **Cypress Configuration (`cypress.config.js`):**
    The `baseUrl` is currently set to the development environment:
    `https://blvdco-dev-blvd-1000.dev.joinblvd.com/`
    Ensure this is the correct environment you intend to test against. Modify this file if you need to target a different environment.

## ▶️ Running Tests

### Opening the Cypress Test Runner (Interactive Mode)

This mode is recommended for writing and debugging tests, as it provides a visual interface.

Using npm:
```bash
npm run cypress:open

Running Tests in Headless Mode (CLI)
This mode is suitable for running tests in CI/CD pipelines or for full regression runs. Tests will run in a headless browser, and results will be output to the console. Videos and screenshots (on failure) are typically saved in cypress/videos/ and cypress/screenshots/ respectively.
Using npm:

npm run cypress:run

📁 Project Structure
boulevard-cypress-project/
├── cypress/
│   ├── e2e/                 # Contains all test (.cy.js) files
│   │   └── getADemo.cy.js
│   │   └── appointmentByEmail.cy.js
│   │   └── ...
│   ├── fixtures/            # Test data files (e.g., JSON)
│   │   └── getADemoData.json
│   │   └── appointmentData.json
│   ├── pageObjects/         # Page Object Model classes
│   │   └── GetADemoPage.js
│   │   └── AppointmentPage.js
│   ├── support/             # Reusable custom commands and configurations
│   │   ├── e2e.js           # Executed before every E2E spec file
│   │   └── commands.js      # Custom Cypress commands
├── node_modules/            # Project dependencies (managed by npm/yarn)
├── .gitignore               # Specifies intentionally untracked files
├── cypress.config.js        # Cypress main configuration file
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Records exact versions of dependencies
└── README.md                # This file

🏛️ Page Object Model (POM)
This project utilizes the Page Object Model design pattern to enhance test maintenance and readability.
Page objects are stored in cypress/pageObjects/.
Each page object class encapsulates the selectors and methods specific to a particular page or component of the application.
Tests in cypress/e2e/ import and use these page objects to interact with the application.
💾 Test Data (Fixtures)
Test data is primarily managed using fixture files located in cypress/fixtures/.
Fixtures are typically JSON files.
Tests load this data using cy.fixture() or direct import statements for synchronous access.
This approach separates test data from test logic, making tests cleaner and data easier to manage.
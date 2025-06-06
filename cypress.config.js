// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://blvdco-dev-blvd-1000.dev.joinblvd.com/', // O la URL base de tu aplicación "Boulevard" cuando esté corriendo
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Puedes cambiar el patrón de los archivos de prueba si quieres,
    // el default es 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
    // specPattern: 'cypress/e2e/tests/**/*.cy.js',
  },
});
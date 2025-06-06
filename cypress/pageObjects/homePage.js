// cypress/pageObjects/HomePage.js
class HomePage {
  // --- Selectors for Navigation Bar Elements ---
  getPlatformNavLink() {
    // Intenta encontrar un enlace que contenga "Platform"
    // Esto es una suposición, necesitarás inspeccionar el elemento real
    return cy.get('nav a').contains('Platform', { matchCase: false });
  }

  getSolutionsNavLink() {
    return cy.get('nav a').contains('Solutions', { matchCase: false });
  }

  getResourcesNavLink() {
    return cy.get('nav a').contains('Resources', { matchCase: false });
  }

  getCompanyNavLink() {
    return cy.get('nav a').contains('Company', { matchCase: false });
  }

  getRequestDemoButton() {
    // Podría ser un botón o un enlace estilizado como botón
    // Busca un elemento que contenga "Request a demo"
    return cy.get('nav').contains('Request a demo', { matchCase: false });
  }

  getLoginButton() {
    return cy.get('nav a').contains('Log in', { matchCase: false });
  }

  // --- Actions (métodos para interactuar con la página) ---
  navigateToPlatform() {
    this.getPlatformNavLink().click();
  }

  navigateToSolutions() {
    this.getSolutionsNavLink().click();
  }

  clickRequestDemo() {
    this.getRequestDemoButton().click();
  }

  clickLogin() {
    this.getLoginButton().click();
  }

  // --- Methods for assertions (verificaciones) ---
  verifyHeaderTextIsVisible(headerText) {
    // Ejemplo: verificar un texto principal en la página
    // Esto es muy genérico, necesitarás un selector más específico.
    return cy.contains('h1, h2', headerText, { matchCase: false }).should('be.visible');
  }

  verifyUrl(path) {
    cy.url().should('include', path);
  }
}

export default HomePage; // Exporta la clase para poder usarla en los tests
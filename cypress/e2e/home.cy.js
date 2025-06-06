// cypress/e2e/home.cy.js
import HomePage from '../pageObjects/HomePage'; // Importa el Page Object

describe('Boulevard Homepage Navigation and Basic Checks', () => {
  const homePage = new HomePage(); // Crea una instancia del Page Object

  beforeEach(() => {
    // Visita la página principal antes de cada prueba.
    // Como configuramos baseUrl en cypress.config.js, '/' va a https://www.joinblvd.com/
    cy.visit('/');
  });

  it('should load the homepage and display key elements', () => {
    // Verificar que el título de la página es el esperado
    cy.title().should('include', 'Boulevard');
    cy.title().should('include', 'Client Experience Platform');

    // Usar un método del Page Object para verificar un texto (esto es un ejemplo, necesitarías un selector real)
    // homePage.verifyHeaderTextIsVisible('The Client Experience Platform'); // Podrías tener que comentar esto si no tienes un selector adecuado aún

    // Verificar que el botón "Request a demo" es visible
    homePage.getRequestDemoButton().should('be.visible');
    // Verificar que el botón "Log in" es visible
    homePage.getLoginButton().should('be.visible');
  });

  it('should navigate to the "Request a demo" page when the button is clicked', () => {
    homePage.clickRequestDemo();

    // Verificar que la URL ha cambiado para incluir algo referente a "demo"
    // Al inspeccionar, veo que la URL se convierte en https://www.joinblvd.com/demo
    homePage.verifyUrl('/demo');

    // Podrías añadir una aserción para verificar un elemento único en la página de demo
    cy.get('h1').contains('See Boulevard in Action', { matchCase: false }).should('be.visible');
  });

  it('should navigate to the login page when the "Log in" button is clicked', () => {
    homePage.clickLogin();

    // Verificar que la URL ha cambiado
    // Al inspeccionar, la URL se convierte en https://dashboard.joinblvd.com/
    // Nota: esto es un subdominio diferente, por lo que cy.origin() podría ser necesario
    // si realizas más acciones allí, pero para una simple verificación de URL, esto podría funcionar.
    // Por ahora, solo verificaremos que la URL ya no es la página principal.
    cy.url().should('not.equal', Cypress.config().baseUrl); // Verifica que la URL cambió
    cy.url().should('include', 'dashboard.joinblvd.com'); // Más específico

    // Para interactuar con `dashboard.joinblvd.com`, necesitarías usar cy.origin()
    // Ejemplo (no lo ejecutaremos ahora, solo para mostrar):
    // cy.origin('https://dashboard.joinblvd.com', () => {
    //   cy.get('input[name="email"]').should('be.visible');
    // });
  });

  // Puedes añadir más pruebas aquí, por ejemplo, para los otros enlaces de navegación
  // it('should navigate to the Platform page', () => {
  //   homePage.navigateToPlatform();
  //   homePage.verifyUrl('/platform'); // Suponiendo que la URL es /platform
  //   // Añadir más aserciones específicas de la página de Platform
  // });
});
// cypress/e2e/forms/getADemo.cy.js
import GetADemoPage from '../pageObjects/GetADemoPage';

describe("Positive Form Submission", () => {
  const getADemoPage = new GetADemoPage();
  let testData; // Variable para almacenar los datos del fixture

  before(() => {
    // Cargar el fixture una vez antes de todos los tests en este describe bloque
    cy.fixture('getADemoData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    getADemoPage.visit();
    getADemoPage.dismissCookieBannerIfPresent();
  });

  it("A user attempts to submit the form with valid data and sees an error (due to Chili Piper issue)", () => {
    getADemoPage.verifyFormContainerIsVisible();

    // Usar los datos del fixture
    getADemoPage.fillStepOneForm(testData.validUser.step1);
    getADemoPage.fillStepTwoForm(testData.validUser.step2);

    getADemoPage.verifyErrorMessageIsVisible();
  });
 
});
// cypress/pageObjects/GetADemoPage.js

class GetADemoPage {
    // Selectores
    elements = {
        cookieDenyButtonVisible: () => '.osano-cm-denyAll:visible', // Selector para jQuery find
        formContainer: () => '.grid-cols-2',
        firstNameInput: () => '#FirstName',
        lastNameInput: () => '#LastName',
        companyInput: () => '#Company',
        phoneInput: () => '#Phone',
        emailInput: () => ':nth-child(5) > .px-3', // <-- ¡Este selector es frágil! Deberíamos mejorarlo.
        nextStepButton: () => '.col-span-full > .inline-flex', // Este selector se usa dos veces, ¿son el mismo botón o diferentes?
        locationDropdown: () => '#Location_Range__c',
        postalCodeInput: () => '#PostalCode',
        websiteInput: () => '#Website',
        submitFormButton: () => '.col-span-full > .inline-flex', // ¿Es este el mismo que nextStepButton o el botón final?
        errorMessage: () => 'An error occurred while processing the form. Please try again.' // Para verificar el error de Chili Piper
        // Podríamos añadir un selector para el mensaje de éxito cuando funcione
        // successMessage: () => 'Gracias por tu solicitud'
    }

    // Acciones
    visit() {
        cy.visit("get-a-demo");
    }

    dismissCookieBannerIfPresent() {
        cy.get('body').then(($body) => {
            const $cookieDenyButton = $body.find(this.elements.cookieDenyButtonVisible());
            if ($cookieDenyButton.length > 0) {
                cy.wrap($cookieDenyButton, { log: false }).click();
                cy.log('Banner de cookies Osano denegado.');
            } else {
                cy.log('Banner de cookies Osano no encontrado o no visible, continuando...');
            }
        });
    }

    verifyFormContainerIsVisible() {
        cy.get(this.elements.formContainer()).should('be.visible');
    }

    fillFirstName(firstName) {
        cy.get(this.elements.firstNameInput())
            .should('be.visible')
            .type(firstName, { delay: 100 });
    }

    fillLastName(lastName) {
        cy.get(this.elements.lastNameInput())
            .click({ force: true }) // Considera si este click es necesario
            .should('be.visible')
            .type(lastName, { delay: 100 });
    }

    fillCompany(company) {
        cy.get(this.elements.companyInput())
            .click({ force: true }) // Considera si este click es necesario
            .should('be.visible')
            .type(company, { delay: 100 });
    }

    fillPhone(phone) {
        cy.get(this.elements.phoneInput())
            .click({ force: true }) // Considera si este click es necesario
            .should('be.visible')
            .type(phone, { delay: 100 });
    }

    fillEmail(email) {
        cy.get(this.elements.emailInput())
            .click({ force: true }) // Considera si este click es necesario
            .should('be.visible')
            .type(email, { delay: 100 });
    }

    clickNextStepButton() {
        // ASUMO que este es el primer botón de "siguiente" o "enviar parte 1"
        // Si los selectores .col-span-full > .inline-flex son para botones DIFERENTES,
        // necesitaríamos selectores distintos para cada uno.
        cy.get(this.elements.nextStepButton()).click({ force: true });
    }

    selectLocation(locationOptionText) {
        // Reemplazar cy.wait() con espera explícita
        cy.get(this.elements.locationDropdown(), { timeout: 10000 }) // Espera a que aparezca
            .scrollIntoView()
            .should('be.visible')
            .select(locationOptionText, { force: true });
    }

    fillPostalCode(postalCode) {
        cy.get(this.elements.postalCodeInput())
            .click({ force: true }) // Considera si este click es necesario
            .should('be.visible')
            .type(postalCode, { delay: 100 });
    }

    fillWebsite(website) {
        cy.get(this.elements.websiteInput())
            .click({ force: true }) // Considera si este click es necesario
            .should('be.visible')
            .type(website, { delay: 100 });
    }

    clickSubmitFormButton() {
        // ASUMO que este es el botón final de envío del formulario.
        // Si es el mismo que nextStepButton, podríamos renombrar los métodos o el selector.
        cy.get(this.elements.submitFormButton())
            .should('be.visible') // Añadido para consistencia
            .click({ force: true });
    }

    // Método para verificar el mensaje de error actual (debido al problema de Chili Piper)
    verifyErrorMessageIsVisible() {
        cy.contains(this.elements.errorMessage(), { timeout: 10000 })
          .should('be.visible');
    }

    // Podrías tener un método más genérico para llenar la primera parte del formulario
    fillStepOneForm(userData) {
        this.fillFirstName(userData.firstName);
        this.fillLastName(userData.lastName);
        this.fillCompany(userData.company);
        this.fillPhone(userData.phone);
        this.fillEmail(userData.email);
        this.clickNextStepButton();
    }

    // Y otro para la segunda parte
    fillStepTwoForm(locationData) {
        this.selectLocation(locationData.location);
        this.fillPostalCode(locationData.postalCode);
        this.fillWebsite(locationData.website);
        this.clickSubmitFormButton();
    }
}

export default GetADemoPage;
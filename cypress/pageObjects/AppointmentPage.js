// cypress/pageObjects/AppointmentPage.js

class AppointmentPage {
    elements = {
        cookieDenyButtonVisible: () => '.osano-cm-denyAll:visible',
        otherPopupToClose: () => '.fixed > .text-onyx', // Selector para el otro popup opcional

        initialEmailInput: () => '.container > .justify-between > .px-3 > .bg-transparent',
        initialEmailSubmitButton: () => '.container > .justify-between > .inline-flex',

        // Para los encabezados de sección, es mejor usar cy.contains con el texto específico
        // startHereHeading: () => cy.contains('.text-balance', 'Start Here'),
        // justOneMoreStepHeading: () => cy.contains('.text-balance', 'Just one more step'),

        firstNameInput: () => '#FirstName',
        lastNameInput: () => '#LastName',
        companyInput: () => '#Company',
        phoneInput: () => '#Phone',
        userDetailsSubmitButton: () => '.col-span-full > .inline-flex', // Necesitamos MEJORAR este selector para diferenciarlo del siguiente

        locationDropdown: () => '#Location_Range__c',
        postalCodeInput: () => '#PostalCode',
        websiteInput: () => '#Website',
        locationDetailsSubmitButton: () => '.col-span-full > .inline-flex', // Necesitamos MEJORAR este selector
        
        // Para el error de Chili Piper, si aplica también a este flujo
        errorMessage: () => 'An error occurred while processing the form. Please try again.'
    }

    visit(urlPath = '/') { // Hacemos que urlPath sea opcional, default a la raíz
        cy.visit(urlPath);
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

    dismissOtherPopupIfPresent() {
        cy.get('body').then(($body) => {
            // Este popup puede que no tenga un estado :visible fácilmente detectable por jQuery find
            // si su ocultación es más compleja, pero intentemos:
            const $otherPopup = $body.find(this.elements.otherPopupToClose() + ':visible');
            if ($otherPopup.length > 0) {
                cy.wrap($otherPopup, { log: false }).click({ force: true }); // Usaste force:true antes
                cy.log('Otro popup cerrado.');
            } else {
                // Si no es visible o no existe, podemos hacer un get más específico
                // para evitar fallos si el selector ':visible' no funciona bien aquí.
                // Pero la lógica actual del test solo lo busca con .length
                 const $otherPopupExists = $body.find(this.elements.otherPopupToClose());
                 if ($otherPopupExists.length > 0 && !$otherPopupExists.is(':visible')) {
                    // Existe pero no es visible, no hacemos nada o podríamos intentar hacerle get y click si sospechamos que debe ser clickeado
                    cy.log('Otro popup encontrado pero no visible.');
                 } else if ($otherPopupExists.length > 0) { // Existe y es potencialmente visible
                    cy.get(this.elements.otherPopupToClose()).click({ force: true });
                    cy.log('Otro popup cerrado (vía cy.get).');
                 }
                 else {
                    cy.log('Otro popup no encontrado.');
                 }
            }
        });
    }


    fillInitialEmail(email) {
        cy.get(this.elements.initialEmailInput())
            .click({ force: true }) // Considerar si es necesario
            .should('be.visible')
            .type(email, { delay: 100 });
    }

    clickInitialEmailSubmit() {
        cy.get(this.elements.initialEmailSubmitButton()).click({ force: true });
    }

    verifyStartHerePageVisible() {
        // Reemplaza cy.wait(4000)
        cy.contains('.text-balance', 'Start Here', { timeout: 10000 }).should('be.visible');
        cy.get(this.elements.firstNameInput(), { timeout: 5000 }).should('be.visible'); // Asegurar que el form está listo
    }

    fillUserDetails(userData) {
        cy.get(this.elements.firstNameInput()).should('be.visible').type(userData.firstName, { delay: 100 });
        cy.get(this.elements.lastNameInput()).should('be.visible').type(userData.lastName, { delay: 100 });
        cy.get(this.elements.companyInput()).should('be.visible').type(userData.company, { delay: 100 });
        cy.get(this.elements.phoneInput()).should('be.visible').type(userData.phone, { delay: 100 });
    }

    clickSubmitUserDetails() {
        // ¡¡¡NECESITAMOS UN SELECTOR MÁS ESPECÍFICO PARA ESTE BOTÓN!!!
        // Si usamos el mismo selector genérico, podría hacer clic en el botón equivocado.
        // Por ahora, asumiré que podemos encontrarlo si es el único visible con esa clase en ese momento.
        // O que es el primer/n-ésimo elemento con esa clase.
        // Esta es una solución temporal y frágil:
        cy.get(this.elements.userDetailsSubmitButton()).eq(0).click({ force: true }); // eq(0) asume que es el primero
        // Lo ideal sería: cy.get('selector-unico-para-este-boton').click();
    }

    verifyJustOneMoreStepPageVisible() {
        cy.contains('.text-balance', 'Just one more step', { timeout: 10000 }).should('be.visible');
        cy.get(this.elements.locationDropdown(), { timeout: 5000 }).should('be.visible');
    }

    fillLocationDetails(locationData) {
        cy.get(this.elements.locationDropdown()).scrollIntoView().should('be.visible').select(locationData.location, { force: true });
        cy.get(this.elements.postalCodeInput()).click({ force: true }).should('be.visible').type(locationData.postalCode, { delay: 100 });
        cy.get(this.elements.websiteInput()).click({ force: true }).should('be.visible').type(locationData.website, { delay: 100 });
    }

    clickSubmitLocationDetails() {
        // ¡¡¡NECESITAMOS UN SELECTOR MÁS ESPECÍFICO PARA ESTE BOTÓN!!!
        // Esta es una solución temporal y frágil:
        cy.get(this.elements.locationDetailsSubmitButton()).eq(1).click({ force: true }); // eq(1) asume que es el segundo
        // O si después del primer submit el botón anterior desaparece, entonces eq(0) podría funcionar de nuevo.
        // Esto es muy dependiente del DOM.
        // Lo ideal sería: cy.get('selector-unico-para-este-boton-final').click();
    }

    verifyFinalErrorMessageIsVisible() {
        // Asumiendo que este flujo también podría dar el error de Chili Piper
        cy.contains(this.elements.errorMessage(), { timeout: 10000 })
          .should('be.visible');
    }
    
    // Podríamos combinar pasos en métodos de más alto nivel también si se desea
    completeInitialEmailStep(email) {
        this.fillInitialEmail(email);
        this.clickInitialEmailSubmit();
        this.verifyStartHerePageVisible();
    }

    completeUserDetailsStep(userData) {
        this.fillUserDetails(userData);
        this.clickSubmitUserDetails();
        this.verifyJustOneMoreStepPageVisible();
    }

    completeLocationDetailsStep(locationData) {
        this.fillLocationDetails(locationData);
        this.clickSubmitLocationDetails();
        // Aquí iría la verificación final (éxito o error)
        // this.verifyFinalErrorMessageIsVisible(); o this.verifySuccess();
    }
}

export default AppointmentPage;
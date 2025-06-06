// cypress/e2e/appointmentByEmail.cy.js
import AppointmentPage from '../pageObjects/AppointmentPage';
// Importar el archivo JSON directamente
import appointmentFixtureData from '../fixtures/appointmentData.json';

describe("Appointment Form Submission via Email Entry", () => {
    const appointmentPage = new AppointmentPage();
    // Los datos del fixture ahora están disponibles síncronamente
    const testData = appointmentFixtureData;

    // Verificar si hay URLs para probar
    if (testData && testData.appointmentUrls && testData.appointmentUrls.length > 0) {
        testData.appointmentUrls.forEach((url) => {
            // El path de la URL debe ser relativo a la baseUrl
            const currentUrlPath = url || '/'; // Usar '/' si la URL está vacía o es undefined

            describe(`Get a demo from URL: ${currentUrlPath}`, () => {
                
                beforeEach(() => {
                    // Mover el manejador de excepciones a support/e2e.js es una buena práctica si es global
                    Cypress.on('uncaught:exception', (err, runnable) => {
                        // previene que Cypress falle el test por errores no atrapados de la aplicación
                        return false;
                    });

                    appointmentPage.visit(currentUrlPath);
                    appointmentPage.dismissCookieBannerIfPresent();
                    appointmentPage.dismissOtherPopupIfPresent();
                });

                it('A user can submit the multi-step form and encounters an error (Chili Piper)', () => {
                    // Asegurarse de que testData.defaultUser existe antes de usarlo
                    if (!testData.defaultUser) {
                        throw new Error("defaultUser not found in appointmentData.json fixture");
                    }

                    appointmentPage.completeInitialEmailStep(testData.defaultUser.initialEmail);
                    appointmentPage.completeUserDetailsStep(testData.defaultUser.userDetails);
                    appointmentPage.completeLocationDetailsStep(testData.defaultUser.locationDetails);
                    appointmentPage.verifyFinalErrorMessageIsVisible();
                });
            });
        });
    } else {
        // Si no hay URLs, crea un test pendiente para que sea visible en el runner
        // y no simplemente muestre "No tests found" sin explicación.
        it.skip('No appointment URLs configured in fixture (appointmentData.json), skipping multi-URL tests', () => {
            // Este test no se ejecutará pero aparecerá como pendiente.
        });
        // O puedes loggear un mensaje si prefieres:
        // console.log("No appointment URLs found in fixture to generate tests.");
    }
});
export class LoginPage {
    // Constructor
    constructor() { }

    // Actions
    loginFormIsLoaded() {
        cy.get('[data-test="login-container"]').should('be.visible');
    }

    fillLoginForm(username: string, password: string, expectError: boolean = false) {
        cy.get('[data-test="username"]').clear().type(username);
        cy.get('[data-test="password"]').clear().type(password);
        cy.get('[data-test="login-button"]').click();

        if (expectError) {
            // Wait for error message to appear and return it
            return cy.get('[data-test="error"]').should('be.visible');
        } else {
            // Verify no error appears (positive scenario)
            cy.get('[data-test="error"]').should('not.exist');
        }
    }
}
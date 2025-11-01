export class LoginPage {
    // Variables, constants and objects

    // Constructor
    constructor() { }

    // Actions
    loginFormIsLoaded() {
        cy.get('[data-test="login-container"]').should('be.visible');
    }

    fillLoginForm(username: string, password: string) {
        cy.get('[data-test="username"]').clear().type(username);
        cy.get('[data-test="password"]').clear().type(password);

        cy.get('[data-test="login-button"]').click();
    }
}
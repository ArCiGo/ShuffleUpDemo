export class CheckoutCompletePage {
    // Constructor
    constructor() { } 

    // Actions
    thankYouMessageIsLoaded() {
        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
    }
}
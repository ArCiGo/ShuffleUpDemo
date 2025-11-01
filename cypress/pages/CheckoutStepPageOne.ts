export class CheckoutStepPageOne {
    // Constructor
    constructor() { } 

    // Actions
    fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
        cy.get('[data-test="firstName"]').clear().type(firstName);
        cy.get('[data-test="lastName"]').clear().type(lastName);
        cy.get('[data-test="postalCode"]').clear().type(zipCode);
    }

    clickOnContinueButton() {
        cy.get('[data-test="continue"]').click();
    }
}
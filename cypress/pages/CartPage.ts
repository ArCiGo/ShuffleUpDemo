export class CartPage {
    // Variables, constants and objects

    // Constructor
    constructor() { } 

    // Actions
    // Move the logic for validating the items to the tests
    validateProductsInCart() {
        return cy.get('[data-test="inventory-item-name"]').then((products) => {
            return (Cypress.$.makeArray(products)).map((el) => el.innerText)
        });
    }

    clickOnCheckoutButton() {
        cy.get('[data-test="checkout"]').click();
    }
}
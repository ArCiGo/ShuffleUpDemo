export class InventoryPage {
    // Variables, constants and objects

    // Constructor
    constructor() { } 

    // Actions
    headerIsLoaded() {
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Products');
    }

    addProductsToCart(products: string[]) {
        products.forEach(item => {
            cy.contains('[data-test="inventory-item"]', item)
                // .find('button[class*="btn btn_primary"]')
                .find('[data-test*="add-to-cart-"]')        // Update this locator because it seems brittle
                .click();
        });
    }

    clickOnShoppingCartButton() {
        cy.get('[data-test="shopping-cart-link"]').click();
    }
}
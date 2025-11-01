import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepPageOne } from "../pages/CheckoutStepPageOne";
import { CheckoutStepPageTwo } from "../pages/CheckoutStepPageTwo";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

describe('TC01. Buying items in the Swag Labs store', () => {
    // Variables, constants and objects
    let products: string[];
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutStepPageOne = new CheckoutStepPageOne();
    const checkoutStepPageTwo = new CheckoutStepPageTwo();
    const checkoutCompletePage = new CheckoutCompletePage();

    before(() => {
        // Getting the data from the fixture file
        cy.fixture('products').then(data => {
            products = data;
        });
        cy.navigateTo(Cypress.env('base_url_ui'));

        loginPage.loginFormIsLoaded();
        loginPage.fillLoginForm(Cypress.env('valid_user').username, Cypress.env('valid_user').password);
    });

    it('Should buy items successfully', () => {
        inventoryPage.headerIsLoaded();
        inventoryPage.addProductsToCart(products);
        inventoryPage.clickOnShoppingCartButton();

        cartPage.validateProductsInCart().then((cartProducts) => {
            expect(cartProducts).to.deep.equal(products);
        });
        cartPage.clickOnCheckoutButton();

        cy.fixture('checkout').then(data => {
            checkoutStepPageOne.fillCheckoutForm(data.firstName, data.lastName, data.zipCode);
        });
        checkoutStepPageOne.clickOnContinueButton();

        checkoutStepPageTwo.checkoutSummary().then(summary => {
            expect(summary.shippingInfo).to.include('Free Pony Express Delivery!');
            expect(summary.subtotal).to.equal(87.97);
            expect(summary.tax).to.equal(7.04);
            expect(summary.total).to.equal(95.01)
        });
        checkoutStepPageTwo.clickOnFinishButton();

        checkoutCompletePage.thankYouMessageIsLoaded();
    });
});
declare namespace Cypress {
    interface Chainable {
        navigateTo: (url: string) => void;
    }
}
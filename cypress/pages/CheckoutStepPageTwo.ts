export class CheckoutStepPageTwo {
    // Constructor
    constructor() { } 

    // Actions
    checkoutSummary() {
        this.getShippingInfo().as('shippingInfo');
        this.getSubtotal().as('subtotal');
        this.getTax().as('tax');
        this.getTotal().as('total');

        return cy.then(function() {
            return { 
                shippingInfo: this.shippingInfo,
                subtotal: this.subtotal,
                tax: this.tax,
                total: this.total 
            };
        });       
    }

    private getShippingInfo() {
        return cy.get('[data-test="shipping-info-value"]')
            .invoke('text')
            .then((text) => text.trim());
    }

    private getSubtotal() {
        return this.extractAmount('[data-test="subtotal-label"]');
    }

    private getTax() {
        return this.extractAmount('[data-test="tax-label"]');
    }

    private getTotal() {
        return this.extractAmount('[data-test="total-label"]');
    }

    private extractAmount(selector: string) {
        return cy.get(selector)
            .invoke('text')
            .then((text) => {
                const number = parseFloat(text.replace(/[^0-9.]+/g, ''));

                return Number.isFinite(number) ? number : NaN;
            })
    }

    clickOnFinishButton() {
        cy.get('[data-test="finish"]').click();
    }
}
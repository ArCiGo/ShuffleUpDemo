describe('TC03. Testing boundaries between systems', () => {
    before(() => {

    });

    it('Should validate that the user created in Reqres isn\'t available in the Swag Labs store', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('base_url_api'),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "reqres-free-v1"
            },
            body: {
                "username": "Armando",
                "password": "Password123!",
                "job": "Ejemplo"
            }
        }).then(response => {
            expect(response.status).to.equal(201);
        })
    });
})
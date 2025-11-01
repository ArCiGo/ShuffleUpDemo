describe('TC02. Response validation against JSON schema', () => {
    let schema, expectedResponse;

    before(() => {
        cy.fixture('schemas/getUserSchema').then(data => schema = data);
        cy.fixture('responses/getUserResponse').then(data => expectedResponse = data);
    });

    it('Should validate the response against the JSON schema', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('base_url_api'),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "reqres-free-v1"
            }
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(expectedResponse)
        }).validateSchema(schema);
    });
});
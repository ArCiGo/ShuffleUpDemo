describe('TC02. Response validation against JSON schema', () => {
    let schema: any, expectedResponse: any;

    before(() => {
        cy.fixture('schemas/getUsersSchema').then(data => { schema = data; });
        cy.fixture('responses/getUsersResponse').then(data => { expectedResponse = data; });
    });

    it('Should validate the response against a JSON schema successfully', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('base_url_api'),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": Cypress.env('x-api-key')
            }
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(expectedResponse)
        }).validateSchema(schema);
    });
});
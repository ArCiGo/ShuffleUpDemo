import { Messages } from "../constants/Messages";
import { LoginPage } from "../pages/LoginPage";

describe('TC03. Testing boundaries between systems', () => {
    let schema: any;
    const loginPage = new LoginPage();

    before(() => {
        cy.fixture('schemas/postUsersSchema').then(data => { schema = data; });
    });

    it('Should validate that the user created in Reqres isn\'t available in the Swag Labs store', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('base_url_api'),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": Cypress.env('x-api-key')
            },
            body: {
                "username": Cypress.env('new_user').username,
                "password": Cypress.env('new_user').password,
                "job": Cypress.env('new_user').job
            }
        }).validateSchema(schema).then(response => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('username', Cypress.env('new_user').username);
            expect(response.body).to.have.property('password', Cypress.env('new_user').password);
            expect(response.body).to.have.property('job', Cypress.env('new_user').job);

            const { username, password } = response.body;

            // Navigate to Swag Labs store
            cy.navigateTo(Cypress.env('base_url_ui'));

            loginPage.loginFormIsLoaded();
            loginPage.fillLoginForm(username, password, true)
                .should('contain.text', Messages.USER_PASSWORD_DO_NOT_MATCH);
        });
    });
})
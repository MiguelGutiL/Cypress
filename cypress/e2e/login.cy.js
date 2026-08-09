

describe('Login tests', () =>{

    it('Success login using the correct credentials', () =>{
        cy.visit('/');
        cy.get('body').should('be.visible');
    })
});
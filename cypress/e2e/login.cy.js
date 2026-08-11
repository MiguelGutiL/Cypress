import LoginPage from '../pages/loginPage';
//import Products from '../pages/Products';

describe('Login tests', () =>{

    beforeEach(() =>{
        cy.visit('/');    
    });

    /*after(()=>{
        LoginPage.logout();
    });*/

    it('Success login using the correct credentials', () =>{
        cy.fixture('users').then($data => {
            LoginPage.login($data.validUser.username, $data.validUser.password);
            cy.url().should('include', '/inventory');
        });
        LoginPage.logout();
    });

    it('Validate that locked User is not login and showing the respective message', ()=>{
        cy.fixture('users').then($data => {
            LoginPage.login($data.lockedUser.username, $data.lockedUser.password);
            LoginPage.loginPage.lockedUserMessage().should('exist').invoke('text').should('include','Epic sadface: Sorry, this user has been locked out.');
        });
        LoginPage.loginPage.lockedCloseUserMsg().click();
    });

    it('Validate the user login and the images issue', () =>{
        cy.fixture('users').then($data => {
            LoginPage.login($data.problemUser.username, $data.problemUser.password);
            cy.url().should('include', '/inventory');
        });

        //Products.products.productImages().invoke('attr','src').should('include','/assets/sl-404-Cq1a9k9X.jpg');
        LoginPage.logout();
    });
});
class LoginPage{

    loginPage = {
        userName : () => cy.get('#user-name'),
        password : () => cy.get('#password'),
        signInBtn : () => cy.get('input[type="submit"]'),
        hamburguerMenu : () => cy.get('#react-burger-menu-btn'),
        logoutBtn : () => cy.get('#logout_sidebar_link'),
        lockedUserMessage : () => cy.get('h3[data-test="error"]'),
        lockedCloseUserMsg : () => cy.get('button[type="button"]'),
    }

    login(username, password){
        this.loginPage.userName().clear().type(username);
        this.loginPage.password().clear().type(password);
        this.loginPage.signInBtn().click();
    }

    logout(){
        this.loginPage.hamburguerMenu().should('be.visible').click();
        this.loginPage.logoutBtn().should('be.visible').click();
        cy.url().should('include','www.saucedemo.com/')
    }
}

export default new LoginPage();
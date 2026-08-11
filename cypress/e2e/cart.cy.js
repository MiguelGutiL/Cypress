import Products from "../pages/Products";
import LoginPage from "../pages/loginPage";
import Cart from "../pages/cartPage"

describe('Cart tests', ()=>{

    beforeEach(()=>{
        cy.visit('/');
        cy.fixture('users').then($data => {
            LoginPage.login($data.validUser.username, $data.validUser.password);
            cy.url().should('include', '/inventory');
        });  
    });

    /*afterEach(()=>{
        LoginPage.logout();
    });*/


    it('Validate that the cart is empty and it has one product', ()=>{

        Products.products.cartBtn().should('be.visible').click();
        Cart.cart.cartProductTitle().should('not.exist');
        Cart.cart.cartContinueShoppingBtn().click();
        Products.products.addToCartBtn().first().click();
        Products.products.cartBtn().click();
        Cart.cart.cartProductTitle().should('exist');

    });
});

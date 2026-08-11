import { wrap } from 'module';
import LoginPage from '../pages/loginPage';
import Products from '../pages/products';
import Cart from '../pages/cartPage'; 

describe('Login tests', () =>{

    beforeEach(() =>{
        cy.visit('/');
        cy.fixture('users').then($data => {
            LoginPage.login($data.validUser.username, $data.validUser.password);
            cy.url().should('include', '/inventory');
        });  
    });

    after(()=>{
        LoginPage.logout();
    });

    it('Validate that the productos exist in the home page', ()=>{
        let products

        Products.products.titlesProducts().then($products =>{
            products = $products.length;
            console.log(products);

            Products.products.titlesProducts().should('have.length', products)
        });
    });

    it('validate the name of each product', ()=>{

        Products.products.titlesProducts().each(($el, index) =>{
            cy.wrap($el).invoke('text').then($products =>{
                cy.log(`${$products}`);
                let productTitles = $products.trim();

                switch(productTitles){
                    case "Sauce Labs Backpack":
                        cy.wrap($el).should('contain','Sauce Labs Backpack')
                    break;
                    case "Sauce Labs Bike Light":
                        cy.wrap($el).should('contain','Sauce Labs Bike Light')
                    break;
                    case "Sauce Labs Bolt T-Shirt":
                        cy.wrap($el).should('contain','Sauce Labs Bolt T-Shirt')
                    break;
                    case "Sauce Labs Fleece Jacket":
                        cy.wrap($el).should('contain','Sauce Labs Fleece Jacket')
                    break;
                    case "Sauce Labs Onesie":
                        cy.wrap($el).should('contain','Sauce Labs Onesie')
                    break;
                    case "Test.allTheThings() T-Shirt (Red)":
                        cy.wrap($el).should('contain','Test.allTheThings() T-Shirt (Red)')
                    break;
                }
            });
        });
    });

    it('Validate the description of each product', () =>{

        Products.products.descriptionProducts().each(($el, index) =>{
            cy.wrap($el).invoke('text').then($productsDescription =>{
                cy.log(`${$productsDescription}`);
                let productsListDescription = $productsDescription.trim();

                switch(productsListDescription){
                    case "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.":
                        cy.wrap($el).should('contain','carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
                    break;
                    case "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.":
                        cy.wrap($el).should('contain',"A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.")
                    break;
                    case "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.":
                        cy.wrap($el).should('contain','Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.')
                    break;
                    case "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.":
                        cy.wrap($el).should('contain',"It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.")
                    break;
                    case "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.":
                        cy.wrap($el).should('contain',"Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.")
                    break;
                    case "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.":
                        cy.wrap($el).should('contain','This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.')
                    break;
                }
            });
        });
    });

    it('Sort the product with the option Z-A',()=>{
        Products.products.sortDropdown().select('Name (Z to A)');

        Products.products.titlesProducts().then($products =>{
            const names = Cypress._.map($products, (el) => el.innerText);
            const sortedNames = Cypress._.sortBy(names).reverse();
            expect(names).to.deep.equal(sortedNames);           
        });
    });

    it('Sort the product with the option A-Z', ()=>{

        Products.products.sortDropdown().select('Name (A to Z)');

        Products.products.titlesProducts().then($products =>{
            const names = Cypress._.map($products, (el) => el.innerText);
            const sortedNames = Cypress._.sortBy(names);
            expect(names).to.deep.equal(sortedNames);
        });
    });

    it('Sort the producto with the option low to high', () => {
        Products.products.sortDropdown().select('Price (low to high)'); 
        
        Products.products.pricesProducts().then(($elements) => {
            const prices = Cypress._.map($elements, (el) => 
                parseFloat(el.innerText.replace('$', ''))
            );
            
            const sortedPrices = Cypress._.sortBy(prices);
            expect(prices).to.deep.equal(sortedPrices);
        });
    });

    it('Sort the producto with the option high to low', () => {
        Products.products.sortDropdown().select('Price (high to low)'); 
        
        Products.products.pricesProducts().then(($elements) => {
            const prices = Cypress._.map($elements, (el) => 
                parseFloat(el.innerText.replace('$', ''))
            );
            
            const sortedPrices = Cypress._.sortBy(prices).reverse();
            expect(prices).to.deep.equal(sortedPrices);
        });
    });

    it('Add one of the producto to te cart', ()=>{
         
        let title

        Products.products.titlesProducts().first().invoke('text').then($title =>{
            title = $title.trim();
            cy.log(title);
        });

        Products.products.cartBtn().should('exist');
        Products.products.cartBadge().should('not.exist');
        Products.products.addToCartBtn().first().click();
        Products.products.cartBadge().should('exist');
        Products.products.cartBtn().click();
        Cart.cart.cartProductTitle().invoke('text').then($prodcutTitle =>{
            const productTitle = $prodcutTitle.trim();
            expect(productTitle).to.eq(title);
        });

    });
});
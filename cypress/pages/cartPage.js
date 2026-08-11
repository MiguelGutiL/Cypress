class Cart{

    cart={
        cartAmountProducts : () => cy.get('div[data-test="item-quantity"]'),
        cartProductTitle : () => cy.get('div[data-test="inventory-item-name"]'),
        cartProductDescription : () => cy.get('div[data-test="inventory-item-desc"]'),
        cartProductPrice : () => cy.get('data-test="inventory-item-price"'),
        cartRemoveBtn : () => cy.get('button[data-test="remove-sauce-labs-backpack"]'),
        cartContinueShoppingBtn : () => cy.get('button[data-test="continue-shopping"]'),
        cartCheckoutBtn : () => cy.get('button[data-test="checkout"]'),
    }

}

export default new Cart();

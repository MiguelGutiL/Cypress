class Products{

    products={
        productImages : () => cy.get('img[class="inventory_item_img"]'),
        addToCartBtn : () => cy.get('button.btn.btn_primary.btn_small.btn_inventory'),
        titlesProducts : () => cy.get('div[data-test="inventory-item-name"]'),
        pricesProducts : () => cy.get('div[data-test="inventory-item-price"]'),
        descriptionProducts : () => cy.get('div[data-test="inventory-item-desc"]'),
        sortDropdown : () => cy.get('select[data-test="product-sort-container"]'),
        cartBtn : () => cy.get('a[data-test="shopping-cart-link"]'),
        cartBadge : () => cy.get('span[data-test="shopping-cart-badge"]'),
    }

}

export default new Products();

describe('Produtos e detalhes do primeiro produto', () => {
  it('exibe a lista de produtos e os detalhes do primeiro item', () => {
    cy.visit('http://automationexercise.com');

    cy.get('img[alt="Website for automation practice"]').should('be.visible');

    cy.contains('a', 'Products').click();
    cy.location('pathname').should('include', '/products');
    cy.contains('h2', 'All Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('be.visible').and('have.length.greaterThan', 0);

    cy.get('.features_items .product-image-wrapper')
      .first()
      .contains('a', 'View Product')
      .click();

    cy.location('pathname').should('include', '/product_details/');

    cy.get('.product-information').should('be.visible').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty');
      cy.contains('p', 'Category:').should('be.visible').and('not.be.empty');
      cy.get('span span').should('be.visible').and('not.be.empty');
      cy.contains('p', 'Availability:').should('be.visible').and('not.be.empty');
      cy.contains('p', 'Condition:').should('be.visible').and('not.be.empty');
      cy.contains('p', 'Brand:').should('be.visible').and('not.be.empty');
    });
  });
});
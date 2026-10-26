describe('Busca de produtos', () => {
  it('exibe todos os resultados relacionados ao termo pesquisado', () => {
    const searchTerm = 'fancy';

    cy.visit('http://automationexercise.com');

    cy.get('img[alt="Website for automation practice"]').should('be.visible');

    cy.contains('a', 'Products').click();
    cy.location('pathname').should('include', '/products');
    cy.contains('h2', 'All Products').should('be.visible');

    cy.get('#search_product').type(searchTerm);
    cy.get('#submit_search').click();

    cy.contains('h2', /searched products/i).should('be.visible');
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0)
      .each(($product) => {
        cy.wrap($product).should('be.visible');
        cy.wrap($product).find('.productinfo p').should('be.visible').and('not.be.empty');
      });
  });
});
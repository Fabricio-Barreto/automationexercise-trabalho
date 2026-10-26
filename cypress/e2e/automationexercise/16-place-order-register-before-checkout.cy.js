const { useTestAccountLifecycle } = require('../../support/test-account-lifecycle');

describe('Pedido com usuário já cadastrado', () => {
  useTestAccountLifecycle();

  it('faz login e conclui uma compra', () => {
    cy.visit('http://automationexercise.com');
    cy.get('img[alt="Website for automation practice"]').should('be.visible');

    cy.contains('a', 'Signup / Login').click();
    cy.contains('h2', 'Login to your account').should('be.visible');

    cy.get('@testAccount').then(({ email, password, name }) => {
      cy.get('[data-qa="login-email"]').type(email);
      cy.get('[data-qa="login-password"]').type(password);
      cy.get('[data-qa="login-button"]').click();
      cy.contains('a', 'Logged in as').should('contain', name);
    });

    cy.contains('a', 'Products').click();
    cy.contains('h2', 'All Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper')
      .first()
      .contains('a', 'Add to cart')
      .click();
    cy.contains('.modal-content', 'Your product has been added to cart').should('be.visible');
    cy.contains('.modal-content button', 'Continue Shopping').click();

    cy.contains('a', 'Cart').click();
    cy.location('pathname').should('include', '/view_cart');
    cy.get('#cart_info').should('be.visible');
    cy.get('#cart_info tbody tr').should('have.length.greaterThan', 0);

    cy.contains('a', 'Proceed To Checkout').click();
    cy.contains('h2', 'Address Details').should('be.visible');
    cy.contains('h2', 'Review Your Order').should('be.visible');
    cy.get('#address_delivery').should('be.visible');
    cy.get('#cart_info tbody tr').should('have.length.greaterThan', 0);

    cy.get('textarea[name="message"]').type('Por favor, entregar durante o horario comercial.');
    cy.contains('a', 'Place Order').click();

    cy.get('[data-qa="name-on-card"]').type('Fabricio Nogueira');
    cy.get('[data-qa="card-number"]').type('4111111111111111');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
    cy.get('[data-qa="pay-button"]').click();

    cy.contains(/order placed!/i).should('be.visible');
    cy.contains(/congratulations! your order has been confirmed!/i).should('be.visible');

  });
});
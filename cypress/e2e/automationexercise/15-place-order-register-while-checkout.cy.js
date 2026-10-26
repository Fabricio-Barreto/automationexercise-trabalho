describe('Cadastro e finalização de pedido', () => {
  it('cria uma conta, compra um produto e exclui a conta', () => {
    const userName = 'Fabricio Barreto';
    const email = `fabricio.barreto.${Date.now()}@example.com`;
    const password = 'CypressPassword123!';

    cy.visit('http://automationexercise.com');
    cy.get('img[alt="Website for automation practice"]').should('be.visible');

    cy.contains('a', 'Signup / Login').click();
    cy.contains('h2', 'New User Signup!').should('be.visible');
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains('h2', /enter account information/i).should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('#name').should('have.value', userName);
    cy.get('#email').should('have.value', email);
    cy.get('#password').type(password);
    cy.get('#days').select('10');
    cy.get('#months').select('5');
    cy.get('#years').select('1990');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('#first_name').type('Fabricio');
    cy.get('#last_name').type('Barreto');
    cy.get('#company').type('Automation Exercise');
    cy.get('#address1').type('123 Cypress Street');
    cy.get('#address2').type('Apt 4');
    cy.get('#country').select('United States');
    cy.get('#state').type('California');
    cy.get('#city').type('Los Angeles');
    cy.get('#zipcode').type('90001');
    cy.get('#mobile_number').type('1234567890');

    cy.get('[data-qa="create-account"]').click();
    cy.contains('h2', /account created!/i).should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('a', 'Logged in as').should('contain', userName);

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
    cy.get('#address_delivery').should('contain', userName);
    cy.get('#cart_info tbody tr').should('have.length.greaterThan', 0);

    cy.get('textarea[name="message"]').type('Por favor, entregar durante o horario comercial.');
    cy.contains('a', 'Place Order').click();

    cy.get('[data-qa="name-on-card"]').type('Fabricio Barreto');
    cy.get('[data-qa="card-number"]').type('4111111111111111');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
    cy.get('[data-qa="pay-button"]').click();

    cy.contains(/order placed!/i).should('be.visible');
    cy.contains(/congratulations! your order has been confirmed!/i).should('be.visible');

    cy.contains('a', 'Delete Account').click();
    cy.contains('h2', /account deleted!/i).should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });
});
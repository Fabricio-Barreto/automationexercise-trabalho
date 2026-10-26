describe('Cadastro e exclusão de usuário', () => {
  it('cria uma conta e depois a exclui', () => {
    const userName = 'Fabricio Barreto';
    const email = `fabricio.barreto.${Date.now()}@example.com`;

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
    cy.get('#password').type('CypressPassword123!');
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

    cy.contains('a', 'Delete Account').click();
    cy.contains('h2', /account deleted!/i).should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });
});

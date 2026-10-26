const { useTestAccountLifecycle } = require('../../support/test-account-lifecycle');

describe('Cadastro com e-mail já registrado', () => {
  useTestAccountLifecycle();

  it('exibe erro ao tentar cadastrar um e-mail existente', () => {
    cy.visit('http://automationexercise.com');
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.contains('a', 'Signup / Login').click();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    cy.get('@testAccount').then(({ email }) => {
      cy.get('[data-qa="signup-name"]').type('Fabricio Nogueira');
      cy.get('[data-qa="signup-email"]').type(email);
      cy.get('[data-qa="signup-button"]').click();
      cy.contains('Email Address already exist!').should('be.visible');
    });
  });
});
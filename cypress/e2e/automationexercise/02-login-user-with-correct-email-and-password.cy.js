const { useTestAccountLifecycle } = require('../../support/test-account-lifecycle');

describe('Login e exclusão de usuário', () => {
  useTestAccountLifecycle();

  it('faz login com uma conta existente', () => {
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
  });
});
describe('Login com credenciais incorretas', () => {
  it('exibe uma mensagem de erro ao tentar fazer login', () => {
    cy.visit('http://automationexercise.com');

    cy.get('img[alt="Website for automation practice"]').should('be.visible');

    cy.contains('a', 'Signup / Login').click();
    cy.contains('h2', 'Login to your account').should('be.visible');

    cy.get('[data-qa="login-email"]').type('invalid.user.9f2c@example.invalid');
    cy.get('[data-qa="login-password"]').type('IncorrectPassword123!');
    cy.get('[data-qa="login-button"]').click();

    cy.contains('Your email or password is incorrect!').should('be.visible');
  });
});
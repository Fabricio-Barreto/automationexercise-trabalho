describe('Inscrição na newsletter pela página inicial', () => {
  it('exibe confirmação após inscrição no rodapé', () => {
    const email = `cypress.subscription.${Date.now()}@example.com`;

    cy.visit('http://automationexercise.com');

    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.get('footer').scrollIntoView();
    cy.contains('h2', 'Subscription').should('be.visible');

    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();

    cy.contains(
      '#success-subscribe',
      'You have been successfully subscribed!',
    ).should('be.visible');
  });
});
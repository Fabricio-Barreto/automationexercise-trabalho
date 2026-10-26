const baseUrl = 'http://automationexercise.com';

function createTestAccount() {
  const account = {
    name: 'Cypress Lifecycle User',
    email: `cypress.lifecycle.${Date.now()}.${Math.random().toString(36).slice(2, 8)}@example.com`,
    password: 'CypressPassword123!',
  };

  cy.visit(baseUrl);
  cy.get('img[alt="Website for automation practice"]').should('be.visible');
  cy.contains('a', 'Signup / Login').click();
  cy.contains('h2', 'New User Signup!').should('be.visible');
  cy.get('[data-qa="signup-name"]').type(account.name);
  cy.get('[data-qa="signup-email"]').type(account.email);
  cy.get('[data-qa="signup-button"]').click();

  cy.contains('h2', /enter account information/i).should('be.visible');
  cy.get('#id_gender1').check();
  cy.get('#name').should('have.value', account.name);
  cy.get('#email').should('have.value', account.email);
  cy.get('#password').type(account.password);
  cy.get('#days').select('10');
  cy.get('#months').select('5');
  cy.get('#years').select('1990');
  cy.get('#newsletter').check();
  cy.get('#optin').check();
  cy.get('#first_name').type('Cypress');
  cy.get('#last_name').type('Lifecycle');
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
  cy.contains('a', 'Logged in as').should('contain', account.name);

  return cy.wrap(account, { log: false });
}

function deleteTestAccount(account) {
  cy.visit(baseUrl);

  cy.get('body').then(($body) => {
    if ($body.find('a[href="/delete_account"]').length > 0) {
      cy.contains('a', 'Delete Account').click();
    } else {
      cy.contains('a', 'Signup / Login').click();
      cy.contains('h2', 'Login to your account').should('be.visible');
      cy.get('[data-qa="login-email"]').type(account.email);
      cy.get('[data-qa="login-password"]').type(account.password);
      cy.get('[data-qa="login-button"]').click();
      cy.contains('a', 'Logged in as').should('contain', account.name);
      cy.contains('a', 'Delete Account').click();
    }
  });

  cy.contains('h2', /account deleted!/i).should('be.visible');
  cy.get('[data-qa="continue-button"]').click();
}

function useTestAccountLifecycle() {
  let testAccount;

  beforeEach(() => {
    testAccount = undefined;

    createTestAccount().then((account) => {
      testAccount = account;
      cy.wrap(account, { log: false }).as('testAccount');
      cy.contains('a', 'Logout').click();
    });
  });

  afterEach(() => {
    if (testAccount) {
      deleteTestAccount(testAccount);
    }
  });
}

module.exports = { useTestAccountLifecycle };

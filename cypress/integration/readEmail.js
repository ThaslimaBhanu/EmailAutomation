/// <reference types="cypress-mailslurp" />
before(() => cy
  .mailslurp()
  .then((mailslurp) => mailslurp.createInbox())
  .then((inbox) => {
    cy.wrap(inbox.id).as('inboxId');
    cy.wrap(inbox.emailAddress).as('emailAddress');
  }));

describe('Verify Email Content', () => {
  it('Load Webpage', function () {
    expect(this.emailAddress).to.contain('@mailslurp');
    cy.visit('https://playground.mailslurp.com');
    cy.title().should('contain', 'React App');
  });
  it('Create an account', function () {
    cy.get('[data-test=sign-in-create-account-link]').click();
    // use the email address and a test password
    cy.get('[name=email]').type(this.emailAddress).trigger('change');
    cy.get('[name=password]').type('test-password').trigger('change');
    // click the submit button
    cy.get('[data-test=sign-up-create-account-button]').click();
    // verify an email is received
    cy.waitForLatestEmail(this.inboxId).then((email) => {
      assert.isDefined(email);
      // verify email subject
      assert.strictEqual(/Please confirm your email address/.test(email.subject), true);
      // verify that email contains the code
      assert.strictEqual(/verification code is/.test(email.body), true);
    });
  });
  it('Fetch confirmation code and click on confirm button', function () {
    // read the confirmation code from email and pass it to the sign in form
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(this.inboxId))
      .then((email) => email.body.slice(-6))
      .then((code) => {
        cy.get('[name=code]').type(code).trigger('change');
        cy.get('[data-test=confirm-sign-up-confirm-button]').click();
      });
  });
});

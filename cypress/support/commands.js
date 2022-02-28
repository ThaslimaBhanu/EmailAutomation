// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// import cypress = require("cypress");

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-mailslurp';

const { MailSlurp } = require('mailslurp-client');

const apiKey = '9a2914d62a84305a42be0759a9bbef20b86ee8450b8435893054016a2ce90f2b';
const mailslurp = new MailSlurp({ apiKey });
const inboxId = 'fc3b7d91-5a6d-4d65-bad6-a56e98fec78e';

// Cypress.Commands.add('createInbox', () => mailslurp.createInbox());

Cypress.Commands.add('waitForLatestEmail', () => mailslurp.waitForLatestEmail(inboxId));

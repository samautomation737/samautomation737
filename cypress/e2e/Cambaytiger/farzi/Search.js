import Membership from '../../../support/PageObjects/Membership';
import Home from '../../../support/PageObjects/Home';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test due to the uncaught exception
  return false;
});

describe('Search functionality', () => {


  it('Search functionality', () => {
    cy.visit('https://farzistore-nh.farziengineer.co/');
    // Access the iframe and wait for it to load (e.g., advertisement pop-up)
Membership.closeWedAdvPopup();
    Membership.closeAdvPopup();

    // select location 
    cy.wait(10000);
    cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > :nth-child(3) > .scss_GGLocation__cfABD > .scss_GGLocation__topCont__oRucC > :nth-child(5) > .GGLocation__input > input')
      .click()
      .type("Bangalore", { delay: 100, force: true });
    cy.wait(10000);
    cy.get('.AdressCont__inside > :nth-child(1) > div').click();
    cy.wait(10000);

    cy.get("div[class='showOnDesktop'] input[placeholder='Search for seafood, chicken & more']").should('be.visible').type("But");
    cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(1) > p:nth-child(1)").click();
    cy.get("div[class='showOnDesktop'] li[class='breadcrumbs__active'] a").should("be.visible"); 

  })
})
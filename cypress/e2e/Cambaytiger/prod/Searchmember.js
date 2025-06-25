import Membership from '../../../support/PageObjects/Membership';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test due to the uncaught exception
  return false;
});

describe('Search functionality', () => {


  it('Search functionality', () => {
    cy.visit('https://cambaytiger.com/');
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
    
    cy.get("div[class='showOnDesktop'] input[placeholder='Search for seafood, chicken & more']").should('be.visible').type("member");
    cy.get(".noProductFound").should("be.visible");
    

  })
})
class Home {

  selectPrimaryLocation() {
    cy.wait(10000);
    cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > :nth-child(3) > .scss_GGLocation__cfABD > .scss_GGLocation__topCont__oRucC > :nth-child(5) > .GGLocation__input > input')
    .type("Mumbai", { delay: 100, force: true });
    cy.wait(10000);
    cy.get('.AdressCont__inside > :nth-child(1) > div').click();
    cy.wait(30000);
  }
  loginstage() {
    cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > :nth-child(3) > .GG-main-menu__lower__desktop-right__ul > .GG_dropDown_button > span').click();
    cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div button[class='user-register']").click();
    cy.wait(5000);
    cy.get("input[placeholder='Enter Phone number']").click().type("6388789049", { delay: 100, force: true });
    cy.get("button[type='submit']").click();
    cy.get("#otp-0").type("123456",);
    cy.wait(5000);
    cy.get("button[type='submit']").click();
    cy.wait(30000);
  }
  
  login() {
    cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > :nth-child(3) > .GG-main-menu__lower__desktop-right__ul > .GG_dropDown_button > span').click();
    cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div button[class='user-register']").click();
    cy.wait(5000);
    cy.get("input[placeholder='Enter Phone number']").click().type("6388789049", { delay: 100, force: true });
    cy.get('.scss_loginRegCont__m2Dae > button').click();
    cy.get("#otp-0").type("123456",);
    cy.wait(5000);
    cy.get('.scss_loginRegCont__m2Dae > button').click();
    cy.wait(30000);
  }

  cartClear() {
    // cy.get(".our-categories__heading").should('be.visible');
    cy.get('body').then(($body) => {
      const cartQuantitySelector = ".GG-main-menu__cart__quantity__gg";
      const cartHeaderSelector = ".overlayFarzicom__header__text";
      const deleteButtonSelector = ".sc-fsGQkc.bgexUZ";

      if (
        $body.find(cartQuantitySelector).is(':visible') &&
        $body.find(cartQuantitySelector).text().trim() !== '0'
      ) {
        cy.log('Cart is not empty, proceeding to delete items.');

        // Click on the Cart button
        cy.contains("Cart").eq(0).click();

        // Validate Cart heading
        cy.get(cartHeaderSelector).should('exist').and('be.visible');

        // Perform the delete action
        cy.get(deleteButtonSelector).should('exist').click({ multiple: true });
        cy.get(".overlayFarzicom__header__close-icon").click();
        cy.reload();
        cy.log('All items were deleted successfully.');
      } else {
        cy.log('Cart is empty, no action performed.');
      }
    });
  }
}

export default new Home();
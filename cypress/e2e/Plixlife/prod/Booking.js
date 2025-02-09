import 'cypress-iframe';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevents the test from failing due to uncaught exceptions
  return false;
});

describe('Booking flow', () => {
  it('Booking flow', () => {
    // Visit the PlixLife website
    cy.visit('https://www.plixlife.com/');

    // Access the iframe and wait for it to load (e.g., advertisement pop-up)
    cy.get("#wiz-iframe-intent").then((iframedata) => {
      // Access the contents of the iframe's body
      iframedata.contents().find('body');
    });

    // Reload the page to ensure any pop-ups or advertisements are closed
    cy.reload();

    // Function to ensure navigation to the Product Detail Page (PDP) by repeatedly clicking on the product link
    function clickUntilProductNameAppears() {
      cy.get('body').then(($body) => {
        // Check if the product title is visible on the PDP
        if ($body.find('[data-test="productName"]').length === 0) {
          // Click the product link to navigate to the PDP
          cy.contains('a', 'Weight Loss Plan').click({ force: true });

          // Wait briefly before checking again
          cy.wait(500);
          clickUntilProductNameAppears();
        } else {
          // Stop further clicks if the PDP has loaded
          cy.log('Product detail page loaded, stopping further actions.');
        }
      });
    }

    // Invoke the function to ensure the PDP is successfully loaded
    clickUntilProductNameAppears();

    // Add the product to the cart from the PDP
    cy.get('.desktopAddToCartPdp__mainText')
      .should('be.visible') // Verify the "Add to Cart" button is visible
      .click(); // Click the "Add to Cart" button

    // Verify that the product has been added to the cart
    cy.contains('Weight Loss Plan').should('be.visible');

    // Close the cart to proceed with further actions
    cy.get('.cart_closebutton').click();

    // Search for another product (e.g., "ACV") in the search bar
    cy.get("li[class='plixlife-main-menu__searchInput'] div div[class='SearchSuggestionBar_wrapper__1Uc5K']").type('ACV');

    // Add a product to the cart from the product listing page
    cy.get(':nth-child(2) > .productCardContainer > .sc-fYiAbW > .undefined__buttonContainer > [data-test="addProductToCartButton"]').click();

    // Verify that the second product has been added to the cart
    cy.contains('Fit & Slim').should('be.visible');

    // Proceed to place the order
    cy.get('.new-place-button').click();

    // Verify that the payment pop-up iframe appears
    cy.get('#gokwik-iframe').then((iframedata) => {
      // Access the iframe's document
      iframedata.contents().find('body');
    });

    // Redirect to the checkout address page
    cy.visit('https://www.plixlife.com/checkout/address');

    // Fill in the checkout form with user details
    cy.get(':nth-child(1) > .CheckoutV3_row__B8iYl > .CheckoutV3_inputErroDiv__Mnt0N > .Input_inputContainer1___hB1t > .Input_inputContainer1__input__nFgYI').type('6388789049');
    cy.get('.CheckoutV3_formFieldsContainer__oslV0 > :nth-child(5) > .CheckoutV3_row__B8iYl > :nth-child(1) > .Input_inputContainer1___hB1t > .Input_inputContainer1__input__nFgYI').type('Shubham');
    cy.get(':nth-child(5) > .CheckoutV3_row__B8iYl > :nth-child(2) > .Input_inputContainer1___hB1t > .Input_inputContainer1__input__nFgYI').type('Srivastava');
    cy.get(':nth-child(6) > .CheckoutV3_row__B8iYl > .CheckoutV3_inputErroDiv__Mnt0N > .Input_inputContainer1___hB1t > .Input_inputContainer1__input__nFgYI').type('samsrivastava.uptech@gmail.com');
    cy.get(':nth-child(7) > .CheckoutV3_row__B8iYl > :nth-child(1) > .Input_inputContainer1___hB1t > .Input_inputContainer1__input__nFgYI').type('226004');
    cy.get(':nth-child(7) > .CheckoutV3_row__B8iYl > :nth-child(2) > .Input_inputContainer1___hB1t > .Input_inputContainer1__input__nFgYI').type('Lucknow');
    cy.get('.Select_selectContainer1__select__MYDmO').select('Uttar Pradesh');
    cy.get(':nth-child(9) > .CheckoutV3_row__B8iYl > .CheckoutV3_inputErroDiv__Mnt0N > .Input_inputContainer1___hB1t > .Input_inputContainer1__input__nFgYI').type('test test');
    cy.wait(10000);
    cy.contains('Cash On Delivery').click();
    cy.wait(5000);
    cy.contains('Cash On Delivery').click();   
    
    cy.wait(10000);
    // Click on the button
    cy.get('.CheckoutV3_onlyLargeScreen__ckqbj > .Input_inputContainer2__HvuL0 > .Input_inputContainer2__input__bAkR6').click();
  });
});




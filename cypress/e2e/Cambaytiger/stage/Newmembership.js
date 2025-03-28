import Membership from '../../../support/PageObjects/Membership';
import Home from '../../../support/PageObjects/Home';

import 'cypress-iframe'
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Response not successful: Received status code 400')) {
    return false; // Ignore this specific error
  }
  return false;
});


describe('Membership functionality', () => {

  const location1 = [
    'Mumbai',
    'delhi airport',
    'Bangalore'
  ];
  const cartQuantitySelector = ".GG-main-menu__cart__quantity__gg";
  const addToCart1 = "div[class='showOnDesktop'] div[class='Membership_parentMemberContainer__Hbxf8'] span[class='sc-htpNat hamzJc']";
  const addToCart2 = "div[class='showOnDesktop'] div[class='Membership_parentMemberContainer__Hbxf8'] span[class='sc-htpNat hamzJc']";
  

  it('Bronze Membership functionality', () => {
    cy.visit('https://cambaytigerstage-nh.farziengineer.co/');
    
    // Select location 
    Home.selectPrimaryLocation();

    //  Login
    Home.login();    
        
    
    // select location & open cambay club page
    Membership.openMembershipPage();

    
    //Clear Cart
    Home.cartClear();

    //Select Bronze
    cy.get("div[class='showOnDesktop'] div[class='Membership_parentMemberContainer__Hbxf8'] div:nth-child(3) span:nth-child(2)").click();
        
    Cypress._.forEach(location1, (location) => {
        context(`Testing food ordering at ${location}`, () => {
          // Home.updateLocationLoop();
          selectLocationUntilNotMumbai();
          function selectLocationUntilNotMumbai() {
            // Click on the location field to open the location selector
            cy.wait(5000);
            cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > [data-test="menuCartOverlayLink"] > .GG-main-menu__icon__LocationStateCity > p')
              .click();
  
            // Set location to "Other Location"
            cy.wait(1000);
            cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div div[class='scss_GGLocation__cfABD'] div[class='scss_GGLocation__topCont__oRucC'] div input[placeholder='Please enter delivery location...']")
              // .should('have.class', 'active')
              .click()
              .type(location, { delay: 100, force: true })
              .then(() => {
  
                // Assert to check if the selected location is not "Mumbai"
                cy.wait(15000);
                cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div div[class='scss_GGLocation__cfABD'] div[class='scss_GGLocation__topCont__oRucC'] div input[placeholder='Please enter delivery location...']").then(($elelocation) => {
                  if ($elelocation.val().includes(location)) {
                    // If location is still "Mumbai," re-run the function to select again
                    cy.wait(1000);
                    cy.get('.AdressCont__inside > :nth-child(1) > div').click();
                    cy.wait(15000);
                  } else {
                    // Location is not "Mumbai," test can proceed                    
                    cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div p[class='GGLocation__hide']").click();
                    cy.log($elelocation)
                    selectLocationUntilNotMumbai();
                  }
                });
              });
          }

            // Select Silver
            cy.get(addToCart1).click();
            cy.wait(5000);
    
            // Check cart quantity
            cy.get(cartQuantitySelector).invoke('text').then((text) => {
                const cartQuantity = parseInt(text.trim());
                
                if (cartQuantity !== 0) {
                    // Break the loop
                    return false; // Lodash handles breaking internally
                }
            });
        });
    });
    
   
    //Checkout
    Membership.checkout();

    //Razorpay
    Membership.razorpay();
    
      // Define headers
      const headers = {
        Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE5OTczNTcsImV4cCI6MTczMTk5NzY1NywidG9rZW4iOiJJaXdlMGpaZ2NVT3EiLCJlbWFpbCI6InNodWJoYW0uc0Bicmltby5pbiIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqbzVNakk1TXc9PSIsImlzX3N0YWZmIjp0cnVlfQ.y0jsDAXVcxOfmWobuY81odW5I9ZU34TViWtR73L0RCo',
        'Content-Type': 'application/json',
      };
    const query = `
          mutation {
            createMembership(input: {userId: "92294", tier: TIER_1}) {
              success
            }
          }
        `;
    
        
    
        // Send the GraphQL request
        cy.request({
          method: 'POST',
          url: 'https://cambaytigerstagehapi.farziengineer.co/graphql/?source=website', // Replace with your API endpoint
          body: {
            query,
          },
          headers,
        }).then((response) => {
          // Assert the response
          expect(response.status).to.eq(200); // Ensure the request was successful
        });
      

    

       

    //Visit membership page
    cy.visit('https://cambaytigerstage-nh.farziengineer.co/page/membership');

    //Verify the membership
    cy.get("div[class='showOnDesktop'] div[class='Membership_planType__ZeJCO']").should("have.text", "Bronze");
    cy.get("div[class='showOnDesktop'] div[class='Membership_duration__Wz9aN']").should("have.text", "Plan Duration : 1 month ");

    //Clear Cart
    Home.cartClear();

    //Order Place
    Membership.orderPlace();

    //Verify deliverycharges
    Membership.verifyDeliveryCharges();
    
    // Product checkout
    Membership.productcheckout();
    // Remove membership
    Membership.removeMembership();
  



    
  })

  it('Gold Membership functionality', () => {
    cy.visit('https://cambaytigerstage-nh.farziengineer.co/');
    
    // Select location 
    Home.selectPrimaryLocation();

    //  Login
    Home.login();
    
    // select location & open cambay club page
    Membership.openMembershipPage();

    
    //Clear Cart
    Home.cartClear();

    //Select Gold
    cy.get("div[class='showOnDesktop'] div[class='Membership_parentMemberContainer__Hbxf8'] div:nth-child(5) span:nth-child(2)").click();
    
    Cypress._.forEach(location1, (location) => {
      context(`Testing food ordering at ${location}`, () => {
        // Home.updateLocationLoop();
        selectLocationUntilNotMumbai();
        function selectLocationUntilNotMumbai() {
          // Click on the location field to open the location selector
          cy.wait(5000);
          cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > [data-test="menuCartOverlayLink"] > .GG-main-menu__icon__LocationStateCity > p')
            .click();

          // Set location to "Other Location"
          cy.wait(1000);
          cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div div[class='scss_GGLocation__cfABD'] div[class='scss_GGLocation__topCont__oRucC'] div input[placeholder='Please enter delivery location...']")
            // .should('have.class', 'active')
            .click()
            .type(location, { delay: 100, force: true })
            .then(() => {

              // Assert to check if the selected location is not "Mumbai"
              cy.wait(15000);
              cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div div[class='scss_GGLocation__cfABD'] div[class='scss_GGLocation__topCont__oRucC'] div input[placeholder='Please enter delivery location...']").then(($elelocation) => {
                if ($elelocation.val().includes(location)) {
                  // If location is still "Mumbai," re-run the function to select again
                  cy.wait(1000);
                  cy.get('.AdressCont__inside > :nth-child(1) > div').click();
                  cy.wait(15000);
                } else {
                  // Location is not "Mumbai," test can proceed                    
                  cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div p[class='GGLocation__hide']").click();
                  cy.log($elelocation)
                  selectLocationUntilNotMumbai();
                }
              });
            });
        }

          // Select Silver
          cy.get(addToCart2).click();
          cy.wait(5000);
  
          // Check cart quantity
          cy.get(cartQuantitySelector).invoke('text').then((text) => {
              const cartQuantity = parseInt(text.trim());
              
              if (cartQuantity !== 0) {
                  // Break the loop
                  return false; // Lodash handles breaking internally
              }
          });
      });
  });
  
    
     
    //Checkout
    Membership.checkout();

    //Razorpay
    // Membership.razorpay();
    // Define headers
  const headers = {
    Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE5OTczNTcsImV4cCI6MTczMTk5NzY1NywidG9rZW4iOiJJaXdlMGpaZ2NVT3EiLCJlbWFpbCI6InNodWJoYW0uc0Bicmltby5pbiIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqbzVNakk1TXc9PSIsImlzX3N0YWZmIjp0cnVlfQ.y0jsDAXVcxOfmWobuY81odW5I9ZU34TViWtR73L0RCo',
    'Content-Type': 'application/json',
  };

    const query = `
          mutation {
            createMembership(input: {userId: "92294", tier: TIER_3}) {
              success
            }
          }
        `;
    
        
    
        // Send the GraphQL request
        cy.request({
          method: 'POST',
          url: 'https://cambaytigerstagehapi.farziengineer.co/graphql/?source=website', // Replace with your API endpoint
          body: {
            query,
          },
          headers,
        }).then((response) => {
          // Assert the response
          expect(response.status).to.eq(200); // Ensure the request was successful
        });
      

    

    
    //Visit membership page
    cy.visit('https://cambaytigerstage-nh.farziengineer.co/page/membership');

    //Verify the membership
    cy.get("div[class='showOnDesktop'] div[class='Membership_planType__ZeJCO']").should("have.text", "Gold");
    cy.get("div[class='showOnDesktop'] div[class='Membership_duration__Wz9aN']").should("have.text", "Plan Duration : 6 month ");

    //Clear Cart
    Home.cartClear();

    //Order Place
    Membership.orderPlace();

    //Verify deliverycharges
    Membership.verifyDeliveryCharges();
    
    // Product checkout
    Membership.productcheckout();
    // Remove membership
    Membership.removeMembership();
  
  })

  it('Silver Membership functionality', () => {
    cy.visit('https://cambaytigerstage-nh.farziengineer.co/');
    
    // Select location 
    Home.selectPrimaryLocation();

     // Login
    Home.login();
    
    // select location & open cambay club page
    Membership.openMembershipPage();

    
    //Clear Cart
    Home.cartClear();

    
    Cypress._.forEach(location1, (location) => {
        context(`Testing food ordering at ${location}`, () => {
          // Home.updateLocationLoop();
          selectLocationUntilNotMumbai();
          function selectLocationUntilNotMumbai() {
            // Click on the location field to open the location selector
            cy.wait(5000);
            cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > [data-test="menuCartOverlayLink"] > .GG-main-menu__icon__LocationStateCity > p')
              .click();
  
            // Set location to "Other Location"
            cy.wait(1000);
            cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div div[class='scss_GGLocation__cfABD'] div[class='scss_GGLocation__topCont__oRucC'] div input[placeholder='Please enter delivery location...']")
              // .should('have.class', 'active')
              .click()
              .type(location, { delay: 100, force: true })
              .then(() => {
  
                // Assert to check if the selected location is not "Mumbai"
                cy.wait(15000);
                cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div div[class='scss_GGLocation__cfABD'] div[class='scss_GGLocation__topCont__oRucC'] div input[placeholder='Please enter delivery location...']").then(($elelocation) => {
                  if ($elelocation.val().includes(location)) {
                    // If location is still "Mumbai," re-run the function to select again
                    cy.wait(1000);
                    cy.get('.AdressCont__inside > :nth-child(1) > div').click();
                    cy.wait(15000);
                  } else {
                    // Location is not "Mumbai," test can proceed                    
                    cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div[class='scss_logoSearchContainer__ca6MR'] div p[class='GGLocation__hide']").click();
                    cy.log($elelocation)
                    selectLocationUntilNotMumbai();
                  }
                });
              });
          }

            // Select Silver
            cy.get(addToCart1).click();
            cy.wait(5000);
    
            // Check cart quantity
            cy.get(cartQuantitySelector).invoke('text').then((text) => {
                const cartQuantity = parseInt(text.trim());
                
                if (cartQuantity !== 0) {
                    // Break the loop
                    return false; // Lodash handles breaking internally
                }
            });
        });
    });
    //Checkout
    Membership.checkout();

    //Razorpay
    Membership.razorpay();
    
      // Define headers
      const headers = {
        Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE5OTczNTcsImV4cCI6MTczMTk5NzY1NywidG9rZW4iOiJJaXdlMGpaZ2NVT3EiLCJlbWFpbCI6InNodWJoYW0uc0Bicmltby5pbiIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqbzVNakk1TXc9PSIsImlzX3N0YWZmIjp0cnVlfQ.y0jsDAXVcxOfmWobuY81odW5I9ZU34TViWtR73L0RCo',
        'Content-Type': 'application/json',
      };
    const query = `
          mutation {
            createMembership(input: {userId: "92294", tier: TIER_2}) {
              success
            }
          }
        `;
    
        
    
        // Send the GraphQL request
        cy.request({
          method: 'POST',
          url: 'https://cambaytigerstagehapi.farziengineer.co/graphql/?source=website', // Replace with your API endpoint
          body: {
            query,
          },
          headers,
        }).then((response) => {
          // Assert the response
          expect(response.status).to.eq(200); // Ensure the request was successful
        });
      

    

    
    //Visit membership page
    cy.visit('https://cambaytigerstage-nh.farziengineer.co/page/membership');
    

    //Verify the membership
    cy.get("div[class='showOnDesktop'] div[class='Membership_planType__ZeJCO']").should("have.text", "Silver");
    cy.get("div[class='showOnDesktop'] div[class='Membership_duration__Wz9aN']").should("have.text", "Plan Duration : 3 month ");

    //Clear Cart
    Home.cartClear();

    //Order Place
    Membership.orderPlace();

    //Verify deliverycharges
    Membership.verifyDeliveryCharges();
    
    // Product checkout
    Membership.productcheckout();
    // Remove membership
    Membership.removeMembership();
  })
})
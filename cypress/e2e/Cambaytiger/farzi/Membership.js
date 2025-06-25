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
    cy.visit('https://farzistore-nh.farziengineer.co/');
Membership.closeWedAdvPopup();
    Membership.closeAdvPopup();

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
    
  })

  
  it('Gold Membership functionality', () => {
    cy.visit('https://farzistore-nh.farziengineer.co/');
Membership.closeWedAdvPopup();
    Membership.closeAdvPopup();

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
    Membership.razorpay();
  })

  it('Silver Membership functionality', () => {
    cy.visit('https://farzistore-nh.farziengineer.co/');
Membership.closeWedAdvPopup();
    Membership.closeAdvPopup();

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
   

     
  })
})
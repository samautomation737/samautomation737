class Home {

  selectPrimaryLocation() {
    cy.wait(10000);
    cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > :nth-child(3) > .scss_GGLocation__cfABD > .scss_GGLocation__topCont__oRucC > :nth-child(5) > .GGLocation__input > input')
    .type("Mumbai", { delay: 100, force: true });
    cy.wait(10000);
    cy.get('.AdressCont__inside > :nth-child(1) > div').click();
    cy.wait(30000);
  }
  login() {
    cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > :nth-child(3) > .GG-main-menu__lower__desktop-right__ul > .GG_dropDown_button > span').click();
    cy.get("div[class='showOnDesktop'] nav[id='header'] div[class='scss_mainNavContainerWrapper__m_O_A'] div[class='scss_mainNavContainer__UDVhL'] div button[class='user-register']").click();
    cy.wait(5000);
    cy.get("input[placeholder='Enter Phone number']").click().type("6388789049", { delay: 100, force: true });
    cy.get("button[type='submit']").click();
    cy.wait(10000);
    cy.get("#otp-0").type("123456");
    cy.wait(5000);
    cy.get("button[type='submit']").click({ delay: 100, force: true });
    cy.wait(40000);
  }
  

  cartClear() {
    // cy.get(".our-categories__heading").should('be.visible');
    cy.get('body').then(($body) => {
      const cartQuantitySelector = ".GG-main-menu__cart__quantity__gg";
      const cartHeaderSelector = ".overlayFarzicom__header__text";
      const deleteButtonSelector = ".sc-jxgvnK.dYIHMe";
      // const deleteButtonSelector = ".sc-fsGQkc.bgexUZ";
      

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

  addWalletBalanceStage() {
    // Define headers
  const headers = {
  Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE5OTczNTcsImV4cCI6MTczMTk5NzY1NywidG9rZW4iOiJJaXdlMGpaZ2NVT3EiLCJlbWFpbCI6InNodWJoYW0uc0Bicmltby5pbiIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqbzVNakk1TXc9PSIsImlzX3N0YWZmIjp0cnVlfQ.y0jsDAXVcxOfmWobuY81odW5I9ZU34TViWtR73L0RCo',
  'Content-Type': 'application/json',
  };
    const addWalletBalanceQuery = `
  mutation {
walletBalanceUpdate(
  input: {
    userId: "VXNlcjo5MjI5NA=="
    secret: "TIGER"
    amount: 50              
    type: "ADD"                    
    reason: "Bonus Cashback"
    # expireInDays:"10"
  }
) {
  wallet {
    id
    amount
    expiryDate
  }
}
}
  `;
  
  cy.request({
  method: 'POST',
  url: 'https://cambaytigerstagehapi.farziengineer.co/graphql/?source=website', // Replace with your actual endpoint
  body: {
    query: addWalletBalanceQuery,
  },
  headers,
  }).then((response) => {
  // Validate response status
  expect(response.status).to.eq(200);
  
  
  });
  }

  removeWalletBalanceStage() {
    // Define headers
  const headers = {
  Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE5OTczNTcsImV4cCI6MTczMTk5NzY1NywidG9rZW4iOiJJaXdlMGpaZ2NVT3EiLCJlbWFpbCI6InNodWJoYW0uc0Bicmltby5pbiIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqbzVNakk1TXc9PSIsImlzX3N0YWZmIjp0cnVlfQ.y0jsDAXVcxOfmWobuY81odW5I9ZU34TViWtR73L0RCo',
  'Content-Type': 'application/json',
  };
    const addWalletBalanceQuery = `
  mutation {
walletBalanceUpdate(
  input: {
    userId: "VXNlcjo5MjI5NA=="
    secret: "TIGER"
    amount: 500              
    type: "SUB"                    
    reason: "Bonus Cashback"
    # expireInDays:"10"
  }
) {
  wallet {
    id
    amount
    expiryDate
  }
}
}
  `;
  
  cy.request({
  method: 'POST',
  url: 'https://cambaytigerstagehapi.farziengineer.co/graphql/?source=website', // Replace with your actual endpoint
  body: {
    query: addWalletBalanceQuery,
  },
  headers,
  }).then((response) => {
  // Validate response status
  expect(response.status).to.eq(200);
  
  
  });
  }

  addWalletBalanceProd() {
    // Define headers
  const headers = {
    Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzUyMTQ5MTEsImV4cCI6MTczNTIxNTIxMSwidG9rZW4iOiIxUHVkcGZTenRoeTUiLCJlbWFpbCI6InNodWJoYW0uc0Bicmltby5pbiIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqbzVORGt3Tnc9PSIsImlzX3N0YWZmIjp0cnVlfQ._RfKNyR0uF8P2Xun4UCV1NSB3Z0-P_B1GUUgZC4YUT4',
    'Content-Type': 'application/json',
  };
    const addWalletBalanceQuery = `
  mutation {
walletBalanceUpdate(
  input: {
    userId: "VXNlcjo5MjgzMA=="
    secret: "TIGER"
    amount: 50              
    type: "ADD"                    
    reason: "Bonus Cashback"
    # expireInDays:"10"
  }
) {
  wallet {
    id
    amount
    expiryDate
  }
}
}
  `;
  
  cy.request({
  method: 'POST',
  url: 'https://cambaytigerhapi.farziengineer.co/graphql/?source=website', 
  body: {
    query: addWalletBalanceQuery,
  },
  headers,
  }).then((response) => {
  // Validate response status
  expect(response.status).to.eq(200);
  
  
  });
  }
  removeWalletBalanceProd() {
    // Define headers
  const headers = {
    Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzUyMTQ5MTEsImV4cCI6MTczNTIxNTIxMSwidG9rZW4iOiIxUHVkcGZTenRoeTUiLCJlbWFpbCI6InNodWJoYW0uc0Bicmltby5pbiIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqbzVORGt3Tnc9PSIsImlzX3N0YWZmIjp0cnVlfQ._RfKNyR0uF8P2Xun4UCV1NSB3Z0-P_B1GUUgZC4YUT4',
    'Content-Type': 'application/json',
  };
    const addWalletBalanceQuery = `
  mutation {
walletBalanceUpdate(
  input: {
    userId: "VXNlcjo5MjgzMA=="
    secret: "TIGER"
    amount: 500              
    type: "SUB"                    
    reason: "Bonus Cashback"
    # expireInDays:"10"
  }
) {
  wallet {
    id
    amount
    expiryDate
  }
}
}
  `;
  
  cy.request({
  method: 'POST',
  url: 'https://cambaytigerhapi.farziengineer.co/graphql/?source=website', 
  body: {
    query: addWalletBalanceQuery,
  },
  headers,
  }).then((response) => {
  // Validate response status
  expect(response.status).to.eq(200);
  
  
  });
  }

}

export default new Home();
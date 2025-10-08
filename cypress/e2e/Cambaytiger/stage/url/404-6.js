let failedUrls = []; // Array to track failed URLs

Cypress.on('fail', (error, runnable) => {
  cy.task('log', `Test failed: ${runnable.title}`);
  throw error; // Re-throw the error to fail the test
});

Cypress.on('uncaught:exception', () => {
  return false;
});

describe('Template Spec', () => {

  it('Task Loop', () => {
    // ✅ Load product URLs from fixture (DDT)
    cy.fixture('product_urls').then((data) => {
      const product_urls = data.urls;

      cy.visit('https://cambaytigerstage-nh.farziengineer.co/');
      cy.wait(10000);

      // select location 
      cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > :nth-child(3) > .scss_GGLocation__cfABD > .scss_GGLocation__topCont__oRucC > :nth-child(5) > .GGLocation__input > input')
        .type("Bangalore", { delay: 100, force: true });
      cy.wait(10000);
      cy.get('.AdressCont__inside > :nth-child(1) > div').click();
      cy.wait(10000);

      // Loop through each product URL and test
      product_urls.slice(251,300).forEach((product_url) => {
      cy.visit(product_url, { timeout: 500000, failOnStatusCode: false });

        // product_urls.forEach((product_url) => {
        // cy.visit(product_url, { timeout: 500000, failOnStatusCode: false });

        cy.get('body').then((body) => {
          const locator_heading = "div[class='showOnDesktop'] div[class='scss_appContainer__yvhBB'] li:nth-child(1) a:nth-child(1)";

          if (body.find(locator_heading).length === 0) {
            cy.log("404 Page Not Found error detected.");
            failedUrls.push(product_url);
          }
        });
      });
    });
  });

  after(() => {
    if (failedUrls.length > 0) {
      cy.task('log', "The following URLs failed:");
      failedUrls.forEach(url => cy.task('log', url));
      cy.get("Some Urls contains 404 page", { timeout: 1000 });
    } else {
      cy.task('log', "All URLs passed successfully.");
    }
  });

});

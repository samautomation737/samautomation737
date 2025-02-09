let failedUrls = []; // Array to track failed URLs
Cypress.on('fail', (error, runnable) => {
  // Add any custom behavior during failure, e.g., logging the error
  cy.task('log', `Test failed: ${runnable.title}`);
  throw error; // Re-throw the error to fail the test
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test due to the uncaught exception
  return false;
});

describe('Template Spec', () => {

  it('Task Loop', () => {
    const product_urls = [
'https://farzistore-nh.farziengineer.co/product/artisanal-pork-cold-cut-with-red-paprica-flakes',
'https://farzistore-nh.farziengineer.co/product/artisanal-pork-cold-cut-lyoner-plain',
'https://farzistore-nh.farziengineer.co/product/artisanal-pork-smoked-ham-block',
'https://farzistore-nh.farziengineer.co/product/artisanal-pork-bavarian-style-meat-loaf',
'https://farzistore-nh.farziengineer.co/product/artisanal-pork-honey-roast-ham-block',
'https://farzistore-nh.farziengineer.co/product/artisanal-pork-smoked-pepperoni-dry-salami',
'https://farzistore-nh.farziengineer.co/product/artisanal-pork-black-forest-ham-block',
'https://farzistore-nh.farziengineer.co/product/gourmet-pork-salami-spicy-roll',
'https://farzistore-nh.farziengineer.co/product/gourmet-pork-salami-roll',
'https://farzistore-nh.farziengineer.co/product/gourmet-smoked-ham-block',
'https://farzistore-nh.farziengineer.co/product/gourmet-prime-ham-block',
'https://farzistore-nh.farziengineer.co/product/select-turkey-bacon',
'https://farzistore-nh.farziengineer.co/product/select-turkey-pastrami',
'https://farzistore-nh.farziengineer.co/product/select-smoked-turkey-ham',
'https://farzistore-nh.farziengineer.co/product/select-smoked-turkey-breast',
'https://farzistore-nh.farziengineer.co/product/premium-smoked-turkey-breast',
'https://farzistore-nh.farziengineer.co/product/artisanal-chicken-cold-cut-red-paprica-flakes',
'https://farzistore-nh.farziengineer.co/product/artisanal-chicken-cold-cut-ham',
'https://farzistore-nh.farziengineer.co/product/artisanal-chicken-meat-loaf',
'https://farzistore-nh.farziengineer.co/product/gourmet-smoked-chicken-salami-roll',
'https://farzistore-nh.farziengineer.co/product/gourmet-chicken-chilli-salami-roll',
'https://farzistore-nh.farziengineer.co/product/gourmet-chicken-salami-roll',
'https://farzistore-nh.farziengineer.co/product/gourmet-chicken-pepper-lyoner-roll',
'https://farzistore-nh.farziengineer.co/product/gourmet-smoked-turkey-ham-block',
'https://farzistore-nh.farziengineer.co/product/gourmet-chicken-ham-block',
'https://farzistore-nh.farziengineer.co/product/premium-turkey-breast',
'https://farzistore-nh.farziengineer.co/product/gourmet-chicken-paprica-lyoner-roll',
'https://farzistore-nh.farziengineer.co/product/party-bites'
    ];

    cy.visit('https://farzistore-nh.farziengineer.co/');
    //   cy.reload({ timeout: 100000 });

    // select location 
    cy.wait(10000);
    cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > :nth-child(3) > .scss_GGLocation__cfABD > .scss_GGLocation__topCont__oRucC > :nth-child(5) > .GGLocation__input > input').type("Bangalore", { delay: 100, force: true });
    cy.wait(10000);
    cy.get('.AdressCont__inside > :nth-child(1) > div').click();
    cy.wait(10000);

    // Loop through each product URL and test
    product_urls.forEach((product_url) => {
      cy.visit(product_url, { timeout: 500000, failOnStatusCode: false });

      cy.get('body').then((body) => {
        // you-may-also-like heading in valid pdp
        const locator_heading = "div[class='showOnDesktop'] div[class='scss_appContainer__yvhBB'] li:nth-child(1) a:nth-child(1)";

        // Check if the 404 error or continue button is present
        if (body.find(locator_heading).length === 0) {
          // Log error message
          cy.log("404 Page Not Found error detected.");
          failedUrls.push(product_url);  // Add failed URL to the array

        }
      });
    });
  });

  // Log all failed URLs after the test suite is complete
  after(() => {
    if (failedUrls.length > 0) {
      // Log failed URLs regardless of the test outcome
      cy.task('log', "The following URLs failed:");
      failedUrls.forEach(url => cy.task('log', url));
      // throw new Error("One or more URLs failed."); // Explicitly fail the test suite
      cy.get("Some Urls contains 404 page", { timeout: 1000 });
    } else {
      cy.task('log', "All URLs passed successfully."); // Always log success
    }
  });




});

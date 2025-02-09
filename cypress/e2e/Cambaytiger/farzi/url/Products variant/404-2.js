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
'https://farzistore-nh.farziengineer.co/product/chicken-galouti-kebab',
'https://farzistore-nh.farziengineer.co/product/mutton-onion-kebab',
'https://farzistore-nh.farziengineer.co/product/mutton-shammi-kebab',
'https://farzistore-nh.farziengineer.co/product/mutton-seekh',
'https://farzistore-nh.farziengineer.co/product/chicken-achaari-seekh',
'https://farzistore-nh.farziengineer.co/product/chicken-ajwaini-seekh',
'https://farzistore-nh.farziengineer.co/product/chicken-lime-pudina-seekh',
'https://farzistore-nh.farziengineer.co/product/chicken-malai-seekh',
'https://farzistore-nh.farziengineer.co/product/chicken-original-seekh',
'https://farzistore-nh.farziengineer.co/product/mutton-meat-balls',
'https://farzistore-nh.farziengineer.co/product/premium-cured-chorizo-chilly',
'https://farzistore-nh.farziengineer.co/product/heritage-napoli-spicy-salami',
'https://farzistore-nh.farziengineer.co/product/heritage-milano-salami',
'https://farzistore-nh.farziengineer.co/product/heritage-prosciutto-crudo',
'https://farzistore-nh.farziengineer.co/product/heritage-parma-ham-deboned',
'https://farzistore-nh.farziengineer.co/product/heritage-smoked-pancetta',
'https://farzistore-nh.farziengineer.co/product/heritage-coppa-parma-gran',
'https://farzistore-nh.farziengineer.co/product/prime-smoked-breakfast-ham',
'https://farzistore-nh.farziengineer.co/product/prime-bbq-ham',
'https://farzistore-nh.farziengineer.co/product/prime-bbq-premium-smoked-ham',
'https://farzistore-nh.farziengineer.co/product/premium-spanish-toast-ham',
'https://farzistore-nh.farziengineer.co/product/prime-traditional-honey-roasted-ham',
'https://farzistore-nh.farziengineer.co/product/prime-d-shape-cooked-breakfast-ham',
'https://farzistore-nh.farziengineer.co/product/crisp-streaky-bacon',
'https://farzistore-nh.farziengineer.co/product/prime-us-style-rindless-bacon',
'https://farzistore-nh.farziengineer.co/product/classic-salame-napoli',
'https://farzistore-nh.farziengineer.co/product/classic-salami-milano',
'https://farzistore-nh.farziengineer.co/product/classic-cooked-ham',
'https://farzistore-nh.farziengineer.co/product/classic-pork-mortadella',
'https://farzistore-nh.farziengineer.co/product/classic-coppa-parma',
'https://farzistore-nh.farziengineer.co/product/signature-serrano-ham-block'

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

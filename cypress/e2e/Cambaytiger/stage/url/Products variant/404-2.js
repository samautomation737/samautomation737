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
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-galouti-kebab',
'https://cambaytigerstage-nh.farziengineer.co/product/mutton-onion-kebab',
'https://cambaytigerstage-nh.farziengineer.co/product/mutton-shammi-kebab',
'https://cambaytigerstage-nh.farziengineer.co/product/mutton-seekh',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-achaari-seekh',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-ajwaini-seekh',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-lime-pudina-seekh',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-malai-seekh',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-original-seekh',
'https://cambaytigerstage-nh.farziengineer.co/product/mutton-meat-balls',
'https://cambaytigerstage-nh.farziengineer.co/product/premium-cured-chorizo-chilly',
'https://cambaytigerstage-nh.farziengineer.co/product/heritage-napoli-spicy-salami',
'https://cambaytigerstage-nh.farziengineer.co/product/heritage-milano-salami',
'https://cambaytigerstage-nh.farziengineer.co/product/heritage-prosciutto-crudo',
'https://cambaytigerstage-nh.farziengineer.co/product/heritage-parma-ham-deboned',
'https://cambaytigerstage-nh.farziengineer.co/product/heritage-smoked-pancetta',
'https://cambaytigerstage-nh.farziengineer.co/product/heritage-coppa-parma-gran',
'https://cambaytigerstage-nh.farziengineer.co/product/prime-smoked-breakfast-ham',
'https://cambaytigerstage-nh.farziengineer.co/product/prime-bbq-ham',
'https://cambaytigerstage-nh.farziengineer.co/product/prime-bbq-premium-smoked-ham',
'https://cambaytigerstage-nh.farziengineer.co/product/premium-spanish-toast-ham',
'https://cambaytigerstage-nh.farziengineer.co/product/prime-traditional-honey-roasted-ham',
'https://cambaytigerstage-nh.farziengineer.co/product/prime-d-shape-cooked-breakfast-ham',
'https://cambaytigerstage-nh.farziengineer.co/product/crisp-streaky-bacon',
'https://cambaytigerstage-nh.farziengineer.co/product/prime-us-style-rindless-bacon',
'https://cambaytigerstage-nh.farziengineer.co/product/classic-salame-napoli',
'https://cambaytigerstage-nh.farziengineer.co/product/classic-salami-milano',
'https://cambaytigerstage-nh.farziengineer.co/product/classic-cooked-ham',
'https://cambaytigerstage-nh.farziengineer.co/product/classic-pork-mortadella',
'https://cambaytigerstage-nh.farziengineer.co/product/classic-coppa-parma',
'https://cambaytigerstage-nh.farziengineer.co/product/signature-serrano-ham-block'

    ];

    cy.visit('https://cambaytigerstage-nh.farziengineer.co/');
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

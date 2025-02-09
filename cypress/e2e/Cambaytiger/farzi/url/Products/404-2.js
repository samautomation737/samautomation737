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
'https://farzistore-nh.farziengineer.co/product/kids-special-pack/kids-special-pack',
'https://farzistore-nh.farziengineer.co/product/grill-master-pack/grill-master-pack',
'https://farzistore-nh.farziengineer.co/product/supreme-tiger-pack/supreme-tiger-pack',
'https://farzistore-nh.farziengineer.co/product/sizzling-prawn-delight/sizzling-prawn-delight',
'https://farzistore-nh.farziengineer.co/product/farm-fresh-treats/farm-fresh-treats',
'https://farzistore-nh.farziengineer.co/product/mutton-starter-pack/mutton-starter-pack',
'https://farzistore-nh.farziengineer.co/product/dawat-e-special/dawat-e-special',
'https://farzistore-nh.farziengineer.co/product/mutton-medley/mutton-medley',
'https://farzistore-nh.farziengineer.co/product/protein-power-pack/protein-power-pack',
'https://farzistore-nh.farziengineer.co/product/tandoori-and-curry-meal/tandoori-curry-meal',
'https://farzistore-nh.farziengineer.co/product/tandoori-and-curry-meal/tandoori-&-curry-meal',
'https://farzistore-nh.farziengineer.co/product/tikka-trio-platter/tikka-trio-platter',
'https://farzistore-nh.farziengineer.co/product/assorted-tandoori-platter/assorted-tandoori-platter',
'https://farzistore-nh.farziengineer.co/product/chicken-carnival-pack/chicken-carnival-pack',
'https://farzistore-nh.farziengineer.co/product/tandoori-fusion/tandoori-fusion',
'https://farzistore-nh.farziengineer.co/product/mixed-chicken-grill/mixed-chicken-grill',
'https://farzistore-nh.farziengineer.co/product/sunday-brunch-special/sunday-brunch-special',
'https://farzistore-nh.farziengineer.co/product/kuk-doo-koo-pack/kuk-doo-koo-pack',
'https://farzistore-nh.farziengineer.co/product/party-starter-pack/party-starter-pack',
'https://farzistore-nh.farziengineer.co/product/protein-rich-meal/protein-rich-meal',
'https://farzistore-nh.farziengineer.co/product/dinner-special/dinner-special',
'https://farzistore-nh.farziengineer.co/product/boneless-delights/boneless-delights',
'https://farzistore-nh.farziengineer.co/product/boneless-delights/bonless-delights',
'https://farzistore-nh.farziengineer.co/product/soulful-dua-pack/soulful-duo-pack'

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

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
'https://cambaytigerstage-nh.farziengineer.co/product/chef-currated-tikka-marinade/chef-curated-tikka-marinade',
'https://cambaytigerstage-nh.farziengineer.co/product/chef-currated-amritsari-marinade/chef-currated-amritsari-marinade',
'https://cambaytigerstage-nh.farziengineer.co/product/chef-currated-amritsari-marinade/chef-curated-amritsari-marinade',
'https://cambaytigerstage-nh.farziengineer.co/product/country-eggs/country-eggs-pack-of-6-pcs',
'https://cambaytigerstage-nh.farziengineer.co/product/country-eggs/country-eggs',
'https://cambaytigerstage-nh.farziengineer.co/product/brown-eggs/brown-eggs-pack-of-6-pcs',
'https://cambaytigerstage-nh.farziengineer.co/product/brown-eggs/brown-eggs',
'https://cambaytigerstage-nh.farziengineer.co/product/classic-white-eggs/classic-white-eggs-pack-of-6-pcs',
'https://cambaytigerstage-nh.farziengineer.co/product/classic-white-eggs/classic-white-eggs',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-lemon-pepper-basa/freshly-frozen-lemon-pepper-basa',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-chilli-basil-basa/freshly-frozen-chilli-basil-basa',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-smoked-salmon/freshly-frozen-smoked-salmon',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-norwegian/freshly-frozen-norwegian-salmon-chunks-skinless',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-norwegian/freshly-frozen-norwegian',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-surmai-steaks/freshly-frozen-surmai-steaks',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-pomfret-whole/freshly-frozen-pomfret-whole',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-tuna-saku/freshly-frozen-tuna-saku',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-basa-chunks-400g/freshly-frozen-basa-chunks-400g',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-basa-chunks-250g/freshly-frozen-basa-chunks-250g',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-jumbo-prawns-300g/freshly-frozen-jumbo-prawns-300g',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-small-prawns-300g/freshly-frozen-small-prawns-300g',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-large-prawns-300g/freshly-frozen-large-prawns-300g',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-medium-prawns-600g/freshly-frozen-medium-prawns-600g',
'https://cambaytigerstage-nh.farziengineer.co/product/freshly-frozen-medium-prawns-300g/freshly-frozen-medium-prawns-300g',
'https://cambaytigerstage-nh.farziengineer.co/product/mutton-raan/mutton-raan'
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

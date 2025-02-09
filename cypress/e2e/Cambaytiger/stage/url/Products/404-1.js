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

'https://cambaytigerstage-nh.farziengineer.co/product/chicken-malai-seekh-kebab/chicken-malai-seekh-kebab',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-adraki-seekh-kebab/chicken-adraki-seekh-kebab',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-bacon/chicken-bacon',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-cheese-and-paprika-sausage/chicken-cheese-paprika-sausage',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-pepper-salami/chicken-pepper-salami',
'https://cambaytigerstage-nh.farziengineer.co/product/chicken-smoked-frankfurter/chicken-smoked-frankfurter',
'https://cambaytigerstage-nh.farziengineer.co/product/cheesy-chicken-salami/cheesy-chicken-salami',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-king-tiger-prawns/fresh-king-tiger-prawns-whole-pack-of-2',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-king-tiger-prawns/fresh-king-tiger-prawns-whole-pack-of-5',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-small-prawns/fresh-small-prawns-deveined-cleaned',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-small-prawns/fresh-small-prawns-deveined-and-cleaned',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-small-prawns/fresh-small-prawns-deveined-cleaned-tail-on',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-small-prawns/fresh-small-prawns-deveined-and-cleaned-tail-on',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-small-prawns/fresh-small-prawns-whole',
'https://cambaytigerstage-nh.farziengineer.co/product/mangalorean-ghee-roast/mangalorean-ghee-roast',
'https://cambaytigerstage-nh.farziengineer.co/product/kashmiri-rogan-josh/kashmiri-rogan-josh',
'https://cambaytigerstage-nh.farziengineer.co/product/chettinad-gravy/chettinad-gravy',
'https://cambaytigerstage-nh.farziengineer.co/product/bhuna-masala/bhuna-masala',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-norwegian-salmon-dil-and-garlic/fresh-norwegian-salmon-in-dil-garlic-fillet',
'https://cambaytigerstage-nh.farziengineer.co/product/fresh-norwegian-salmon-dil-and-garlic/fresh-norwegian-salmon-dill-&-garlic-fillet'
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

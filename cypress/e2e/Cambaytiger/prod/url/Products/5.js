import var1 from '../../../../../support/PageObjects/404';
import Membership from '../../../../../support/PageObjects/Membership';
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
'https://cambaytiger.com/product/farm-fresh-medium-prawns/fresh-medium-prawns-deveined-cleaned-tail-on',
'https://cambaytiger.com/product/farm-fresh-medium-prawns/fresh-medium-prawns-whole',
'https://cambaytiger.com/product/fresh-sea-crab/fresh-sea-crab-whole',
'https://cambaytiger.com/product/fresh-sea-crab/fresh-sea-crab-whole-cleaned',
'https://cambaytiger.com/product/fresh-mud-crab/fresh-mud-crab-whole',
'https://cambaytiger.com/product/fresh-mud-crab/fresh-mud-crab-whole-cleaned',
'https://cambaytiger.com/product/fresh-lobsters/fresh-lobsters-whole-cleaned',
'https://cambaytiger.com/product/fresh-lobsters/fresh-lobsters-whole',
'https://cambaytiger.com/product/fresh-himalayan-trout/fresh-himalayan-trout-fillet',
'https://cambaytiger.com/product/fresh-himalayan-trout/fresh-himalayan-trout-steaks',
'https://cambaytiger.com/product/fresh-norwegian-salmon/fresh-norwegian-salmon-with-skin-fillet',
'https://cambaytiger.com/product/fresh-norwegian-salmon/fresh-norwegian-salmon-without-skin-fillet',
'https://cambaytiger.com/product/fresh-norwegian-salmon/fresh-norwegian-salmon-steaks',
'https://cambaytiger.com/product/fresh-squid/fresh-squid-rings',
'https://cambaytiger.com/product/fresh-squid/fresh-squid-whole-cleaned',
'https://cambaytiger.com/product/fresh-shingada/fresh-shingada-fillet',
'https://cambaytiger.com/product/fresh-shingada/fresh-shingada-steaks',
'https://cambaytiger.com/product/fresh-shark-fish/fresh-shark-fish-fillet',
'https://cambaytiger.com/product/fresh-shark-fish/fresh-shark-fish-steaks',
'https://cambaytiger.com/product/fresh-shark-fish/fresh-shark-fish-whole-pack-of-2-fish',
'https://cambaytiger.com/product/fresh-hilsa/fresh-hilsa-bengali-cut',
'https://cambaytiger.com/product/fresh-hilsa/fresh-hilsa-whole',
'https://cambaytiger.com/product/fresh-bombay-duck/fresh-bombay-duck-whole-cleaned',
'https://cambaytiger.com/product/fresh-black-pomfret/fresh-black-pomfret-steaks',
'https://cambaytiger.com/product/fresh-black-pomfret/fresh-black-pomfret-whole',
'https://cambaytiger.com/product/fresh-anchovies-silver/fresh-anchovies-silver-cleaned',
'https://cambaytiger.com/product/fresh-anchovies-silver/fresh-anchovies-silver-whole',
'https://cambaytiger.com/product/fresh-anchovies-gold/fresh-anchovies-gold-cleaned',
'https://cambaytiger.com/product/fresh-anchovies-gold/fresh-anchovies-gold-whole',
'https://cambaytiger.com/product/fresh-silver-pomfret-large/fresh-silver-pomfret-large-steaks',
'https://cambaytiger.com/product/fresh-silver-pomfret-large/fresh-silver-pomfret-large-steaks-with-head-tail',

    ];

    cy.visit('https://cambaytiger.com/');
    Membership.closeAdvPopup();

    // // select location 
    // cy.wait(10000);
    // cy.get(':nth-child(1) > #header > .scss_mainNavContainerWrapper__m_O_A > .scss_mainNavContainer__UDVhL > .scss_logoSearchContainer__ca6MR > :nth-child(3) > .scss_GGLocation__cfABD > .scss_GGLocation__topCont__oRucC > :nth-child(5) > .GGLocation__input > input').type("Bangalore", { delay: 100, force: true });
    // cy.wait(10000);
    // cy.get('.AdressCont__inside > :nth-child(1) > div').click();
    // cy.wait(10000);

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

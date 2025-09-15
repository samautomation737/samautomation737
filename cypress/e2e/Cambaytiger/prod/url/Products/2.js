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
'https://cambaytiger.com/product/fresh-turkey/fresh-turkey',
'https://cambaytiger.com/product/butterball-turkey/butterball-turkey',
'https://cambaytiger.com/product/fresh-medium-prawns-in-chilli-garlic-deveined-cleaned/fresh-medium-prawns-in-chilli-garlic-deveined-cleaned',
'https://cambaytiger.com/product/fresh-medium-prawns-in-chilli-lime-deveined-and-tail-on/fresh-medium-prawns-in-chilli-lime-deveined-cleaned',
'https://cambaytiger.com/product/fresh-medium-prawns-in-butter-garlic-deveined-and-cleaned/fresh-medium-prawns-in-butter-garlic-deveined-cleaned',
'https://cambaytiger.com/product/fresh-medium-prawns-in-amritsari-deveined-cleaned',
'https://cambaytiger.com/product/fresh-medium-prawns-in-amritsari-deveined-cleaned/fresh-medium-prawns-in-amritsari-deveined-cleaned',
'https://cambaytiger.com/product/classic-cooked-ham/classic-cooked-ham',
'https://cambaytiger.com/product/gourmet-smoked-turkey-ham-block/gourmet-smoked-turkey-ham-block',
'https://cambaytiger.com/product/protein-dhamaka/protein-dhamaka',
'https://cambaytiger.com/product/fit-and-fuel-combo/fit-&-fuel-combo',
'https://cambaytiger.com/product/Power-Protein-Box/power-protein-box',
'https://cambaytiger.com/product/Flavours-of-India/flavours-of-india',
'https://cambaytiger.com/product/Gourmet-Gala/gourmet-gala',
'https://cambaytiger.com/product/spice-lovers-medley/spice-lovers-medley',
'https://cambaytiger.com/product/Food-Coma-Combo/food-coma-combo',
'https://cambaytiger.com/product/Masaledar-Meal-Box/masaledar-meal-box',
'https://cambaytiger.com/product/Big-Family-Meal-Deal/big-family-meal-deal',
'https://cambaytiger.com/product/dinner-fiesta/dinner-fiesta',
'https://cambaytiger.com/product/Eggcellent-Mix/eggcellent-mix',
'https://cambaytiger.com/product/English-Breakfast/english-breakfast',
'https://cambaytiger.com/product/OMG-Meal/omg-meal',
'https://cambaytiger.com/product/BBQ-Grill-Box/bbq-grill-box',
'https://cambaytiger.com/product/Grill-Thrill-Pack/grill-thrill-pack',
'https://cambaytiger.com/product/chicken-italian-garlic-sausage/chicken-italian-garlic-sausage',
'https://cambaytiger.com/product/chicken-bacon/chicken-bacon',
'https://cambaytiger.com/product/chicken-cheese-and-paprika-sausage/chicken-cheese-paprika-sausage',
'https://cambaytiger.com/product/chicken-pepper-salami/chicken-pepper-salami',
'https://cambaytiger.com/product/chicken-smoked-frankfurter/chicken-smoked-frankfurter',
'https://cambaytiger.com/product/cheesy-chicken-salami/cheesy-chicken-salami',
'https://cambaytiger.com/product/fresh-king-tiger-prawns/fresh-king-tiger-prawns-whole-pack-of-2',
'https://cambaytiger.com/product/medium-prawns-300g/medium-prawns-300g',
'https://cambaytiger.com/product/mutton-raan/mutton-raan',
'https://cambaytiger.com/product/mutton-nalli/mutton-nalli',
'https://cambaytiger.com/product/mutton-chops/mutton-chops',
'https://cambaytiger.com/product/mutton-mince-kheema/mutton-mince-kheema',
'https://cambaytiger.com/product/mutton-boneless-chunks/mutton-boneless-chunks',
'https://cambaytiger.com/product/mutton-curry-cut/mutton-curry-cut',
'https://cambaytiger.com/product/chicken-wings/chicken-wings',
'https://cambaytiger.com/product/chicken-thigh-boneless/chicken-thigh-boneless',
'https://cambaytiger.com/product/chicken-mince-kheema/chicken-mince-kheema',
'https://cambaytiger.com/product/chicken-lollypop/chicken-lollypop'

    ];

    cy.visit('https://cambaytiger.com');
Membership.closeWedAdvPopup();
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

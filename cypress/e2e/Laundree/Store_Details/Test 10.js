let failedUrls = []; // Array to track failed URLs
Cypress.on('fail', (error, runnable) => {
    // Add any custom behavior during failure, e.g., logging the error
    cy.task('log', `Test failed: ${runnable.title}`);
    throw error; // Re-throw the error to fail the test
});
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Response not successful: Received status code 400')) {
        return false; // Ignore this specific error
    }
    return false;
});


describe('Store details page', () => {

    it('Store details page', () => {
        cy.viewport(1920, 1080);
        cy.visit('https://tumbledry.in/');


        // Store Locator
        // Click on Store Locator menu item
        cy.get('#menu-item-65653 > .ekit-menu-nav-link').click();
        cy.get('#menu-item-65653 > .ekit-menu-nav-link').click();
        // Verify the heading displays
        cy.get(".sub-bannerhead.storelocator_heading").should("be.visible");
        // City dropdown locator
        const locationContainer = "#select2-locator-shops-container";
        // city list locator
        const locationOptions = '[class="select2-results__option select2-results__option--selectable"]';

        // Open City dropdown
        cy.get(locationContainer).click();
        cy.get(locationOptions).then((options) => {
            // Close City dropdown
            cy.get(locationContainer).click();
            const totalOptions = options.length; // Get the total number of options            
            // for (let i = 0; i < totalOptions; i++) {
            for (let i = 180; i < 200; i++) {
                cy.get(locationContainer).click(); // Open the dropdown
                cy.get(locationOptions).eq(i).click(); // Select the option at index `i`
                // Iteration on store listing page for stores
                cy.wait(10000);
                cy.get('body').then((body) => {
                    if (body.find('.store-box').length > 0) {                  
                        cy.get('.store-box').then(($storeBoxes) => {
                            const count = $storeBoxes.length; // Get the number of .store-box elements
        
                            for (let i = 0; i < count; i++) {
                                cy.get('.store-box').eq(i).find('h3').click(); // Click on h3 inside the current .store-box
                                cy.get('body').then((body) => {
                                    // Define the locator for the element
                                    // const direction_button = ":nth-child(5) > .contact-details-caption > .btn-set";
                                    const store_heaing = ".col-md-7 > :nth-child(1) > .col-md-12 > .sub-bannerhead";
                                    const google_rating = ".reviewsection > .google-rating > .rating-title";
                                    const chat_on_whatsapp = "div[class='col-md-5 pddingleft'] div:nth-child(2) div:nth-child(1) a:nth-child(1)";
                                    const call_now = "div[class='col-md-6 col-lg-6 col-6'] a[class='btn-set']";
                                    const request_a_callback = ".elementor-button-link.btn-set";
                                    cy.wait(10000);
        
                                    // Check if the element exists in the body
                                    if (
                                        // body.find(direction_button).length === 0 ||
                                        body.find(store_heaing).length === 0 ||
                                        body.find(google_rating).length === 0 ||
                                        body.find(chat_on_whatsapp).length === 0 ||
                                        body.find(call_now).length === 0 ||
                                        body.find(request_a_callback).length === 0
                                    ) {
                                        // Log an error message
                                        cy.log("Element not found on the page. Adding URL to the failed list.");
        
                                        // Get the current URL and add it to the failedUrls array
                                        cy.url().then((currentUrl) => {
                                            failedUrls.push(currentUrl);
                                            cy.log(`Added URL: ${currentUrl}`);
                                        });
                                    }
                                });
        
        
                                cy.go(-1); // Navigate back
                            }
                        });
                    }
                  });

                cy.go(-1); // Navigate back to the previous page
            }
        });




    })

    // Log all failed URLs after the test suite is complete
    after(() => {
        if (failedUrls.length > 0) {
            // Log failed URLs regardless of the test outcome
            cy.task('log', "The following URLs failed:");
            // Log each failed URL
            failedUrls.forEach(url => cy.task('log', url));
            // throw new Error("One or more URLs failed."); // Explicitly fail the test suite
            cy.get("Some Urls contains 404 page", { timeout: 100 });
        } else {
            cy.task('log', "All URLs passed successfully."); // Always log success
        }
    });

});

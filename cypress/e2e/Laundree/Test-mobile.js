Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Response not successful: Received status code 400')) {
      return false; // Ignore this specific error
  }
  return false;
});

describe('Test Mobile', () => {

  it('Test Mobile', () => {
      cy.viewport(375, 667);
      cy.visit('https://tumbledry.in/');

      // Home >> 1000+ Tumbledry Laundry & Dry Clean Stores Across:
      // Click on adilabad
      cy.get('.city-wise-navigation > :nth-child(1) > a').click();
      // cy.get('.city-wise-navigation > :nth-child(1) > a').click();
      // Verify page opened
cy.get('body > div:nth-child(4) > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h1:nth-child(1) > span:nth-child(1)').should("be.visible");
cy.go(-1);

// // Home >> Tumbledry Laundry Franchises Available In:
// // Click on Goa
// cy.get('.elementor-element-9b25e4a > .elementor-widget-container > :nth-child(1) > a').click();    
// // Verify page opened
// cy.get('.elementor-element-c5b1a05 > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .elementor-heading-title').should("be.visible");
// cy.go(-1);

      // Verify home page is opened
      // Verify "OUR EXPERT SERVICES" heading is available or not
      cy.get("div[class='elementor-element elementor-element-33e4e84 elementor-widget elementor-widget-heading'] h2[class='elementor-heading-title elementor-size-small']")
      .should("contain","OUR EXPERT SERVICES");

      // Click on about us link on footer section
      cy.contains("About Us").eq(0).click();
      cy.contains("About Us").eq(0).click();
      // Verify about us page opened & "About Us" heading is available in the page
      cy.get("div[class='elementor-widget-container'] h1").should("contain","About Us");

      // Click on FAQ link on footer section
      cy.get("ul[id='menu-1-54631f1'] li[class='menu-item menu-item-type-custom menu-item-object-custom menu-item-25'] a[class='elementor-item']").click();
      // Verify FAQ page opened & "Frequently" heading is available in the page
      cy.get("h1[class='elementor-heading-title elementor-size-default']").should("contain","Frequently");

      // Click on Terms link on footer section
      cy.get("ul[id='menu-1-54631f1'] li[class='menu-item menu-item-type-custom menu-item-object-custom menu-item-24'] a[class='elementor-item']").click();
      // Verify Terms page opened & "Terms" heading is available in the page
      cy.get("h1[class='elementor-heading-title elementor-size-default']").should("contain","Terms & Conditions");

      // Click on Blog link on footer section
      cy.get("ul[id='menu-1-54631f1'] li[class='menu-item menu-item-type-post_type menu-item-object-page menu-item-27684'] a[class='elementor-item']").click();
      // Verify Blog page opened & "Laundry" heading is available in the page
      cy.get("h1[class='elementor-heading-title elementor-size-default']").should("contain","Laundry & Dry Clean");

      // Click on Contact link on footer section
      cy.get("ul[id='menu-1-54631f1'] li[class='menu-item menu-item-type-custom menu-item-object-custom menu-item-23'] a[class='elementor-item']").click();
      // Verify Contact page opened & "We'd love to hear from you" heading is available in the page
      cy.get("h1[class='elementor-heading-title elementor-size-default']").should("contain","We'd love to hear from you");
      cy.go(-1);

      // // // // Social link on footer
      // // // // Facebook
      // // // cy.get(".fab.fa-facebook").click();
      // // // cy.get(".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xg8j3zb").should("contain", "See more on Facebook");

      // // // // Whatsapp
      // // // cy.get("a[class='elementor-icon elementor-social-icon elementor-social-icon-whatsapp elementor-animation-float elementor-repeater-item-0bba6b8'] i[class='fab fa-whatsapp']").click();
      // // // cy.get("a[id='action-button'] span[class='_advp _aeam']").should("contain", "Continue to Chat");

      // // // // Instagram
      // // // cy.get(".fab.fa-instagram").click();
      // // // cy.get(".x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x1ji0vk5.x18bv5gf.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.x1ms8i2q.x1s688f.x5n08af.x2b8uid.x4zkp8e.xw06pyt.x10wh9bi.x1wdrske.x8viiok.x18hxmgj").should("contain", "See more from tumbledryind");

      // // // // Twitter
      // // // cy.get(".fab.fa-twitter").click();
      // // // cy.get("h1[id='modal-header'] span[class='css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3'] span[class='css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3']").should("contain", "Sign in to X");

      // // // // Linkedin
      // // // cy.get(".fab.fa-linkedin").click();
      // // // cy.get(".#base-contextual-sign-in-modal-modal-header").should("contain", "Interested in working at Tumbledry ?");



      // Header Elements
      //Services
      // Click on  Laundry Service link
      cy.get("#menu-item-65644 > a").click({force:true});
      cy.get("#menu-item-65644 > a").click({force:true});
      // Verify the heading displays
      cy.get("div[class='elementor-element elementor-element-577ed00 elementor-widget elementor-widget-heading'] h2[class='elementor-heading-title elementor-size-default']")
      .should("contain", "Full Range Of Laundry Services");


      // Click on  "Dry Cleaning Service" link    
      cy.get("#menu-item-65645 > a").click({force:true});
      cy.get("#menu-item-65645 > a").click({force:true});
      // Verify the heading displays
      cy.get("div[class='elementor-element elementor-element-c6d1e07 elementor-widget elementor-widget-heading'] h2[class='elementor-heading-title elementor-size-default']")
      .should("contain","Impeccable Dry Clean Quality, Every Time");


      // Click on  "Shoe Cleaning Service" link
      cy.get("#menu-item-65646 > a").click({force:true});
      cy.get("#menu-item-65646 > a").click({force:true});    
      // Verify the heading displays
      cy.get("div[class='elementor-element elementor-element-1e553e4 elementor-widget elementor-widget-heading'] h2[class='elementor-heading-title elementor-size-default']")
      .should("contain","Complete Shoe Care: Cleaning, Repair & Protection");


      // Click on  "Carpet Dry Cleaning Service" link
      cy.get("#menu-item-66554 > a").click({force:true});
      cy.get("#menu-item-66554 > a").click({force:true});    
      // Verify the heading displays
      cy.get("div[class='elementor-element elementor-element-60611e2 elementor-widget elementor-widget-heading'] h2[class='elementor-heading-title elementor-size-default']")
      .should("contain","Carpet Cleaning, With Impeccable Quality!");


      // Click on  "Curtain Dry Cleaning Service" link
      cy.get("#menu-item-66591 > a").click({force:true});
      cy.get("#menu-item-66591 > a").click({force:true});   
      // Verify the heading displays
      cy.get("div[class='elementor-element elementor-element-a204828 elementor-widget elementor-widget-text-editor'] div[class='elementor-widget-container']")
      .should("contain","CURTAIN DRY CLEANING, WITH IMPECCABLE QUALITY!");


      // Click on  "Leather Dry Cleaning Service" link
      cy.get("#menu-item-66592 > a").click({force:true});
      cy.get("#menu-item-66592 > a").click({force:true});   
      // Verify the heading displays
      cy.get(".sub-bannerhead.text-center.orange")
      .should("contain","Leather Dry Cleaning with Impeccable Quality");


      // Click on  "Steam Ironing Service" link
      cy.get("#menu-item-78195 > a").click({force:true});
      cy.get("#menu-item-78195 > a").click({force:true});   
      // Verify the heading displays
      cy.get(".sub-bannerhead.text-center.orange")
      // .should("contain","IMPECCABLE STEAM IRONING QUALITY");

      // Pricing
      // Click on Pricing menu item
      cy.get('#menu-item-19 > .ekit-menu-nav-link').click({ force: true });
      // cy.get('#menu-item-19 > .ekit-menu-nav-link').click({ force: true });
      // Verify the "Pricing" heading displays
      cy.get(".elementor-element.elementor-element-a5da0bc.elementor-widget.elementor-widget-text-editor").should("contain", "Pricing");

      // Store Locator
      // Click on Store Locator menu item
      cy.get('#menu-item-65653 > .ekit-menu-nav-link').click({ force: true });
      cy.get('#menu-item-65653 > .ekit-menu-nav-link').click({ force: true });
      // Verify the heading displays
      cy.get(".sub-bannerhead.storelocator_heading").should("be.visible");
      // Click on the store
      cy.get("body > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > h3:nth-child(1)")
          .click();
      // Verify store details page
      cy.get('.col-md-7 > :nth-child(1) > .col-md-12 > .sub-bannerhead').should("be.visible");
      cy.go(-1);


// Franchise
// Click on "Get Franchise" menu item
cy.get('#menu-item-17 > .ekit-menu-nav-link').click({ force: true });
//   cy.get('#menu-item-17 > .ekit-menu-nav-link').click();
// Verify the heading displays
cy.get("div[class='elementor-element elementor-element-ffb395c elementor-widget elementor-widget-heading'] h2[class='elementor-heading-title elementor-size-default']").should("contain","INVEST IN LAUNDRY");
cy.visit('https://tumbledry.in/contact-us-franchisee/');
cy.get('.elementor-heading-title').should("be.visible");
//Enter name
cy.get('.elementor-element-e3f6cb1 > .elementor-widget-container > .elementor-form > .elementor-form-fields-wrapper > .elementor-field-type-text > #form-field-name')
.type("Test Test");
//Enter phone
cy.get('.elementor-element-e3f6cb1 > .elementor-widget-container > .elementor-form > .elementor-form-fields-wrapper > .elementor-field-group-mobile > #form-field-mobile')
.type("6388788888");
//Enter email
cy.get('.elementor-element-e3f6cb1 > .elementor-widget-container > .elementor-form > .elementor-form-fields-wrapper > .elementor-field-type-email > #form-field-field_5ec884d')
.type("test@test.com");
//Ener pincode
cy.get('.elementor-element-e3f6cb1 > .elementor-widget-container > .elementor-form > .elementor-form-fields-wrapper > .elementor-field-group-pincode > #form-field-pincode')
.type("226777")
//Click on join now button
cy.get('.elementor-element-e3f6cb1 > .elementor-widget-container > .elementor-form > .elementor-form-fields-wrapper > .elementor-field-type-submit > .elementor-button > .elementor-button-content-wrapper > .elementor-button-text')
.click();
// Verify successful message
cy.get("h5[class='elementor-heading-title elementor-size-default']")
.should("be.visible");
cy.go(-1);
cy.go(-1);
cy.go(-1);



// Blogs
// Click on "Blogs" menu item
cy.get('#menu-item-27683 > .ekit-menu-nav-link').click({ force: true });
//   cy.get('#menu-item-27683 > .ekit-menu-nav-link').click();
// Verify Blog page opened & "Laundry" heading is available in the page
cy.get("h1[class='elementor-heading-title elementor-size-default']").should("contain","Laundry & Dry Clean"); 


// Verify blog listing displays
cy.get("body > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > a:nth-child(1) > span:nth-child(1)")
.should("be.visible");

// Click on Blog link
cy.get("body > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > a:nth-child(1) > span:nth-child(1)").click();
// Verify Blog detail page displays
cy.get('.elementor-element-c566d5d > .elementor-widget-container > .elementor-heading-title')
.should("be.visible");
cy.go(-1);
cy.go(-1);

})

})
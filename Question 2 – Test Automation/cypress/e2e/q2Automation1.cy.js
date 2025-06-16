/// <reference types="cypress" />

describe("Test Case 1: Verify user can calculate the shipment quote from Malaysia to India.", ()=>{

  beforeEach(() => {
        cy.viewport(1920, 2000)
        cy.visit('https://pos.com.my/send/ratecalculator');
        cy.contains("Shipping Rate Calculator")
    });

    it('Should allow user to calculate shipment quote successfully', () => {

        cy.get('.calculator-wrapper')
        .scrollIntoView()
        .should('be.visible')

        // Select 'Malaysia' as the "From" country
        cy.get('.country-container > .flex > .font-bold')
        .should('contain.text', 'Malaysia');

        // Enter the postcode "35600"
        cy.get('input[formcontrolname="postcodeFrom"]')
        .click({ force: true })
        .type('35600',{ force: true })
        .should('have.value', '35600');

        cy.wait(2000);

        cy.get('.d-flex > [type="text"]')
        .should('have.value', 'Perak');

        // Type 'India' as the "To" country
        cy.get('#mat-input-0')
        .click({ force: true })
        .clear({ force: true })
        .type('India',{ force: true });
        
        // Select 'India' as the "To" country
        cy.get('#mat-autocomplete-0')
        .find('small.country-list-item[title="India - IN"]')
        .click({force:true});
        cy.get('#mat-input-0')
        .should('have.value', 'India');

        // Verify postcode empty for "To" country
        cy.get(':nth-child(2) > :nth-child(3) > .form-control', { timeout: 5000 })
        .should('be.empty')

        // Enter weight as "1"
        cy.get('.flex > .form-control')
        .clear({ force: true })
        .type('1',{ force: true })
        .should('have.value', '1');

        // Click the "Calculate" button
        cy.get('.justify-end > .no-underline')
        .should('contain', 'Calculate')
        .click({ force: true })
        .wait(4000);

        // Verify multiple quotes & shipment options are visible
        cy.get('a.no-underline.cursor-pointer').then(($buttons) => {
          let count = 0;
          $buttons.each((index, el) => {
            if (el.innerText.trim() === 'Book Now') {
              count++;
            }
          });
          // Assert that count is greater than 1
          expect(count).to.be.greaterThan(1);
        });
  
        //Capture Screenshot
        cy.get('.pt-2').scrollIntoView();
        cy.wait(3500);
        cy.screenshot('shipment quote from Malaysia to India', { capture: 'runner' });
    });
})
describe('ecommerce product purchasing', () => {
    beforeEach(() => {
        cy.visit('https://www.cnarios.com/challenges/product-purchasing#challenge')
    });

    it('Add a product to the cart and check that it appears correctly', () => {
        cy.get(':nth-child(1) > .MuiCardContent-root > .mt-auto > .MuiButtonBase-root').click()
        cy.get('.MuiPaper-elevation0 > .MuiToolbar-root > .MuiButtonBase-root').click()
        cy.get('.space-y-4 > .MuiPaper-root > .MuiCardContent-root > :nth-child(1)').should('have.text', 'Wireless Headphones ($120)')
        cy.get('.MuiCardContent-root > .flex > .MuiTypography-root').should('have.text', '1')
        cy.get('.font-semibold').should('have.text', '$120')
    })

    it('Check that product quantity can be increased and decreased properly', () => {
        cy.get(':nth-child(2) > .MuiCardContent-root > .mt-auto > .MuiButtonBase-root').click()
        cy.get('.MuiPaper-elevation0 > .MuiToolbar-root > .MuiButtonBase-root').click()
        cy.get('.MuiCardContent-root > .flex > .MuiTypography-root').should('have.text', '1')
        cy.get('.MuiCardContent-root > .flex > :nth-child(3)').click()
        cy.get('.MuiCardContent-root > .flex > .MuiTypography-root').should('have.text', '2')
        cy.get('.space-y-4 > .MuiPaper-root > .MuiCardContent-root > .flex > :nth-child(1)').click()
        cy.get('.MuiCardContent-root > .flex > .MuiTypography-root').should('have.text', '1')
    })

    it('Remove a product from the cart and confirm it disappears', () => {
        cy.get(':nth-child(4) > .MuiCardContent-root > .mt-auto > .MuiButtonBase-root').click()
        cy.get('.MuiPaper-elevation0 > .MuiToolbar-root > .MuiButtonBase-root').click()
        cy.get('.space-y-4 > .MuiPaper-root > .MuiCardContent-root > :nth-child(1)').should('have.text', 'Laptop Backpack ($100)')
        cy.get('.space-y-4 > .MuiPaper-root > .MuiCardContent-root > .flex > :nth-child(1)').click()
        cy.get('.space-y-4 > .MuiPaper-root > .MuiCardContent-root > :nth-child(1)').should('not.exist')
    })

    it('Attempt to proceed to payment without entering address', () => {
        cy.get(':nth-child(3) > .MuiCardContent-root > .mt-auto > .MuiButtonBase-root').click()
        cy.get('.MuiPaper-elevation0 > .MuiToolbar-root > .MuiButtonBase-root').click()
        cy.get('.space-y-4 > .MuiPaper-root > .MuiCardContent-root > :nth-child(1)').should('have.text', 'Bluetooth Speaker ($80)')
        cy.get('.MuiButton-contained').click()
        cy.get('.MuiButton-contained').should('be.disabled')
    })
});
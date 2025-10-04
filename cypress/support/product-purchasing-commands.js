Cypress.Commands.add('typeFormField', (fieldName, value) => {
    cy.contains('label', fieldName)          
          .invoke('attr', 'for')                    
          .then(id => {
            cy.get(`[id="${id}"]`)                  
            .should('be.visible')
            .type(value)
          })
})
describe('ecommerce practice test', () => {
  beforeEach(() => {
    cy.visit('https://www.cnarios.com/challenges/product-listing-pagination#challenge')
  });
  
  it('Counts match data source values', () => {
    cy.get('.MuiButtonBase-root').each(() => {
      cy.get('.MuiCardContent-root').should('have.length', 10)
      cy.get('.items-center > :nth-child(3)').then($btn => {
        if(!$btn.prop('disabled')) {
          cy.wrap($btn).click()
        }
      })
    })
  })

  it('Product is found and correct page number is displayed', () => {
    let found = false
    const productName = 'Microsoft Xbox Series X'

    function searchPoduct() {
      cy.get('.MuiCardContent-root').each(($card) => {
        if(found) return

        if($card.find('.font-semibold').text().includes(productName)) {
          found = true
          cy.wrap($card).find('.font-semibold').should('contain.text', productName)
        }
      }).then(() => {
        if(!found) {
          cy.get('.items-center > :nth-child(3)').click()
          searchPoduct()
        }      
      })
    }

    searchPoduct()

    cy.then(() => expect(found).to.be.true)
  })

  it('Products change according to the page clicked', () => {
    function verifyIfPageIsSelected(button) {
      cy.wrap(button).should('have.class', 'Mui-selected')
    }

    function navigateToFirstPage() {
      cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').click().then(($btn) => {
        verifyIfPageIsSelected($btn)
      })
    }

    function navigateToLastPage() {
      cy.get(':nth-child(6) > .MuiButtonBase-root').click().then(($btn) => {
        verifyIfPageIsSelected($btn)
      })
    }

    // Click page number 3 and verify products displayed belong to page 3
    cy.get(':nth-child(4) > .MuiButtonBase-root').click().then(($btn) => {
      verifyIfPageIsSelected($btn)
    })

    // Click Next button
    cy.get('.items-center > :nth-child(3)').click()
    
    // verify correct next page is loaded
    cy.get(':nth-child(5) > .MuiButtonBase-root').then(($btn) => {
      verifyIfPageIsSelected($btn)
    })

    // Click Prev button
    cy.get('.space-y-6 > .items-center > :nth-child(1)').click()

    // verify correct previous page is loaded
    cy.get(':nth-child(4) > .MuiButtonBase-root').then(($btn) => {
      verifyIfPageIsSelected($btn)
    })

    navigateToFirstPage()
    navigateToLastPage()
  })

  it('Ensure each product card displays name, price, category, and rating', () => {
    function verifyCardItems() {
        cy.get('.MuiCardContent-root').each($card => {
          cy.wrap($card).find('.font-semibold').should('exist').and('not.be.empty')
          cy.wrap($card).find('.MuiTypography-body2').should('exist').and('not.be.empty')
          cy.wrap($card).find('.text-green-600').should('exist').and('not.be.empty')
          cy.wrap($card).find('.MuiRating-sizeMedium').should('exist')
        })
    }

     cy.get('.MuiButtonBase-root').each(() => {
       cy.get('.items-center > :nth-child(3)').then($btn => {
         verifyCardItems()
         if(!$btn.prop('disabled')) {
           cy.wrap($btn).click()
        }
      })
    })
  })
})
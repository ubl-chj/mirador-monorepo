/* global cy */
describe('Mirador Base', () => {
  it('Visits Mirador Base', () => {
    cy.visit('/view')
    cy.get('title').contains('Mirador')
    cy.get('#addBtn').click()
    cy.get('#manifestURL').type('https://purl.stanford.edu/sn904cj3429/iiif/manifest')
    cy.get('#fetchBtn').click()
    cy.get('[data-manifestid="https://purl.stanford.edu/sn904cj3429/iiif/manifest"]')
      .find('button')
      .should(($button) => {
        expect($button).to.have.length(1)

        const className = $button[0].className

        expect(className).to.match(/mirador-manifest-list-item-title/)
      })
      .then(($button) => {
        expect($button).to.contain('The Birds-Eye-View Map')
      })
      .then(($button) => {
        $button.click()
      })
    cy.get('.openseadragon-container')
      .find('canvas')
      .should('have.attr', 'width', '873')
      .should('have.attr', 'height', '419')
  })
})

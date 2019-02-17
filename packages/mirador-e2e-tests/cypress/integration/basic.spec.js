/* global cy */
/* global Cypress */
describe('Mirador Base', () => {
  it('Visits Mirador Base', () => {
    const fixtureServer = Cypress.env('fixtureServer')
    cy.visit('/view')
    cy.get('#addBtn').click()
    cy.get('#manifestURL').type(fixtureServer + '/api/001')
    cy.get('#fetchBtn').click()
    cy.get('[data-manifestid="' + fixtureServer + '/api/001"]')
      .find('button')
      .should(($button) => {
        expect($button).to.have.length(1)

        const className = $button[0].className

        expect(className).to.match(/mirador-manifest-list-item-title/)
      })
      .then(($button) => {
        expect($button).to.contain('Bodleian Library Human Freaks')
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

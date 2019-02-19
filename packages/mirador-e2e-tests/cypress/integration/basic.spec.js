/* global cy */
describe('Mirador Base', () => {
  it('Visits Mirador Base', () => {
    cy.visit('/view')
    cy.get('#addBtn').click()
  })
})



describe('e2e test', () => {
  it('should visit', ()=>{
    cy.visit('/')
  })

  it('should be able to set rows for game', ()=>{
    const input = 15
    cy.visit('/')
    cy.get(':nth-child(2) > input').clear()
    cy.get(':nth-child(2) > input').type(input)
    cy.get('button').click()
    cy.get('.BorderRows').should('have.length', input)
  })

  it('should be able to set columns for game', ()=>{
    const input = 15
    cy.visit('/')
    cy.get(':nth-child(3) > input').clear()
    cy.get(':nth-child(3) > input').type(input)
    cy.get('button').click()
    cy.get('.BorderRows:nth-child(1) > div').should('have.length', input)
  })

  it('should be able to set mines for game', ()=>{
    const input = 15
    cy.visit('/')
    cy.get(':nth-child(4) > input').clear()
    cy.get(':nth-child(4) > input').type(input)
    cy.get('button').click()
    cy.get('.Header > :nth-child(1)').should('have.text', input.toString().padStart(3, "0"))
  })

})
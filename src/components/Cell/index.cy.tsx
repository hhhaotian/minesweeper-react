import Cell from '.'
import { cellValue, cellStatus } from '../../types'

it("should have a Cell component", () => {
    cy.mount(<Cell
        value={cellValue.bomb}
        status={cellStatus.available}
        row={1}
        col={1}
        leftClick={cy.stub()}
        rightClick={cy.stub()}
    />)
        .get('.Cell').should('exist')
})

it("Cell component should display value when status is clicked", () => {
    cy.mount(<Cell
        value={cellValue.bomb}
        status={cellStatus.clicked}
        row={1}
        col={1}
        leftClick={cy.stub()}
        rightClick={cy.stub()}
    />)
        .get('.Cell > span').should('have.text', '💣')
})
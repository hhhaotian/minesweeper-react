import { cellStatus, cellValue } from '../types'
import { generateCells, randomBombs } from '.'


describe('generateCells function', () => {
    it('generates the correct number of rows and columns', () => {
      const rows = 3
      const cols = 4
      cy.wrap(generateCells(rows, cols)).then(cells => {
        expect(cells.length).to.equal(rows)
        expect(cells[0].length).to.equal(cols)
      })
    })
  
    it('generates cells with the correct values and statuses', () => {
      const rows = 2
      const cols = 2
      cy.wrap(generateCells(rows, cols)).then(cells => {
        cells.forEach(row => {
          row.forEach(cell => {
            expect(cell.value).to.equal(cellValue.none)
            expect(cell.status).to.equal(cellStatus.available)
          })
        })
      })
    })
  })


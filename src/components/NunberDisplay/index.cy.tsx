import NumberDisplay from ".";

it("should have a NumberDisplay component", () => {
    const input = 1
    cy.mount(<NumberDisplay value={input} />);
    cy.get('.NumberDisplay').should('have.text', input.toString().padStart(3, '0'))
});

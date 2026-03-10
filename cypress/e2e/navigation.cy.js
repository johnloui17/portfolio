/**
 * E2E Tests — Portfolio Navigation & Page Load
 * Tests that the page loads and all critical sections are visible.
 */

describe('Portfolio — Navigation & Page Load', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the home page successfully', () => {
    cy.title().should('exist');
    cy.get('main').should('be.visible');
  });

  it('displays the brand logo', () => {
    cy.contains('J. LOUI').should('be.visible');
  });

  it('has a working GitHub nav link', () => {
    cy.get('a[href*="github.com"]')
      .should('have.attr', 'href', 'https://github.com/johnloui17')
      .should('have.attr', 'target', '_blank');
  });

  it('has a working LinkedIn nav link', () => {
    cy.get('a[href*="linkedin.com"]')
      .should('have.attr', 'href', 'https://www.linkedin.com/in/john-loui-26a8b9155')
      .should('have.attr', 'target', '_blank');
  });

  it('scrolls to projects section when clicking "View Work"', () => {
    cy.get('a[href="#projects"]').click();
    cy.get('#projects').should('exist');
  });
});

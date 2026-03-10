/**
 * E2E Tests — Content Integrity
 * Verifies that all portfolio sections render with the correct content.
 */

describe('Portfolio — Content Integrity', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // ---- Hero ----
  context('Hero Section', () => {
    it('shows the Full-Stack Engineer pill badge', () => {
      cy.contains(/full-stack engineer/i).should('be.visible');
    });

    it('shows the headline text', () => {
      cy.contains(/precision engineering/i).should('be.visible');
      cy.contains(/scalable architecture/i).should('be.visible');
    });

    it('shows the sub-description', () => {
      cy.contains(/high-performance web applications/i).should('be.visible');
    });

    it('"Get in touch" button has mailto link', () => {
      cy.get('a[href^="mailto:"]')
        .should('contain', 'Get in touch');
    });
  });

  // ---- Skills ----
  context('Engineering Arsenal Section', () => {
    it('displays the section heading', () => {
      cy.contains(/engineering arsenal/i).should('exist');
    });

    it('lists frontend frameworks', () => {
      cy.contains('React 18').should('exist');
      cy.contains('Next.js 13-16').should('exist');
      cy.contains('TypeScript').should('exist');
      cy.contains('Flutter').should('exist');
    });

    it('lists backend frameworks including Nest.js', () => {
      cy.contains('Nest.js').should('exist');
      cy.contains('Node.js').should('exist');
      cy.contains('Firebase Admin').should('exist');
    });

    it('shows efficiency & scale stats', () => {
      cy.contains(/609\+ files/i).should('exist');
      cy.contains(/400\+ e2e tests/i).should('exist');
      cy.contains(/lighthouse/i).should('exist');
    });

    it('shows security and analytics blocks', () => {
      cy.contains(/HSTS/i).should('exist');
      cy.contains(/Mixpanel/i).should('exist');
    });
  });

  // ---- Projects ----
  context('Selected Works Section', () => {
    it('renders the section heading', () => {
      cy.get('#projects').scrollIntoView();
      cy.contains(/selected works/i).should('be.visible');
    });

    it('shows Carland360 project', () => {
      cy.contains('Carland360').should('exist');
      cy.contains(/SaaS platform/i).should('exist');
    });

    it('shows Marketfeed Systems project', () => {
      cy.contains('Marketfeed Systems').should('exist');
      cy.contains(/CRM lead capture/i).should('exist');
    });

    it('shows Financial Calculators project', () => {
      cy.contains(/financial calculators/i).should('exist');
      cy.contains(/144 PRs/i).should('exist');
    });
  });

  // ---- Footer ----
  context('Footer', () => {
    it('shows footer with current year and attribution', () => {
      const year = new Date().getFullYear();
      cy.contains(year.toString()).should('exist');
      cy.contains(/john loui/i).should('exist');
    });
  });
});

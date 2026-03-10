/**
 * E2E Tests — Responsive / Mobile Layout
 * Checks layout integrity across common viewport sizes.
 */

const viewports = [
  { label: 'Mobile S (320px)', width: 320, height: 568 },
  { label: 'Mobile L (375px)', width: 375, height: 812 },
  { label: 'Tablet (768px)', width: 768, height: 1024 },
  { label: 'Desktop (1280px)', width: 1280, height: 800 },
];

viewports.forEach(({ label, width, height }) => {
  describe(`Responsive Layout — ${label}`, () => {
    beforeEach(() => {
      cy.viewport(width, height);
      cy.visit('/');
    });

    it('renders the page without horizontal scroll', () => {
      cy.document().then((doc) => {
        expect(doc.documentElement.scrollWidth).to.be.lte(width);
      });
    });

    it('displays the brand logo', () => {
      cy.contains('J. LOUI').should('be.visible');
    });

    it('displays the hero headline', () => {
      cy.contains(/precision engineering/i).should('be.visible');
    });

    it('displays the "View Work" CTA button', () => {
      cy.get('a[href="#projects"]').should('be.visible');
    });

    it('shows the nav social links', () => {
      cy.get('a[href*="github.com"]').should('exist');
      cy.get('a[href*="linkedin.com"]').should('exist');
    });
  });
});

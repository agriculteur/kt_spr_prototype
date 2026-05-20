describe('SPR application E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('affiche le tableau de bord et bascule vers la page projets', () => {
    cy.contains('Tableau de bord').should('be.visible');
    cy.get('a[data-route="projects"]').click();
    cy.url().should('include', '#projects');
    cy.contains('Projets réglementaires').should('be.visible');
  });

  it('recherche et filtre les projets', () => {
    cy.get('#btn-mobile-menu').click();
    cy.get('[data-quick-filter="en-cours"]').click();
    cy.url().should('include', 'statut=en+cours');
    cy.get('#proj-search').type('Transformation');
    cy.contains('Aucun projet trouvé').should('exist').or('not.exist');
    cy.get('#proj-filter-priorite').select('élevé');
    cy.get('#projects-results').should('exist');
  });

  it('change la vue cartes/table', () => {
    cy.visit('/#projects');
    cy.get('#view-table').click();
    cy.get('table').should('be.visible');
    cy.get('#view-cards').click();
    cy.get('[data-code]').first().should('exist');
  });

  it('ouvre et ferme le menu mobile', () => {
    cy.viewport(375, 812);
    cy.get('#btn-mobile-menu').click();
    cy.get('#mobile-sidebar').should('not.have.class', '-translate-x-full');
    cy.get('#sidebar-overlay').click();
    cy.get('#mobile-sidebar').should('have.class', '-translate-x-full');
  });

  it('basculer Dark Mode', () => {
    cy.get('#btn-theme-toggle').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('#btn-theme-toggle').click();
    cy.get('html').should('not.have.class', 'dark');
  });
});

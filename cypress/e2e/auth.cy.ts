describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show login form', () => {
    cy.get('[data-testid="login-form"]').should('be.visible');
  });

  it('should handle login with valid credentials', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('invalid@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    
    cy.get('[data-testid="error-message"]').should('be.visible');
  });

  it('should handle logout', () => {
    // 먼저 로그인
    cy.login('test@example.com', 'password123');
    
    cy.get('[data-testid="user-menu"]').click();
    cy.get('[data-testid="logout-button"]').click();
    
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('[data-testid="login-form"]').should('be.visible');
  });
}); 
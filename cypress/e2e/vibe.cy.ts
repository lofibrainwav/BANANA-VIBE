describe('Vibe Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123')
  })

  it('should create a new vibe', () => {
    const title = 'Test Vibe'
    const content = 'This is a test vibe content'
    const mood = 'happy'

    cy.createVibe(title, content, mood)
    cy.url().should('include', '/dashboard')
    cy.contains(title).should('be.visible')
    cy.contains(content).should('be.visible')
    cy.contains('😊').should('be.visible')
  })

  it('should edit an existing vibe', () => {
    cy.visit('/dashboard')
    cy.get('[data-testid="vibe-item"]').first().click()
    cy.url().should('include', '/vibes/')
    cy.get('button').contains('Edit').click()
    
    const newTitle = 'Updated Vibe'
    const newContent = 'This is updated content'
    const newMood = 'excited'

    cy.get('input[name="title"]').clear().type(newTitle)
    cy.get('textarea[name="content"]').clear().type(newContent)
    cy.get(`button[data-mood="${newMood}"]`).click()
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.contains(newTitle).should('be.visible')
    cy.contains(newContent).should('be.visible')
    cy.contains('🤩').should('be.visible')
  })

  it('should delete a vibe', () => {
    cy.visit('/dashboard')
    cy.get('[data-testid="vibe-item"]').first().click()
    cy.url().should('include', '/vibes/')
    cy.get('button').contains('Delete').click()
    cy.get('button').contains('Confirm').click()
    cy.url().should('include', '/dashboard')
  })

  it('should filter vibes by mood', () => {
    cy.visit('/dashboard')
    cy.get('button[data-mood="happy"]').click()
    cy.get('[data-testid="vibe-item"]').each(($item) => {
      cy.wrap($item).find('span').contains('😊').should('be.visible')
    })
  })
}) 
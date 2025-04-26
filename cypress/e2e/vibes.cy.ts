describe('Vibes Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/dashboard');
  });

  it('should create a new vibe', () => {
    cy.get('[data-testid="create-vibe-button"]').click();
    
    // VibeForm 작성
    cy.get('[data-testid="mood-selector"]').click();
    cy.get('[data-testid="mood-happy"]').click();
    
    cy.get('[data-testid="title-input"]').type('Test Vibe');
    cy.get('[data-testid="description-input"]').type('This is a test vibe');
    cy.get('[data-testid="submit-button"]').click();
    
    // 성공 메시지 확인
    cy.get('[data-testid="success-message"]').should('be.visible');
    
    // 새로 생성된 Vibe가 목록에 표시되는지 확인
    cy.get('[data-testid="vibe-list"]').should('contain', 'Test Vibe');
  });

  it('should edit an existing vibe', () => {
    // 첫 번째 Vibe의 편집 버튼 클릭
    cy.get('[data-testid="vibe-list"]').first().within(() => {
      cy.get('[data-testid="edit-button"]').click();
    });
    
    // Vibe 수정
    cy.get('[data-testid="title-input"]').clear().type('Updated Vibe');
    cy.get('[data-testid="description-input"]').clear().type('This is an updated vibe');
    cy.get('[data-testid="submit-button"]').click();
    
    // 성공 메시지 확인
    cy.get('[data-testid="success-message"]').should('be.visible');
    
    // 수정된 Vibe가 목록에 표시되는지 확인
    cy.get('[data-testid="vibe-list"]').should('contain', 'Updated Vibe');
  });

  it('should delete a vibe', () => {
    // 첫 번째 Vibe의 삭제 버튼 클릭
    cy.get('[data-testid="vibe-list"]').first().within(() => {
      cy.get('[data-testid="delete-button"]').click();
    });
    
    // 삭제 확인 다이얼로그에서 확인
    cy.get('[data-testid="confirm-delete-button"]').click();
    
    // 성공 메시지 확인
    cy.get('[data-testid="success-message"]').should('be.visible');
    
    // 삭제된 Vibe가 목록에서 사라졌는지 확인
    cy.get('[data-testid="vibe-list"]').should('not.contain', 'Updated Vibe');
  });

  it('should filter vibes by mood', () => {
    cy.get('[data-testid="mood-filter"]').click();
    cy.get('[data-testid="mood-happy"]').click();
    
    // 필터링된 Vibe 목록 확인
    cy.get('[data-testid="vibe-list"]').each(($vibe) => {
      cy.wrap($vibe).should('have.attr', 'data-mood', 'happy');
    });
  });
}); 
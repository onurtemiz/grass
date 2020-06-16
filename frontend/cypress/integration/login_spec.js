describe('when tries to login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login', () => {
    cy.get('.email-input').type('test@boun.edu.tr');
    cy.get('.password-input').type('testtest');
    cy.get('.login-button').click();
  });

  it('should give error if email is not boun', () => {
    let notBounErorr = 'Epostanız @boun.edu.tr ile bitiyor olmalı.';
    cy.get('.email-input').type('test@hotmail.com');
    cy.get('.password-input').type('testtest');
    cy.get('.login-button').click();
    cy.get('.email-error').should('contain', notBounErorr);
  });

  it('should give error if email is empty', () => {
    let emptyEmailError = 'Lütfen boun eposta adresinizi girin.';
    cy.get('.password-input').type('testtest');
    cy.get('.login-button').click();
    cy.get('.email-error').should('contain', emptyEmailError);
  });

  it.only('should give error if password less than 8', () => {
    let passwordLessError = 'Şifreniz en az 8 karakterden oluşmalı.';
    cy.get('.email-input').type('test@boun.edu.tr');
    cy.get('.password-input').type('test');
    cy.get('.login-button').click();
    cy.get('.password-error').should('contain', passwordLessError);
  });

  it.only('should give error if password is empty', () => {
    let passwordEmptyError = 'Lütfen şifrenizi girin.';
    cy.get('.email-input').type('test@boun.edu.tr');
    cy.get('.login-button').click();
    cy.get('.password-error').should('contain', passwordEmptyError);
  });
});
